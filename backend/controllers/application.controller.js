const Application = require("../models/applications.model");

// Create and Save a new application
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a application post
    const application = new Application({
        user_id: Number(req.body.user_id),
        date: req.body.date,
        company_name: req.body.company_name,
        location: req.body.location,
        position: req.body.position,
        expected_salary: Number(req.body.expected_salary),
        applied_cv: req.body.applied_cv
    });
    // Save application in the database
    Application.create(application, (err, data) => {
        if (err) {
            res.status(500).json({
                message:
                    err.message || "Duplicate Some error occurred while creating the User."
            });
        }
        else res.send(data);
    });
};

// Retrieve all applications of current user from the database.
exports.findAll = (req, res) => {
    Application.getAll(req.params.userId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

// Delete a job application with the specified jobId in the request
exports.delete = (req, res) => {
    Application.remove(req.params.jobId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Job with id ${req.params.jobId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Job Application with id " + req.params.jobId
                });
            }
        } else res.send({ message: `Job application was deleted successfully!` });
    });
};