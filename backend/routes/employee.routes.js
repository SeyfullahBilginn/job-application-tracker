module.exports = app => {
    const users = require("../controllers/user.controller.js");
    
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
};