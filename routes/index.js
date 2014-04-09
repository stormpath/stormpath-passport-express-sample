/* GET home page. */
exports.index = function(req, res){
  res.render('index', { title: 'Stormpath Passport Strategy Demo' });
};
