const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  else if( num==3 ) luck = '吉';
  else if( num==4 ) luck = '末吉';
  else if( num==5 ) luck = '凶';
  else if( num==6 ) luck = '大凶';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand; // プレイヤーの手
  let win = Number(req.query.win); // 勝利数
  let total = Number(req.query.total); // 試合数

  const num = Math.floor(Math.random() * 3 + 1); // CPUの手をランダムに決定
  let cpu = '';
  if (num === 1) cpu = 'グー';
  else if (num === 2) cpu = 'チョキ';
  else cpu = 'パー';

  // 勝敗の判定
  let judgement = '';
  if (hand === cpu) {
    judgement = '引き分け';
  } else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち';
    win += 1; // 勝った場合は勝利数を増やす
  } else {
    judgement = '負け';
  }
  total += 1; // 試合数を増やす

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total,
  };
  
  res.render('janken', display);
});

app.get("/lucky", (req, res) => {
  const userSelection = req.query.radio;  // ユーザーが選択したくじの結果

  // 運勢の結果を決定
  let lucky = '';
  if (userSelection) {
    lucky = `あなたの選んだくじは「${userSelection}」です！`;
  } else {
    lucky = 'くじを選択してください';
  }

  res.render('lucky', { lucky: lucky });
});

app.get("/match", (req, res) => {
  const yourName = req.query.yourName;
  const partnerName = req.query.partnerName;

  if (!yourName || !partnerName) {
    return res.render("match", { score: null, message: "両方の名前を入力してください。" });
  }

  const score = Math.floor(Math.random() * 101); // 0~100のランダムスコア
  const message = `${yourName}さんと${partnerName}さんの相性スコアは ${score}% です！`;

  res.render("match", { score: score, message: message });
});



app.listen(8080, () => console.log("Example app listening on port 8080!"));
