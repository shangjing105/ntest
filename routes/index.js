var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/login',function (req,res) {
  res.render('login',{title:'node登录'});
});

router.get('/register',function (req,res) {
  res.render('register',{title:'node注册'});
});

router.post('/login',function (req,res) {
  var username=req.body.username;
  var password=req.body.password;
  var User=global.dbHandel.getModel("user");
  User.findOne({username:username},function (err,doc) {
    if (err) {
      res.status(500).send();
      console.info(err);
    }else if (!doc){
      res.send({status:false,msg:'用户名不存在'});
      console.info("用户名不存在");
    }else {
      if (password==doc.password) {
        req.session.user=doc;
        res.send({status:true,msg:doc.username});
        console.info("OK");
      }else {
        res.send({status:false,msg:'密码错误'});
        console.info("密码错误");
      }

    }

  });
  
});


router.post('/register',function (req,res) {
  var username=req.body.username;
  var password=req.body.password;
  console.info("用户新增"+username+"----"+password);
  var User=global.dbHandel.getModel("user");
  User.findOne({username:username},function (err,doc) {
    if (err) {
      res.status(500).send();
      console.info(err);
    }else {
      if (doc) {
        res.send({status:false,msg:'用户已存在'});
        console.info("用户已存在");
      }else {
        User.create({username:username,password:password},function (err,doc) {
          if (err) {
            res.send({status:false,msg:'用户新增失败'});
            console.info("用户新增失败");
          }else {
            res.send({status:true,msg:'OK'});
            console.info("OK");
          }
        });
      }
    }
  });
});

router.get('/home',function (req,res) {
  if (!req.session.user) {
    res.redirect("/login");
  }
  var User=global.dbHandel.getModel("user");
  User.find({},function (err,doc) {
    res.render('home',{title:'首页',doc:doc});
  });

});

router.get('/logout',function (req,res) {
  req.session.destroy();
  res.redirect("/");
});




/**
 * 学生列表
 */
router.get('/list',function (req,res) {
  console.log("list---");
  var Student=global.dbHandel.getModel("student");
  Student.find({},function (err,doc) {
    if (err) {
      res.send({status:false,msg:'失败'});
      console.info("失败");
    }else {
      res.send({status:true,msg:doc});
      console.info("OK");
    }
  });
});

/**
 * 学生新增
 */
router.post('/add',function (req,res) {
  console.log(req.body);
  var stu=req.body;
  var Student=global.dbHandel.getModel("student");
  Student.create({name:stu.name,sex:stu.sex,age:stu.age,mobil:stu.mobil,address:stu.address},function (err,doc) {
    if (err) {
      res.send({status:false,msg:'用户新增失败'});
      console.info("用户新增失败");
    }else {
      res.send({status:true,msg:'OK'});
      console.info("OK");
    }
  });
});

/**
 * 学生修改前
 */
router.get('/update',function (req,res) {
  var id=req.query.id;
  var Student=global.dbHandel.getModel("student");
  Student.findById({_id:id},function (err,doc) {
    if (err) {
      res.send({status:false,msg:'失败'});
      console.info("失败");
    }else {
      res.send({status:true,msg:doc});
      console.info("OK");
    }
  });
});

/**
 * 学生修改
 */
router.post('/update',function (req,res) {
  console.log(req.body);
  var stu=req.body;
  var Student=global.dbHandel.getModel("student");
  Student.update({_id:stu._id},{name:stu.name,sex:stu.sex,age:stu.age,mobil:stu.mobil,address:stu.address},function (err,doc) {
    if (err) {
      res.send({status:false,msg:'失败'});
      console.info("失败");
    }else {
      res.send({status:true,msg:'OK'});
      console.info("OK");
    }
  });
});

/**
 * 学生删除
 */
router.get('/delete',function (req,res) {
  var id=req.query.id;
  var Student=global.dbHandel.getModel("student");
  Student.remove({_id:id},function (err,doc) {
    if (err) {
      res.send({status:false,msg:'失败'});
      console.info("失败");
    }else {
      res.send({status:true,msg:'OK'});
      console.info("OK");
    }
  });
});

module.exports = router;
