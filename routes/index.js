var express = require('express');
var router = express.Router();
const path = require('path')

/* GET home page. */


router.get('^/$|/index(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','index.html'))
})
router.get('/new(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','new-page.html'))
})
router.get('/old(.html)?',(req,res)=>{
    res.redirect(301, '/new.html');
})
router.get('/about(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','about.html'))
});
module.exports = router;
