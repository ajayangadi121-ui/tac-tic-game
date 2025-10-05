console.log("welcome to tic tac game");

let music = new Audio("music.mp3");
let audioTurn = new Audio("mixkit.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "x";
let isgameover = false;

// function to change the turn
const changeTurn = () => {
    return turn === "x" ? "0" : "x";
};

// function to check win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [0,4,8]
    ];
    wins.forEach(e =>{
        if(
            (boxtext[e[0]].innerText === boxtext[e[1]].innerText) && 
            (boxtext[e[2]].innerText === boxtext[e[1]].innerText) &&
            (boxtext[e[0]].innerText !=="") 
        ){
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " won";
            isgameover = true;
            document.querySelector(".imgbox img").style.width = "200px";
            gameover.play(); // play gameover sound
        }
    });
};

//  before playing background music
document.addEventListener("click", () => {
    if (music.paused) {
        music.play().catch(err => console.log("Music not allowed:", err));
    }
}, { once: true });

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if(!isgameover){
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});
//add onclick reset
let reset = document.getElementById('reset');

reset.addEventListener('click', () => {
    // Select ALL box texts
    let boxtexts = document.querySelectorAll('.boxtext'); 
    boxtexts.forEach(element => {
        element.innerText = ""; // clear each box
    });

    // Reset game variables
    turn = "x";
    isgameover = false;
    // Update info
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    // Reset image width
    document.querySelector(".imgbox img").style.width = "0px";
});

