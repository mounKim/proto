var express = require('express');
var ExcelJS = require('exceljs');
var router = express.Router();

router.use(express.static(path.join(__dirname, 'public')));
/* GET home page. */
router.get('/', function(req, res, next) {
  const workbook = new ExcelJS.Workbook();
  workbook.xlsx.readFile(path.join(__dirname, 'public', 'sample.xlsx'))
  .then(() => {
    res.render('index', { title: 'FIND' });
  })
  .catch(err => {
    console.error('파일 읽기 오류:', err);
    res.render('index', { title: 'ERROR' });
  })
});

module.exports = router;
