const db = require('../config/database')

module.exports = {   
    TABLE: 'users',

    async saveUser(email, password, userId, role = 'USER') {        
        const query = await db.query(`INSERT INTO ${this.TABLE} (email, password, role, userId) VALUES ($1,$2,$3,$4) `, [email, password, role, userId]);
        
        return query;
    },

    async getByEmail(email) {
        const query = await db.query(`SELECT * FROM  ${this.TABLE} where email = $1`, [email]);

        return query;
    }
}
