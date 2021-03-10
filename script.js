let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); // Renderiza o desenho que acontece dentro do canvas.
let box = 32;
let snake = [];
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
/* Math.floor retira a parte flutuante (0.) do Math.random, que por sua vez sempre 
retorna um numero aleatorio 1 até aonde setamos. */

snake[0] = {
    x: 8 * box,
    y: 8 * box
}

function criarBG(){ // Começa o Canvas
    context.fillStyle = "lightgreen"; // Style.
    context.fillRect(0,0,16*box,16*box); // Retangulo aonde o jogo vai acontecer.
}

// Cobra é um array de coordeadas.
function criarCobra(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x , snake[i].y, box, box);
    }
}

function comida(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}
/* Ao se aperter uma tecla, addEventListener vai chamar a update e vai passar como argumento
o evento de tecla que passamos (37,38,39,40)*/

function iniciarJogo(){

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(var i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Morreu :(');
        }
    }

    criarBG();
    criarCobra();
    comida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right"){
        snakeX += box;
    }
    if(direction == "left"){
        snakeX -= box;
    }
    if(direction == "up"){
        snakeY -= box;
    }
    if(direction == "down"){
        snakeY += box;
    }

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x : snakeX,
        y : snakeY
    }

    snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100);

