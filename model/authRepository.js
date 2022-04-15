const db = require('../config/database')

module.exports = {
    TABLE: 'tokens',   

       async getAll() {
        const query = db.query(`SELECT * from users`);
        return query;
       },    

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
