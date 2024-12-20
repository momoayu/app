/***変数宣言***/
//オセロの盤面を配列として定義。0:緑、1：黒、2:白　
var color= [
    [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,2,0,0,0]
    ,[0,0,0,2,1,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]
];

var table= document.getElementById("tb1");
var tdElements = document.querySelectorAll("#tb1 td");
tdElements= Array.from(tdElements);
//テーブルの各セルにonclickを付与。引数として座標を渡す
for(let i=0; i<color.length; i++){
    for(let j=0; j<color.length; j++){
        tdElements[i*color.length+j].onclick=function(){
            var x=i;
            var y=j;
            getResponse(x,y);
        }
    }
}

var skillCount=document.getElementsByClassName("offSkill").length;
//各プレイヤーの石の色を定義
var playerColorNumber={player1: "1", player2: "2"};
var tableColorNumber=0;
//各方向において、隣のマスで座標がいくつ変わるかを定義
var direction=[{x:0,y:-1},{x:0,y:1},{x:1,y:0},{x:-1,y:0},{x:-1,y:1},{x:-1,y:-1},{x:1,y:-1},{x:1,y:1}];
//各方向で石が何個置けるかどうか
var count=[0,0,0,0,0,0,0,0];
var player= "player1"
var turnText= "player1のターンです"
var step=0;
var placeable=false;
var count_black=0;
var count_white=0;
var cnt=0;
var array=[];
var random=0;

/***メソッド定義***/
//任意のマスをクリックしたときのメソッド
function getResponse(x,y){
    if(color[x][y]!=tableColorNumber){
        return;
    }
    turnText= player+"のターンです"
    count_black=0;
    count_white=0;
    count=[0,0,0,0,0,0,0,0];
    document.getElementById("turnText1").textContent= turnText;
    countStone(x,y);
    changeColor(x,y);
    if(count_some==true){
        //石が置かれた場合に、プレイヤーを変更し、誰のターンかを表示するテキストも変更する
        changePlayerAndText();
    }
    //スキルを使える状態で、相手が使わずに石を置いた時、スキルを使えなくする
    if(document.getElementById("s1").disabled==false){
        disabledSkill();
    }
    //石が置かれた場合も、そうでない場合も、黒と白の石の数を計算して表示させる
    changeDisplayNumber();
    //石を置いた後、負けているプレイヤーがスキルを使えるようにする。
    if(player=="player1"){
        if(count_white-count_black>10){
            abledSkill();
        }
    }else{
        if(count_black-count_white>10){
            abledSkill();
        }
    }
    //ゲーム終了判定
    judgement();
    //ボタンを押した時の処理終了
}

//盤面の位置(x,y)を引数として、ひっくり返せる石を数えるメソッド
function countStone(x,y){
    count=[0,0,0,0,0,0,0,0];
    //8方向で繰り返し処理を行う
    for(let i=0; i<Object.keys(direction).length; i++){
        cnt=0;
        step=1;
        next_x=x+step*direction[i]["x"];
        next_y=y+step*direction[i]["y"];
        //マスサイズ以内で以下の処理を繰り返す
        while(next_x>=0&&next_x<color.length&&next_y>=0&&next_y<color.length){
            //石が置かれていない場合
            if(color[next_x][next_y]==tableColorNumber){
                break;
            //石が置かれている場合
            }else{
                //プレイヤーの石の色と同じ場合
                if(color[next_x][next_y]==playerColorNumber[player]){
                    count[i]=cnt;
                    break;
            //プレイヤーの石の色と異なる場合
                }else{
                    cnt= cnt+1;
                    step=step+1;
                    next_x=x+step*direction[i]["x"];
                    next_y=y+step*direction[i]["y"];
                }
            }
        }
    }
}

//四隅に石を置くメソッド
function cornerOccupied(){
    var corner=[[0,0],[0,color.length-1],[color.length-1,0],[color.length-1,color.length-1]]
    for(let i=0; i<corner.length; i++){
        countStone(corner[i][0],corner[i][1]);
        changeColor(corner[i][0],corner[i][1]);
        forcedPlace(corner[i][0],corner[i][1]);
    }
    disabledSkill();
    changeDisplayNumber();
    changePlayerAndText();
    judgement();
}

//黒白を反転させるメソッド
function reverseStone(){
    for(let i=0; i<color.length; i++){
        for(let j=0; j<color.length; j++){
            if(color[i][j]==1){
                table.rows[i].cells[j].innerHTML= "<img src='白.svg'>"
                color[i][j]= 2;
            }else{
                if(color[i][j]==2){
                    table.rows[i].cells[j].innerHTML= "<img src='黒.svg'>"
                    color[i][j]= 1;
                }
            }
        }
    }
    disabledSkill();
    changeDisplayNumber();
    changePlayerAndText();
    judgement();
}

//石が置かれていない任意の位置にランダムな数の石を置くメソッド
function randomStone(){
    //石を置く数を1から5の中でランダムで定義
    random=Math.floor(Math.random()*5);
    array=[];
    //盤面上で、石が置かれていないところの位置を空の配列に代入する
    for(let i=0; i<color.length; i++){
        for(let j=0; j<color.length; j++){
            if(color[i][j]==tableColorNumber){
                array.push([i,j]);
            }
        }
    }
    //配列をシャッフルする
    shuffleArray(array);
    //ランダム値の数だけ任意のセルを塗りつぶすが、セルの数がランダム値より少ない場合はセルの数だけ塗りつぶす。
    if(array.length<=random){
        cnt=array.length;
    }else{
        cnt=random+1;
    }
    for(let i=0;i<cnt;i++){
        countStone(array[i][0],array[i][1]);
        changeColor(array[i][0],array[i][1]);
        forcedPlace(array[i][0],array[i][1]);
    }
    disabledSkill();
    changeDisplayNumber();
    changePlayerAndText();
    judgement();
}

