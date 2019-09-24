$(document).ready(function() {
    var btn_name_inp = $("#button-name"); //Ввел имя перед началом игры
    var inp_name = $('#input-name'); //Поле для ввода имени
    var div_name_inp = $(".name-input"); //Сообщение о вооде имени
    var btn_up = $(".up-btn");
    var btn_down = $(".down-btn");
    var btn_left = $(".left-btn");
    var btn_right = $(".right-btn");
    var btn_pause = $(".pause-btn");
    var pictu = $(".picture");
    //inp_name.keydown( function(e) {e.preventDefault();});
    init_arr();
    init_field();
    btn_name_inp.on('click', function() { //Ввел имя
        let player = inp_name.val();
        if (player == '') player = "Player";
        namef.text(player);
        div_name_inp.hide(); //Убираем поле для ввода
        predict();
        new_elem();
        predict();
        timer(true,1000);
        setInterval(draw_it,50);
        setInterval(update_speed,5000);
    });    

        
function btn_pos() {
    btn_up.offset({
        top: 415,
        left: 12,
    });
    btn_down.offset({
        top: btn_up.position().top,
        left: btn_up.width()+btn_up.position().left+20,
    });
    btn_left.offset({
        top: btn_up.position().top,
        left: btn_down.width()+btn_down.position().left+20,
    });
    btn_right.offset({
        top: btn_up.position().top,
        left: btn_left.width()+btn_left.position().left+20,
    });
    btn_pause.offset({
        top: 300,
        left: 225,
    });
}

    btn_pause.on('click', function() {
            set_pause();
            if(pause) pictu.attr("src","img/pause.png");
            else pictu.attr("src","img/play.png");
            //src="img/pause.png"
        });
    btn_up.on('click', function() {
        turn();
    });
    btn_down.on('click', function() {
        move();
    });
    btn_left.on('click', function() {
        go_left();
    });
    btn_right.on('click', function() {
        go_right();
    });        
     btn_pos();   
 });

