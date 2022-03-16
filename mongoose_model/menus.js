const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let menusRule = new Schema();

module.exports = mongoose.model("menus", menusRule);
