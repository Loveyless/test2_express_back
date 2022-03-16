const fs = require("fs");
const morgan = require("morgan");
const express = require("express");
const app = express();
//数据库连接模块
const db = require("./db.js");
//loginModel
const loginModel = require("./mongoose_model/login.js");

//各种请求路由
const menusRouter = require("./express_routers/menus.js")


app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, mytoken");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization");
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  if (req.method == "OPTIONS") res.sendStatus(200);
  /*让options请求快速返回*/ else next();
});
app.use(express.json()); //解析json请求
app.use(express.urlencoded({ extended: true }));

//测试中间件
// app.use((req, res) => {
//   res.json({
//     path:req.path,
//     data:req.body || req.query
//   });
// });

//连接数据库
db.then(
  (ret) => {
    console.log(ret); //成功
    //请求日志
    const writerStream = fs.createWriteStream("./access.log", {
      flags: "a+"
    })
    app.use(morgan("combined", { stream: writerStream }))
    



    //#region 
    //添加管理员中间件 懒得写model了
    // app.post("/login", (req, res, next) => {
    //   const { username, password } = req.body;
    //   loginModel.create({
    //       username,
    //       password,
    //     },(err, data) => {
    //       if (!err) {
    //         res.json({
    //           message: "添加成功",
    //           data,
    //         });
    //         return;
    //       } else {
    //         res.json({
    //           message: "添加失败",
    //           data,
    //           err:err.message
    //         });
    //         return;
    //       }
    //     }
    //   );
    // });
    //#endregion



    //判断登录
    app.post("/login", (req, res) => {
      const { username, password } = req.body;
      loginModel.findOne({username,password},(err, data) => {

          console.log(err,data);
          res.json({
            status:data !== null ? 200 : 400,
            message:data !== null ? "登录成功" : "登录失败",
          });
          
      });
    });

    //menus菜单
    app.use(menusRouter)










    //所有的都没有匹配上时就
    app.use((req,res)=>{
      res.json({
        status:400,
        message:"Not Found!"
      })
    })

  },
  (ret, msg) => {
    //连接数据库失败
    console.log(ret, msg);
  }
);

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("node启动成功");
  }
});
