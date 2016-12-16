require('dotenv').config();
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var jwt = require('jsonwebtoken');
var bearerToken = require('express-bearer-token');
var bcrypt = require('bcrypt');
var jwtDecode = require('jwt-decode');
var errors;
var token;



router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
});
router.post('/api/database', function(req,res,next){
  knex(req.body.regName).insert({
    itemId: req.body.id,
    itemName: req.body.name,
    volumeSell: req.body.volumeSell,
    buy: req.body.buy,
    sell: req.body.sell,
    markup: req.body.markup,
    histAvg: req.body.histAvg,
    profitPotential: req.body.profitPotential,
  }).then(function(data){
    console.log(data);
  })
})
router.post('/login', function(req, res, next) {
  knex('users')
  .where({
    username: req.body.username
  })
  .first()
  .then(function(data){
    console.log(data);
    if(!data){
      res.json({errors: 'username or password is incorrect'})
    } else if(bcrypt.compareSync(req.body.pass, data.password)){
      token = jwt.sign({id: data.id, username: data.username}, process.env.SECRET);
      console.log(token);
      res.json({token:token});
    } else {
      res.json({errors: 'username or password is incorrect'})
    }
  }).catch(function(err){
    res.json({errors: 'something went wrong'})
  })
});

module.exports = router;
