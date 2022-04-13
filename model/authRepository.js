const db = require('../config/database')

module.exports = {
    TABLE: 'tokens',   

    /* async getAll() { 
               
        const getUsers = async () => {
            const query = `SELECT * FROM authUsers`;
            return queryHelper.process(query);
        };        

        const getTokens = async () => {
            const query = `SELECT * FROM ${this.TABLE}`;
            return queryHelper.process(query);
        }       

        const [users, tokens] = await Promise.all([getUsers(), getTokens()])
        
        return users.map((user) => {
            const isActive = tokens.find(({ userid }) => String(user.userid) === String(userid));
            return {
                email: user.email,
                id: user.userid,
                role: user.role,
                active: !!isActive,
            }
        })               
    }, */

    async saveUserToken(userId, accessToken, refreshToken, role) {
        const query = db.query(`INSERT INTO ${this.TABLE} (userId, accessToken, refreshToken, role) VALUES($1,$2,$3,$4)`, [userId, accessToken, refreshToken, role]);

        return query;
    },    

    async clearUserTokens(userId) {
        const query = db.query(`DELETE FROM ${this.TABLE} where userId = $1`, [userId]);

        return query;
    },
    

    async getByToken(refreshToken) {
        const query = db.query(`SELECT * FROM ${this.TABLE} WHERE refreshToken = $1`, [refreshToken]);
        
        return query;
    },
    
    async checkToken(accessToken) {        
        const query = db.query(`SELECT * FROM ${this.TABLE} WHERE accessToken = $1`, [accessToken]);
        
        return query;
    }
}
