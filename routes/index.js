var express = require('express');
var ExcelJS = require('exceljs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const workbook = new ExcelJS.Workbook();
  workbook.xlsx.readFile('./routes/sample.xlsx')
  .then(() => {
    res.render('index', { title: 'FIND' });
  })
  .catch(err => {
    res.render('index', { title: 'ERROR' });
  })
});

module.exports = router;
