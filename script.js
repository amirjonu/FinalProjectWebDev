//https://stackoverflow.com/questions/56767036/es6-class-construction
//for the constructors and all ^^^^
window.onload = function(){
   let option = window.location.href.substring(window.location.href.indexOf("=")+1);
   console.log(option);

    var canvas = document.querySelector("canvas");
    var can= document.querySelector("canvas");
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    canvas = canvas.getContext("2d");
    can.addEventListener("mousemove", (event)=>{
        mouse.x = event.clientX;
    });
    function start(){
        mouse = {
        x: innerWidth/2,
        y: innerHeight-100
        };
    var heightPlayer = 32;
    var widthPlayer= 32;
    var playerImage = new Image();
    var playerHealth = 100;
    var score=0;
    if (option==1){
        playerImage.src= "https://i.postimg.cc/4yRqgWFy/theamazing.webp";
    }else if (option==2){
        playerImage.src= "https://i.postimg.cc/4N5VyJsX/grayspace.webp";
    }else{
        playerImage.src= "https://i.postimg.cc/XqTMpVJj/spaspsp.webp";
    }

    function Player(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
  this.display = ()=> {
        canvas.beginPath();
        canvas.drawImage(playerImage, mouse.x-widthPlayer, mouse.y-heightPlayer); 
        };   
        this.change = () => {
            this.display();
        };
    }
    var player = new Player(mouse.x, mouse.y, widthPlayer, heightPlayer);
    var bullets = []; 
    var widthB = 8;
    var heightB = 10;
    var speedB = 12;
    var bullets2 = []; 
    function bulletMake(x, y, width, height, speed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.display = ()=> {
          canvas.beginPath();
          canvas.rect(this.x, this.y, this.width, this.height);
          canvas.fillStyle = "white";
          canvas.fill();
        };
        this.change = () =>{
          this.y -= this.speed;
          this.display();
        };
      }


      function shoot(){ 
        for (var i = 0; i<1; i++){
          var x = mouse.x-widthB/2;
          var y = mouse.y-heightB;
          var bullet = new bulletMake(x, y, widthB, heightB, speedB);
          bullets.push(bullet);
        }
      }setInterval(shoot, 150);
      function bulletMake2(x, y, width, height, speed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.display = ()=> {
          canvas.beginPath();
          canvas.rect(this.x, this.y, this.width, this.height);
          canvas.fillStyle = "white";
          canvas.fill();
        };
        this.change = () =>{
          this.y -= this.speed;
          this.display();
        };
      }
      function shoot2(){ 
        for (var i = 0; i<1; i++){
          var x = mouse.x-widthB/2;
          var y = mouse.y-heightB;
          var bullet = new bulletMake2(x+50, y, widthB, heightB, speedB);
          bullets2.push(bullet);
        }
      }setInterval(shoot2, 150);

    var badguys = []; 
    var badguyImage = new Image();
    badguyImage.src = "https://i.postimg.cc/4dqWxpk7/enenene.png"
    var widthBad = 30;
    var heightBad = 30;
    function BadGuy(x, y, width, height, speed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.display = () => {
          canvas.beginPath();
          canvas.drawImage(badguyImage, this.x, this.y);
        }; 
        this.change = () => {
          this.y += this.speed;
          this.display();
        };
      }  
      function manyBadGuys(){
        for (var i = 0; i<4; i++){ 
          var x = Math.random()*(innerWidth-widthBad);
          var y = -1 * heightBad; 
          var speed = 1+Math.random()*(3-1+1);
          if (score> 50){
            speed= 3+ Math.random()*(10-3+1);
          }else if (score > 100){
            speed= 10+Math.random()*(20-10+1);
          }
          var badguy = new BadGuy(x, y, widthBad, heightBad, speed);
          badguys.push(badguy);
        }
      }setInterval(manyBadGuys, 4000);

    function animate(){
        requestAnimationFrame(animate); 
        canvas.beginPath(); 
        canvas.clearRect(0,0,innerWidth,innerHeight); 
        canvas.fillStyle = 'white';
        canvas.font = "1em Arial";
        canvas.fillText("Player Health: " + playerHealth, innerWidth-200, 20); 
        canvas.fillText("Score: " + score, 5, 20); 
        player.change();
      for (var i=0; i < bullets.length; i++){
        bullets[i].change();
        if (bullets[i].y < 0){
          bullets.splice(i, 1);
        }
      }
      for (var i=0; i < bullets2.length; i++){
        bullets2[i].change();
        if (bullets2[i].y < 0){
          bullets2.splice(i, 1);
        }
      }

      for (var i=0; i < badguys.length; i++){
        badguys[i].change();
        if(badguys[i].y > innerHeight){
          badguys.splice(i, 1);
          playerHealth -= 10;
        if(playerHealth == 0){
          alert("Your dead. Your score: "+score);
          window.location.href = 'Start.html';
         }
        }
      }
    
      for(var i = badguys.length-1; i >= 0; i--){
        for(var l = bullets.length-1; l >= 0; l--){
          if(kill(badguys[i], bullets[l])){
            badguys.splice(i, 1);
            bullets.splice(l, 1);
            score++;
          }
          if(kill(badguys[i], bullets2[l])){
            badguys.splice(i, 1);
            bullets2.splice(l, 1);
            score++;
          }
        }
      }

    }
    function kill(a,b){
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
      } //taken from stackoverflow for when bullet meets spaceship
   animate();

    }
  start();
};
