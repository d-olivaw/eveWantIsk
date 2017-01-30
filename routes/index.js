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

router.get('/api/data', function(req,res,next){
  var promiseArr = [];
  var regionObj = {};
  knex('jita').then(function(data){
    regionObj.jita = data;
  }).then(function(){
    promiseArr.push(knex('amarr').then(function(data){
      regionObj.amarr = data;
    }));
    promiseArr.push(knex('dodixie').then(function(data){
      regionObj.dodixie = data;
    }));
  }).then(function(){
    return Promise.all(promiseArr).then(function(){
      res.json(regionObj);
    })
  })
});

router.post('/api/database', function(req,res,next){
  knex.raw('INSERT INTO ' + req.body.regName + " "
  + "(itemid, itemname, volumesell, buy, sell, markup, histavg, profitpotential)"
  + " VALUES ("  + req.body.id  + ", '" + req.body.name + "'," + req.body.volumeSell
  + ', ' + req.body.buy + ", " + req.body.sell + ", " + req.body.markup + ", "
  + req.body.histAvg + ", " + req.body.profitPotential + ")"
  + " ON CONFLICT " + "(itemId) "
  + "DO UPDATE SET " + "(itemname, volumesell, buy, sell, markup, histavg, profitpotential)"
  + "= ('" + req.body.name + "' , " + req.body.volumeSell + ", " + req.body.buy + ", "
  + req.body.sell + ", " + req.body.markup + ", " + req.body.histAvg + ", "
  + req.body.profitPotential + ")")
  .then(function(data){
    console.log(data);
  }).catch(function(err){
    console.log(err);
  })
});

router.post('/login', function(req, res, next) {
  knex('users')
  .where({
    username: req.body.username
  })
  .first()
  .then(function(data){
    // console.log(data);
    if(!data){
      res.json({errors: 'username or password is incorrect'})
    } else if(bcrypt.compareSync(req.body.pass, data.password)){
      token = jwt.sign({id: data.id, username: data.username}, process.env.SECRET);
      // console.log(token);
      res.json({token:token});
    } else {
      res.json({errors: 'username or password is incorrect'})
    }
  }).catch(function(err){
    res.json({errors: 'something went wrong'})
  })
});

module.exports = router;
