const sql = require("./db.js");

// constructor
const Recipe = function(Recipe) {
  this.name = recipe.name;
  this.code = recipe.code;
};

Recipe.create = (newRecipe, result) => {
  sql.query("INSERT INTO recipes SET ?", newRecipe, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created recipe: ", { id: res.insertId, ...newRecipe });
    result(null, { id: res.insertId, ...newRecipe });
  });
};

Recipe.findById = (recipeId, result) => {
  sql.query(`SELECT * FROM recipes WHERE id = ${recipeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found recipe: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Recipe with the id
    result({ kind: "not_found" }, null);
  });
};

Recipe.getAll = result => {
  sql.query("SELECT * FROM recipes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("recipes: ", res);
    result(null, res);
  });
};

Recipe.updateById = (id, recipe, result) => {
  sql.query(
    "UPDATE recipes SET email = ?, name = ?, active = ? WHERE id = ?",
    [recipe.email, recipe.name, recipe.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Recipe with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated recipe: ", { id: id, ...recipe });
      result(null, { id: id, ...recipe });
    }
  );
};

Recipe.remove = (id, result) => {
  sql.query("DELETE FROM recipes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Recipe with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted recipe with id: ", id);
    result(null, res);
  });
};

Recipe.removeAll = result => {
  sql.query("DELETE FROM recipes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} recipes`);
    result(null, res);
  });
};

module.exports = Recipe;
