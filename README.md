# app5.jsのドキュメント

## hello1とhello2について

### ファイル一覧
ファイル名|説明
-|-
app5.js | プログラム本体
views/show.ejs |hello1とhello2のテンプレートファイル

### hello1のプログラムの内容
　
```const message1 = "Hello world";```
```const message2 = "Bon jour";```
→Hello worldとBon jourの二つの文字列をそれぞれ変数```message1```,```message2```に格納する.

```res.render('show', { greet1:message1, greet2:message2});```
→```show.ejs```に```message1```,```message2```を渡す

### hello2のプログラムの内容
```res.render('show', { greet1:"Hello world", greet2:"Bon jour"});```
→定義された文字列を```show.ejs```に渡す.

### 使用方法
1. ```app5.js```を起動する
1. Webブラウザで```localhost:8080/hello1 or hello2```にアクセスする.

## iconについて

### ファイル一覧
ファイル名|説明
-|-
app5.js | プログラム本体
views/icon.ejs | iconのテンプレートファイル
public/Apple_logo_black.svg |表示する画像

### プログラムの内容
```res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});```
→```icon.ejs```に画像ファイルを渡す.

### 使用方法
1. ```app5.js```を起動する
1. Webブラウザで```localhost:8080/icon```にアクセスする.

## luckについて

### ファイル一覧
ファイル名|説明
-|-
app5.js | プログラム本体
views/luck.ejs | luckのテンプレートファイル

### プログラムの内容
```
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  else if( num==3 ) luck = '吉';
  else if( num==4 ) luck = '末吉';
  else if( num==5 ) luck = '凶';
  else if( num==6 ) luck = '大凶';
```
```Math.floor```→1から6のランダムな数字を生成し,1から6をそれぞれ大吉,中吉,吉,末吉,凶,大凶に割り当てる.

```console.log( 'あなたの運勢は' + luck + 'です' );```→引いた運勢を表示する.

```res.render( 'luck', {number:num, luck:luck} );```→　```luck.ejs```に```number```(ランダムな数)と```luck```(運勢)を渡す.

### 使用方法
1. ```app5.js```を起動する
1. Webブラウザで```localhost:8080/luck```にアクセスする.

## jankenについて

### ファイル一覧
ファイル名|説明
-|-
app5.js | プログラム本体
views/janken.ejs | jankenのテンプレートファイル
public/janken.html | じゃんけん開始画面

### プログラムの内容
```
let hand = req.query.hand; 
let win = Number(req.query.win); 
let total = Number(req.query.total); 
```
→プレイヤーの手,勝利数,試合数を格納する.

```const num = Math.floor(Math.random() * 3 + 1); ```
→1から3のランダムな数字を生成

```
  let cpu = '';
  if (num === 1) cpu = 'グー';
  else if (num === 2) cpu = 'チョキ';
  else cpu = 'パー';
```
→numの数字に応じて変数cpuにグー,チョキ,パーという文字列を格納する.

```let judgement = '';```
→勝敗結果を格納するための変数```judgement```を初期化する.

```
if (hand === cpu) {
    judgement = '引き分け';
  } 
```
→プレイヤーとCPUの手が同じ場合、結果を"引き分け" として設定する.

```
 else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち';
    win += 1; // 勝った場合は勝利数を増やす
  }
```
→
・プレイヤーが "グー" かつ CPU が "チョキ"
・プレイヤーが "チョキ" かつ CPU が "パー"
・プレイヤーが "パー" かつ CPU が "グー"
上記のいずれかが満たされれば,プレイヤーの勝利となり```judgement```に"勝ち"を入れ,```win```を1増やす.

```
else {
    judgement = '負け';
  }
```

→上記のどれにも当てはまらない場合,プレイヤーが負けたと判断し```judgement```に"負け"を設定する.

```total += 1;```
→試合数を1増やす.勝敗に関係なく試合が行われるたび,実行される.

```
const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total,
  };
  
  res.render('janken', display);
```

 →```janken.ejs ```にプレイヤーの手,cpuの手,勝敗結果,勝利数,試合数を渡す.

### 使用方法
1. ```app5.js```を起動する
1. Webブラウザで```localhost:8080/public/janken.html```にアクセスする
1. 自分の手を入力する

## luckyについて

### ファイル一覧
ファイル名|説明
-|-
app5.js | プログラム本体
views/lucky.ejs | luckyのテンプレートファイル
public/lucky.html | くじ選択画面

### プログラムの内容
```
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
```

→ユーザーが選択したくじを取得して結果を表示
何も選択せず送信した場合は「くじを選択してください」というメッセージを返す

### 使用方法
1. ```app5.js```を起動する
1. Webブラウザで```localhost:8080/public/lucky.html```にアクセスする
1. くじを選ぶ


## matchについて

### ファイル一覧
ファイル名|説明
-|-
app5.js | プログラム本体
views/match.ejs | matchのテンプレートファイル

### プログラムの内容
```
if (!yourName || !partnerName) {
    return res.render("match", { score: null, message: "両方の名前を入力してください。" });
  }
```
:yourNameまたはpartnerNameが未入力である場合, 「両方の名前を入力してください。」というメッセージをテンプレートに表示する


```const score = Math.floor(Math.random() * 101)```
→0から100のランダムなスコアを生成する

```const message = `${yourName}さんと${partnerName}さんの相性スコアは ${score}% です！`;```
→名前とスコアを組み合わせて文字列を作り,変数messageに格納する

```res.render("match", { score: score, message: message });```
→```match.ejs```に```score```と```message```を渡す

### 使用方法
1. ```app5.js```を起動する
1. Webブラウザで```localhost:8080/match```にアクセスする
1. 名前を入力する