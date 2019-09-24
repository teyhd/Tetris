var canvas = document.getElementById('tetris_canv');
var ctx = canvas.getContext('2d');
let namef = $(".nam");
let numb = $(".num");
let arr=[]; // Поле
let score=0;
let speed = 1000;
let n_x,n_y,n_tet;
let p_x,p_y,p_tet,p_nam,p_num;
let n_turn_te;
let n_num;
let turn_te;
let pause = true;

function clear_arr(){
 for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 20; y++) {
        try {
           arr[get_id(x*20,y*20)].busy = false;
        } catch (e) {console.log(e)}
    }}
}
function init_arr(){
    for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 20; y++) {
        arr.push({
        x:x,
        y:y,
        busy:false,
        falling:false});
    }}
    for (var x = 0; x < 10; x++) {
        arr.push({
        x:x,
        y:400,
        busy:true,
        falling:false});
    }
} //Инициализая массива
function init_field(){
ctx.strokeRect(0,0,300,400);//Внешний
ctx.strokeRect(0,0,200,400);//Внутренний
ctx.strokeRect(200,120,100,100);//След фигура
for (let x = 0; x < 200; x+=20) {
    for (let y = 0; y < 400; y+=20) {
        ctx.strokeRect(x,y,20,20);}}
} //Инициализая поля

function draw_it(){
    ctx.strokeStyle = "black";
    let flag=false;
    for (let x = 0; x < 200; x+=20) {
        for (let y = 0; y < 400; y+=20) {
            try {
               if (arr[get_id(x,y)].busy == true){
                 if (arr[get_id(x,y)].falling == true) ctx.fillStyle = "blue";
                   else ctx.fillStyle = "red";
               } 
                   else {
                        ctx.fillStyle = "white";
                   }
                   ctx.fillRect(x,y,20,20);
                   ctx.strokeRect(x,y,20,20);
                   flag=true;
            } catch (e) {console.log(e);console.log(x);console.log(y);}
    }}
return flag;
} //Отрисовка поля
function get_id(x,y){
    let temp = x+y/20;
    if(Number.isInteger(temp)&&(temp<200)&&(x<200)&&(y<400)&&(x>=0)&&(y>=0))
    return temp; 
     else return false;
} // Получение id клетки по координатам

function can_went(xe,ye,tet = []){
    let flg = false;
     xe*=20;
     ye*=20;
     try{ 
    if ((get_id(xe,ye)!=false)&&
    (get_id(xe+tet[0],ye+tet[1])!=false)&&
    (get_id(xe+tet[2],ye+tet[3])!=false)&&
    (get_id(xe+tet[4],ye+tet[5])!=false)) {
    if (((arr[get_id(xe,ye)].busy == false)||(arr[get_id(xe,ye)].falling == true))&&
   ((arr[get_id(xe+tet[0],ye+tet[1])].busy == false)||(arr[get_id(xe+tet[0],ye+tet[1])].falling == true))&&
    ((arr[get_id(xe+tet[2],ye+tet[3])].busy == false)||(arr[get_id(xe+tet[2],ye+tet[3])].falling == true))&&
    ((arr[get_id(xe+tet[4],ye+tet[5])].busy == false)||(arr[get_id(xe+tet[4],ye+tet[5])].falling == true))){
        flg=true;
    }}
    } catch (e) {
        flg=false;
        console.log(e);
    }
  // console.log(flg);
    return flg;
} //проверка возможности спавна фигуры
function tetr(xe,ye,tet = [],m=true,n=true){
 if(!can_went(xe,ye,tet)) return false;   
 xe*=20;
 ye*=20;
try {
     arr[get_id(xe,ye)].busy = m;
     arr[get_id(xe+tet[0],ye+tet[1])].busy = m;
     arr[get_id(xe+tet[2],ye+tet[3])].busy = m;
     arr[get_id(xe+tet[4],ye+tet[5])].busy = m;
     
     arr[get_id(xe,ye)].falling = n;
     arr[get_id(xe+tet[0],ye+tet[1])].falling = n;
     arr[get_id(xe+tet[2],ye+tet[3])].falling = n;
     arr[get_id(xe+tet[4],ye+tet[5])].falling = n;
} catch (e) {console.log(get_id(xe,ye));}
} //Работа с массивом

function get_color(){
    let col = ["#FF00FF","#FFD700","#FF1493","#7CFC00 ","#00FFFF","#FF00FF","#0000CD"];
    return col[get_rand(0,6)];
} //Определение цвета
function get_rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
} //Рандом

function can_fall(xe,ye,tet = []){
    let ans = false
    if (can_went(xe,ye+1,tet)) ans = true; 
    return ans;
} //Возможность падения

function line(){
    let ans = false;
    for (var y = 19; y >=0 ; y--) {
        //ans = false;
        for(var x = 0; x < 10; x++){
            if(arr[get_id(x*20,y*20)].busy==true){ 
                ans=true; 
            } else{
                ans = false;
                break;
            }
        }    
        
        if (ans==true){
            ans = y;
        return ans;}
    }

} //Набитый ряд

