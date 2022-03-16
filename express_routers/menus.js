const express = require("express");
const router = express.Router();
const menusModel = require("../mongoose_model/menus.js");

router.get("/menus", (req, res, next) => {
  menusModel.find({id:100}, (err, data) => {
    res.json({
      status:data.length ? 200 : 400,
      message:data.length ? "列表数据获取成功" : "列表数据获取失败",
      menus:data
    });
  });
});


module.exports = router



