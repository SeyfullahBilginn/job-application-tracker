const sql = require("./db.js");

// constructor
const User = function (user) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.password = user.password;
    this.email = user.email;
    this.userType = user.userType;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(res);
        console.log("----");
        console.log(res.insertId);
        console.log("2222");
        console.log(res.id);
        console.log(res[0]);
        console.log(newUser);
        newUser.id = res.insertId
        console.log("created user: ", newUser);
        console.log("created user: ", { id: res.insertId, ...newUser });
        console.log("created user: ", { ...newUser, id: res.insertId });
        result(null, { ...newUser, id: res.insertId });
    });
};

User.findById = (LoggedUser, result) => {
    const { email, password } = LoggedUser;
    sql.query(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found user: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found user with the id
            result({ kind: "not_found" }, null);
        });
};

User.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};

User.updateById = (id, user, result) => {
    sql.query(
        "UPDATE user SET userType = ?, doj = ?, name = ?, salary = ? WHERE id = ?",
        [user.userType, user.doj, user.name, user.salary, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found user with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user: ", { id: id, ...user });
            result(null, { id: id, ...user });
        }
    );
};

User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found user with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted user with id: ", id);
        result(null, res);
    });
};

User.removeAll = result => {
    sql.query("DELETE FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} users`);
        result(null, res);
    });
};

module.exports = User;