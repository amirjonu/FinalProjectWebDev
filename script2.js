function animat(){
    document.getElementById('start').classList.add('animateStartButton');
    send();
}


    var option=0;

    function option1(){
        option=1;
    }
    function option2(){
        option=2;
    }
    function option3(){
        option=3;
    }


    //Mr Turner
function send(){
    window.location.href = 'Game.html?variable='+option;
}



