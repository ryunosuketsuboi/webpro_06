# webpro_06

## このプログラムについて

## ファイル一覧
ファイル名|説明
-|-
app5.js | プログラム本体
public/janken.html | じゃんけん開始画面
views/janken.ejs | じゃんけんのテンプレートファイル

## 使用方法
1. ```app5.js```を起動する
1. Webブラウザでlocalhost:8080/public/janken.htmlにアクセスする
1. 自分の手を入力する


```mermaid
flowchart TD;

start["開始"];
box["グー,チョキ,パーのいずれかを入力する"]
number_of_winning["勝利数を増やす"]
number_of_matches["試合数を増やす"]

start --> box
box--> |勝利|number_of_winning
box -->|負け|number_of_matches
box--> |引き分け|number_of_matches
number_of_winning --> number_of_matches
number_of_matches--> |繰り返し|box
```

