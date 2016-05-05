var express = require('express');
var router = express.Router();
/**
 * 学生列表
 */
router.get('/list',function (req,res) {
    res.render('index', { title: 'Express' });
});

/**
 * 学生新增
 */
router.post('/add',function (req,res) {
    console.info(req.student);
   // var Student=global.dbHandel.getModel("student");
    // Student.create({},function (err.doc) {
    //
    // });
    res.render('index', { title: 'Express' });
});

/**
 * 学生修改
 */
router.post('/update',function (req,res) {

});

/**
 * 学生删除
 */
router.post('/delete',function (req,res) {

});

module.exports = router;