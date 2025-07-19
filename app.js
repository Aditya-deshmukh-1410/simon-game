// key press --> gameStart;

let gameSeq = [];
let userSeq = [];
let btns = ["yellow","red","purple","green"]

let started = false;
let canStart =true; //
let level = 0;

// need to change heading as we click a keyword
let h2 = document.querySelector("h2")
let highScore = localStorage.getItem("Your High Score") || 0;

//  Added: show high score when page loads
document.getElementById("highScoreDisplay").innerText = `High Score: ${highScore}`;
 

document.addEventListener("keypress", startGame);
document.addEventListener("click", startGame);

function startGame() {
  if (!started && canStart ) {
    console.log("game Started");
    started = true;
    levelUp();
  }
}

// button Flash + level up

function gameFlash(btn) {
    btn.classList.add("flash")
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);

}

function userFlash(btn) {
    btn.classList.add("userflash")
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);

}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    let randIdx = Math.floor(Math.random()*4); // 3 to 4
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`)
    gameSeq.push(randColor);
    console.log(gameSeq);
    
    gameFlash(randBtn);

}

function checkAns() {

      let idx = userSeq.length - 1;

    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp,1000);
        }
        console.log("same value");
    }
     else { 
        // high score!!!
        if(level > highScore){
            highScore = level;
            localStorage.setItem("Your High Score",highScore)
            document.getElementById("highScoreDisplay").innerText = `High Score: ${highScore}`;

        }
        h2.innerHTML = `Game Over! Your score was <b> ${level}</b> <br> Press any key to start!`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function (){
            document.querySelector("body").style.backgroundColor="white";
        },150);

         // 4. Prevent fast restart, re-enable after short delay

             canStart = false;
                setTimeout(() => {
                canStart = true;
            }, 1000);
        reset();
    }
}



function btnPress(){
    // console.log(this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor)
    checkAns(userSeq.length-1);
 }// correct loop

let allBtns = document.querySelectorAll(".btn");
for ( let btn of allBtns) {
    btn.addEventListener("click", btnPress);   
}// correct loop

function reset(){
    started = false;
    gameSeq= [];
    userSeq= [];
    level = 0;
}


