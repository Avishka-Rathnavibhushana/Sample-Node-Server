const UserDAO = require('../dao/userDAO');

class Guest {

    constructor() { }

    async createAccount(user) {
        try {
            var response = await UserDAO.createOneEntity(user);
            if (response[0].affectedRows = 1) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    async isUserExist(email) {
        try {
            var response = await UserDAO.readOneEntity(email);
            const user_list = response[0];

            if (user_list.length >= 1) {
                return true;
            } else {
                return false;
            }

        } catch (error) {
            return undefined;
        }
    }

    async getUser(email) {
        try {
            var response = await UserDAO.readOneEntity(email);
            const user_list = response[0];

            if (user_list.length >= 1) {
                return user_list[0];
            } else {
                return undefined;
            }

        } catch (error) {
            return undefined;
        }
    }
}

module.exports = Guest;
