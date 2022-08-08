const db = require('../config/database.js')


class UserDAO {
    constructor() {
        try {

        } catch (error) {

        }
    }

    static async createOneEntity(user) {
        const querry = 'INSERT INTO user(user_id,email,password,first_name,last_name) VALUES (?,?,?,?,?)';
        const out = await db.query(querry, [null, user.email, user.password, user.first_name, user.last_name]);
        return out;
    }

    static async readAllEntity() {
        const querry = 'SELECT * FROM user';
        const out = await db.query(querry, []);
        return out;
    }

    static async readOneEntity(email) {
        const querry = 'SELECT * FROM user where email=?';
        const out = await db.query(querry, [email]);
        return out;
    }

    static async updateOneEntity() {

    }

    static async deleteOneEntity() {

    }
}

module.exports = UserDAO;