function score_cont(){
    score += 10*(1001-speed);
    speed-=10;
    console.log(score);
    numb.text(score);
    console.log("New speed: "+speed);
}//Рассчет скорости и очков

function del_line(y){
    score_cont();
    for(var x = 0; x < 10; x++){
        arr[get_id(x*20,y*20)].busy=false;
    } 
     for(var y1 = (y-1); y1 >=0; y1--){
         for(var x1=0;x1<10;x1++){
             if (arr[get_id(x1*20,y1*20)].busy==true){
            arr[get_id(x1*20,y1*20)].busy=false
            arr[get_id(x1*20,(y1+1)*20)].busy=true;
            }
        }
}  
console.log("Deleted: "+y);
 return true;
}//Удалить ряд

function is_fall(){
 let ans = false;
      for(var x = 0; x < 10; x++){
        if (arr[get_id(x*20,0)].busy==true){ ans=true; break;}
        else ans = false;
      }    
 return ans;
} // Проверка первого ряда
function lose(){
    //табличка с таймаутом
    alert("Вы проиграли!");
    clear_arr();
    init_field();
    draw_it();
    timer(true,1000);
    score=0;
    speed = 1000;
}//Перезапуск игры

function predict(){
    p_nam = get_rand(0,7);
    p_num = get_rand(0,4);
    turn_te = list_fig[p_nam];
    p_tet = turn_te[p_num];
    let t_x=get_rand(0,10);
    let t_y=get_rand(0,3);
    let count;

    for (var k = 0; k <= 50; k++) {
        if (k==50) lose();
        if (!can_went(t_x,t_y,p_tet)) {
            p_nam = get_rand(0,7);
            p_num = get_rand(0,4);
            turn_te = list_fig[p_nam];
            p_tet = turn_te[p_num];
            
            t_x=get_rand(0,10);
            t_y=get_rand(0,3);   
        } 
        else{
            break;
        }
    }
    p_x=t_x;
    p_y=t_y;

    ctx.fillStyle = get_color();
    ctx.clearRect(201,121,98,99);
    ctx.fillRect(240,140,20,20);
    ctx.fillRect(240+p_tet[0],140+p_tet[1],20,20);
    ctx.fillRect(240+p_tet[2],140+p_tet[3],20,20);
    ctx.fillRect(240+p_tet[4],140+p_tet[5],20,20);
    
    ctx.strokeRect(240,140,20,20);
    ctx.strokeRect(240+p_tet[0],140+p_tet[1],20,20);
    ctx.strokeRect(240+p_tet[2],140+p_tet[3],20,20);
    ctx.strokeRect(240+p_tet[4],140+p_tet[5],20,20);
return true;
}// Следующая фигура

function new_elem(){
    n_num = p_num;
    n_turn_te = turn_te;
    n_tet = p_tet;
    n_x = p_x;
    n_y = p_y;
}//Из подсказки в жизнь

function move(){
    if(can_fall(n_x,n_y,n_tet)){
        tetr(n_x,n_y,n_tet,false,false);
        tetr(n_x,++n_y,n_tet,true,true);
    }
}//Движение

function go_left(){
    if (can_went((n_x-1),n_y,n_tet)){
        if(pause){
            tetr(n_x,n_y,n_tet,false,false);
            tetr(--n_x,n_y,n_tet,true,true);}
}
}

function go_right(){
    if (can_went((n_x+1),n_y,n_tet)){
        if(pause){
            tetr(n_x,n_y,n_tet,false,false);
            tetr(++n_x,n_y,n_tet,true,true);}
}
}

let turn_tet;
function turn(){
    n_num++;
    if(typeof n_turn_te[n_num] !=="object"){
        n_num = 0;
    } 
    turn_tet = n_turn_te[n_num];
    if (can_went(n_x,n_y,turn_tet)) {
        tetr(n_x,n_y,n_tet,false);
        n_tet = turn_tet;
        tetr(n_x,n_y,n_tet,true);
    }
}//Поворот фигуры

var Timer_Id = null; //id таймера
var timer = function(flag,speed){
    if(flag){ 
        clearInterval(Timer_Id);
        Timer_Id = setInterval(timer, speed);
    }
    if (flag===false) clearInterval(Timer_Id);
    
    if(can_fall(n_x,n_y,n_tet)) move();
    else {
        tetr(n_x,n_y,n_tet,true,false);
        if (line()) del_line(line());
        if (is_fall()) lose();
        new_elem();
        predict();
    }
 draw_it();
};

function update_speed(){
    if(pause)timer(true,speed);
}
function set_pause(){
if (pause==false) {
    timer(true,speed);
    pause=true;
}
else{
    timer(false,1);
    pause=false;
}
console.log(pause);    
}
document.addEventListener('keydown', function(e) {
   // console.log(e.keyCode);
    if (e.keyCode == 27) set_pause();
    if ((e.keyCode == 68)||(e.keyCode == 39)) go_right();//right
    if ((e.keyCode == 65)||(e.keyCode == 37)) go_left(); //left
    if ((e.keyCode == 87)||(e.keyCode == 38)) turn(); //up
    if ((e.keyCode == 83)||(e.keyCode == 40)) move(); //down
});