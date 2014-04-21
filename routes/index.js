var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Home' });
});

router.get('/register', function(req, res) {
  res.render('register', { title: 'Express' });
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'Express' });
});

router.get('/dashboard', function(req, res) {
  res.render('dashboard', { title: 'Express' });
});


module.exports = router;
