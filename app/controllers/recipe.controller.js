const State = require("../models/state.model.js");

// Create and Save a new State
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  //console.log(req.body);

  // Create a State
  const state = new State({
    name: req.body.name,
    code: req.body.code
  });

  // Save State in the database
  State.create(state, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the State."
      });
    else res.send(data);
  });
};

// Retrieve all States from the database.
exports.findAll = (req, res) => {
  State.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving states."
      });
    else res.send(data);
  });
};

// Find a single State with a stateId
exports.findOne = (req, res) => {
  State.findById(req.params.stateId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found State with id ${req.params.stateId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving State with id " + req.params.stateId
        });
      }
    } else res.send(data);
  });
};

// Update a State identified by the stateId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  State.updateById(
    req.params.stateId,
    new State(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found State with id ${req.params.stateId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating State with id " + req.params.stateId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a State with the specified stateId in the request
exports.delete = (req, res) => {
  State.remove(req.params.stateId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found State with id ${req.params.stateId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete State with id " + req.params.stateId
        });
      }
    } else res.send({ message: `State was deleted successfully!` });
  });
};

// Delete all States from the database.
exports.deleteAll = (req, res) => {
  State.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all states."
      });
    else res.send({ message: `All States were deleted successfully!` });
  });
};
