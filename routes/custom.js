var express = require('express');
var router = express.Router();

router.get('/',(req,res,next)=>{
    res.json({
        name:"custom route"
    })
})

router.get('/admin',(req,res,next)=>{
    res.redirect('./../../')
})



module.exports = router;