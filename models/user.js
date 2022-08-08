class User {
    constructor(user_id, eamil, password, first_name, last_name) {
        this.user_id = user_id;
        this.email = eamil;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.token = null;
    }

    getUserId() {
        return this.user_id;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getFirstName() {
        return this.first_name;
    }
    getLastName() {
        return this.last_name;
    }
    getToken() {
        return this.token;
    }

    setUserd(user_id) {
        this.user_id = user_id;
    }
    setEmail(email) {
        this.email = email;
    }
    setPassword(password) {
        this.password = password;
    }
    setFirstName(first_name) {
        this.first_name = first_name;
    }
    setlastName(last_name) {
        this.last_name = last_name;
    }
    setToken(token) {
        this.token = token;
    }
}

module.exports = User;