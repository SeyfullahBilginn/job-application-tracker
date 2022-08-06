const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var cors = require('cors')

app.use(cors());
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Headers, *, Access-Control-Allow-Origin', 'Origin, X-Requested-with, Content_Type,Accept,Authorization','http://localhost:3000');
  if(req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
      return res.status(200).json({});
  }
  next();
});

// // parse requests of content-type: application/json
app.use(bodyParser.json());
// app.use(express.json())


// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded());
// a route for home page
app.get("/home", (req, res) => {
  res.json({ message: "NodeJs CRUD Application" });
});

// require("./app/routes/employee.routes.js")(app);
require("./routes/employee.routes")(app);

// setting port to 3000, & listening for requests http request.
app.listen(3001, () => {
  console.log("Server is running on port 3001.");
});