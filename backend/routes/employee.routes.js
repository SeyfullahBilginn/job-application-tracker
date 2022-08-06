module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const applications = require("../controllers/application.controller.js")

    // Create a new employee
    app.post("/users", users.create);

    // Retrieve all users
    app.get("/users", users.findAll);

    //login method
    // Retrieve a single employee with userId
    app.post("/users/login", users.findOne);
    
    // Update a employee with userId
    app.put("/users/:userId", users.update);
    
    // Delete a employee with userId
    app.delete("/users/:userId", users.delete);
    
    // Create a new employee
    app.delete("/users", users.deleteAll);

    //create a new job application
    app.post("/users/jobs", applications.create);
    
    //Get all job application of current user
    app.get("/users/jobs/:userId", applications.findAll);
};