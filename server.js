const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// swagger api documentation
const swaggerUi = require("swagger-ui-express"), 
   swaggerDocument = require("./swagger.json");

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Recipe API Express application." });
});

require("./app/routes/recipe.routes.js")(app);

// swagger path to api documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
