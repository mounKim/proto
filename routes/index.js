var express = require('express');
var ExcelJS = require('exceljs');
var path = require('path');
var router = express.Router();

function compareWithCurrentTime(targetDateTime) {
  const currentYear = new Date().getFullYear();
  const targetDate = new Date(`${currentYear}-${targetDateTime}`);
  const currentDateTime = new Date();

  if (targetDate > currentDateTime) {
    return 1;
  }
}

router.post('/result', function(req, res, next) {
  matchCount = req.body.matchCount;
  odds = req.body.odds;
  purchaseAmount = req.body.purchaseAmount;
  const workbook = new ExcelJS.Workbook();
  workbook.xlsx.readFile(path.join(__dirname, 'sample.xlsx'))
  .then(() => {
    const worksheet = workbook.getWorksheet("데이터");
    var info = {
      num: [],
      day: [],
      hand: [],
      home: [],
      away: [],
      win: [],
      draw: [],
      lose: [],
      select :[]
    }
    worksheet.eachRow((row, rowNumber) => {
      if (compareWithCurrentTime(row.values[2])) {
        info.num.push(row.values[1])
        info.day.push(row.values[2])
        info.hand.push(row.values[3])
        info.home.push(row.values[4])
        info.away.push(row.values[5])
        info.win.push(row.values[6])
        info.draw.push(row.values[7])
        info.lose.push(row.values[8])
        if (row.getCell(6).style.fill.fgColor != undefined) {
          info.select.push(parseFloat(row.values[6]))
        }
        else if (row.getCell(7).style.fill.fgColor != undefined) {
          info.select.push(parseFloat(row.values[7]))
        }
        else if (row.getCell(8).style.fill.fgColor != undefined) {
          info.select.push(parseFloat(row.values[8]))
        }
      }
    });
    while (true) {
      var sample = []
      var i_sample = []
      while (sample.length < matchCount) {
        var index = Math.floor(Math.random() * info.select.length);
        var element = info.select[index];
        if (!i_sample.includes(index)) {
          sample.push(element);
          i_sample.push(index);
        }
      }
      result = sample.reduce((a, c) => a * c, 1);
      if (odds * 0.95 < result & odds * 1.05 > result) {
        break
      }
    }
    res.render('result', {
      money: purchaseAmount,
      game_num: matchCount,
      final_odd: result,
      final_num: info.num.filter((_, idx) => i_sample.includes(idx)),
      final_day: info.day.filter((_, idx) => i_sample.includes(idx)),
      final_hand: info.hand.filter((_, idx) => i_sample.includes(idx)),
      final_home: info.home.filter((_, idx) => i_sample.includes(idx)),
      final_away: info.away.filter((_, idx) => i_sample.includes(idx)),
      final_win: info.win.filter((_, idx) => i_sample.includes(idx)),
      final_draw: info.draw.filter((_, idx) => i_sample.includes(idx)),
      final_lose: info.lose.filter((_, idx) => i_sample.includes(idx)),
    });
  })
  .catch(err => {
    console.error(err);
  })
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: "1"});
});

module.exports = router;