//スキルを使えるようにするメソッド
function abledSkill(){
    for(i=0; i<skillCount; i++){
        document.getElementsByClassName("onSkill")[i].removeAttribute("disabled");
        document.getElementsByClassName("onSkill")[i].classList.remove("offSkill");
    }
}

//スキルを使えなくするメソッド
function disabledSkill(){
    //スキルを使った後は、アニメーションを停止させる
    for(i=0; i<skillCount; i++){
        document.getElementsByClassName("onSkill")[i].disabled= true;
        document.getElementsByClassName("onSkill")[i].classList.add("offSkill");
    }
}

//配列をシャッフルするメソッド
function shuffleArray(inputArray){
    inputArray.sort(()=> Math.random() - 0.5);
}

//表示している石の数を更新するメソッド
function changeDisplayNumber(){
    count_black=0;
    count_white=0;
    for(let i=0; i<color.length; i++){
        for(let j=0; j<color.length; j++){
            if(color[i][j]=="1"){
                count_black= count_black+1;
            }
            if(color[i][j]=="2"){
                count_white= count_white+1;
            }
        }
    }
    changeText(document.getElementById("numberText1"),count_black);
    changeText(document.getElementById("numberText2"),count_white);
}

//画面を初期に戻すメソッド
function reset(){
    location.reload();
}

//次のプレイヤーが石が置けるか判断し、その結果を返すメソッド
function nextPlayerPlaceable(){
    placeable=false;
    //盤面上の全てのマスで繰り返し処理
    for(let i=0; i<color.length; i++){
        for(let j=0; j<color.length; j++){
            //石が置かれていない場合
            if(color[i][j]==tableColorNumber){
                //石が置けるかどうかの判定
                countStone(i,j);
                count_some=count.some(function(value){return value>0});
                //8方向のうち、少なくとも1つで石が置ける場合
                if(count_some==true){
                    placeable=true;
                }
            }
        }
    }
    return placeable;
}

//ゲームが終了したかどうか、勝者の判定をするメソッド
function judgement(){
    //次のプレイヤーが石が置けるかどうかの判定結果を代入
    placeable=nextPlayerPlaceable();
    //次のプレイヤーが石を置けない場合
    if(placeable==false){
    //プレイヤーを変更する(相手がパスをする)
    changePlayer();
    //自分が続けて石を置けるかどうかを判定する
    placeable=nextPlayerPlaceable();
    //石を置けない場合
    if(placeable==false){
        document.getElementById("turnText1").remove('text1');
        if(count_black>count_white){
            changeText(document.getElementById("turnText2"),"player1の勝ちです");
        }
        if(count_black<count_white){
            changeText(document.getElementById("turnText2"),"player2の勝ちです");
        }
        if(count_black==count_white){
            changeText(document.getElementById("turnText2"),"引き分けです");
        }
        //勝負が着いたらアニメーションは消す
        disabledSkill();
        //自分が続けて石を置ける場合
        }else{
            document.getElementById("pass").classList.remove("btn");
            changePlayer();
        }
    }
}

//石をひっくり返すメソッド
function changeColor(x,y){
    //配列countの中に0より大きい値がある場合はtrueを返す
    count_some=count.some(function(value){return value>0});
    if(count_some==true){
        //押したセルをプレイヤーの色にする
        reverse(table.rows[x].cells[y]);
        //盤面の配列を更新する
        color[x][y]= playerColorNumber[player];
        //8方向での繰り返し処理
        for(let i=0; i<direction.length; i++){
            //count[j]には石が置ける個数が入っている
            for(let j=1; j<=count[i]; j++){
                //ひっくり返せる石をプレイヤーの色にする。
                reverse(table.rows[x+j*direction[i]["x"]].cells[y+j*direction[i]["y"]]);
                //盤面の配列を更新する
                color[x+j*direction[i]["x"]][y+j*direction[i]["y"]]= playerColorNumber[player];
            }
        }
    }
}

//スキルを使用した後、石が置かれなかった場合、強制的に置くメソッド
function forcedPlace(x,y){
    color[x][y]=playerColorNumber[player];
    reverse(table.rows[x].cells[y]);
}

//プレイヤーを変更するメソッド
function changePlayer(){
    if(player=="player1"){
        player="player2"
    }else{
        player="player1"
    }
    return player;
}

//プレイヤーの変更および誰のターンなのかを表示するメソッド
function changePlayerAndText(){
    if(player=="player1"){
            player="player2"
        }else{
            player="player1"
    }
    turnText= player+"のターンです"
    changeText(document.getElementById("turnText1"),turnText);
    //パスボタンにアニメーションがついていたら削除する
    if(document.getElementById("pass").classList.contains("btn")){
    }else{
        document.getElementById("pass").classList.add("btn");
    }
}

function changeText(elm,txt){
    elm.innerHTML=txt;
}

function reverse(elm){
    if(player=="player1"){
        elm.innerHTML= "<img src='黒.svg'>"
    }else{
        elm.innerHTML= "<img src='白.svg'>"
    }
}