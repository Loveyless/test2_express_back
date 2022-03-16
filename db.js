const mongoose = require("mongoose");

module.exports = new Promise((resolve, reject) => {
  mongoose.connect("mongodb://localhost:27017/test2_back", (err, res) => {
    if (!err) {
      resolve("test2_back数据库连接成功");
    } else {
      reject("test2_back数据库连接失败", err.message);
    }
  });
});
