var express = require('express');
const fs = require('fs');
const path = require('path');
var ExcelJS = require('exceljs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  const currentDirectory = process.cwd(); // 현재 작업 디렉토리

  // 하위 폴더 목록 가져오기
  fs.readdir(currentDirectory, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('하위 폴더 목록을 가져오는 동안 오류 발생:', err);
      return;
    }

    // 디렉토리인 하위 폴더만 필터링
    const subdirectories = files
      .filter(file => file.isDirectory())
      .map(directory => directory.name);

    console.log('하위 폴더 목록:', subdirectories);
  });
  const workbook = new ExcelJS.Workbook();
  workbook.xlsx.readFile('sample.xlsx')
  .then(() => {
    res.render('index', { title: 'FIND' });
  })
  .catch(err => {
    console.log(process.cwd());
    console.error('파일 읽기 오류:', err);
    res.render('index', { title: 'ERROR' });
  })
});

module.exports = router;
