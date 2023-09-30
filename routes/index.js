var express = require('express');
var ExcelJS = require('exceljs');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const workbook = new ExcelJS.Workbook();
  workbook.xlsx.readFile(path.join(__dirname, 'sample.xlsx'))
  .then(() => {
    const worksheet = workbook.getWorksheet(1);
    const data = [];
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      data.push(row.values);
    });
    res.render('index', {title: data});
  })
  .catch(err => {
    console.error(err);
  })
});

module.exports = router;
