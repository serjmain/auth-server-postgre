const authRepository = require('../model/authRepository');
const userRepository = require('../model/userRepository');
const tokenService = require('../service/tokenGenerator');
const userService = require('../service/requestService');
const secret = require('../config/secretkey');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

module.exports = {
    async registration(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "registration error", errors});
        }
        const role = "USER";
        const { email, password, name } = req.body;
        const { data: { id, error } } = await userService.registration({ email, password, name }); 

        if (error) {
            return res.status(400).json(error);
        }
        
        const hashPassword = bcrypt.hashSync(password, 7);
        const candidate = await userRepository.getByEmail(email);        

        if (candidate.rowCount) {
            return res.status(400).json({ message: "user with this email already exist"});
        }  

        await userRepository.saveUser(email, hashPassword, id);
        
        const { accessToken, refreshToken } = tokenService.createToken({ id, role });

        res.cookie("token", refreshToken, { httpOnly: true });        
        await authRepository.saveUserToken(id, accessToken, refreshToken, role);
        res.status(200).send({ accessToken, refreshToken });
    },

    getUsers(req, res) {        
        authRepository
            .getAll(req.query)
            .then((result) => res.status(200).json(result.rows))
            .catch(e => res.status(404).send(e));
    },

    async login(req, res) {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "login error", errors});
        }

        const { email, password } = req.body;
        const user = await userRepository.getByEmail(email);       

        if (!user.rowCount) {
            return res.status(400).json({ message: "this email does not exist" });
        }
        const resultPass = await bcrypt.compare(password, user.rows[0].password);

        if (!resultPass) {
            return res.status(400).json({ message: "OPS WRONG PASSWORD" });
        }
        const { accessToken, refreshToken } = tokenService.createToken({ id: user.rows[0].userid, role: user.rows[0].role });

        await authRepository.clearUserTokens(user.rows[0].userid);
        res.cookie("token", refreshToken, { httpOnly: true });
        await authRepository.saveUserToken(user.rows[0].userid, accessToken, refreshToken, role = user.rows[0].role);
        res.status(200).send({ accessToken, refreshToken });
    },

    async logout(req, res) {        
        const authHeader = req.headers.authorization;      
        
        if (authHeader === undefined) {
            return res.status(401).json({ message: "user is not authorized" });
        }
        const item = authHeader.split(' ')[1];
        const checkedToken = await authRepository.checkToken(item);
        
        if(checkedToken.rows.length < 1) {
            return res.status(400).json({ message: "invalid token" })
        }

        const data = await jwt.verify(authHeader.split(' ')[1], secret.accessKey);                      

        await authRepository.clearUserTokens(data.id);
        res.clearCookie("token");
        res.status(200).json({ message: "successfully logout" });
    },

    async refresh(req, res) {
        const cookieToken = req.headers.cookie;

        if (cookieToken === undefined) {
            return res.status(400).json({ message: "invalid token" })
        }

        const result = cookieToken.replace(/^.{6}/, '');
        const item = await authRepository.getByToken(result);        
        
        if (!item.rowCount) {
            return res.status(401).json({ message: "user is not authorized" });
        }

        const { accessToken, refreshToken } = tokenService.createToken({ id: item.rows[0].id, role: item.rows[0].role });

        await authRepository.clearUserTokens(item.rows[0].id);
        await authRepository.saveUserToken(item.rows[0].id, accessToken, refreshToken, item.rows[0].role);
        res.status(200).send({ accessToken, refreshToken });
    },

    async check(req, res) { 
        const header = req.headers.authorization;        
               
        if (header === undefined ) {
            return res.status(401).json({ message: "user is not authorized" });
        }

        const item = header.split(' ')[1];
        const checkedToken = await authRepository.checkToken(item);        

        if (!checkedToken.rowCount || checkedToken.rows[0].accesstoken !== item ) {
            return res.status(200).json({ message: "false" });
        }

        res.status(200).json({ message: "true" });
    }
}
