const sql = require("./db.js");

// constructor
const Application = function (application) {
    this.id = application.id;
    this.user_id = application.user_id;
    this.date = application.date;
    this.company_name = application.company_name;
    this.location = application.location;
    this.position = application.position;
    this.expected_salary = application.expected_salary;
    this.applied_cv = application.applied_cv;
};

Application.create = (newApp, result) => {
    sql.query("INSERT INTO applications SET ?", newApp, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created application: ", { id: res.insertId, ...newApp });
        result(null, { id: res.insertId, ...newApp });
    });
};


Application.getAll = (user_id, result) => {
    sql.query("SELECT * FROM applications WHERE user_id = ?", [user_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("applications: ", res);
        result(null, res);
    });
};


Application.remove = (id, result) => {
    console.log(id);
    sql.query("DELETE FROM applications WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found job application with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted job application with id: ", id);
        result(null, res);
    });
};

module.exports = Application;