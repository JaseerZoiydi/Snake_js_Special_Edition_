//Snake_Informations
class Snake {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.tail = [{x:this.x, y:this.y}]
        this.rotateX = 0
        this.rotateY = 1
    }
    //Function_Move
    move() {
        let newRect

        if (this.rotateX == 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.rotateX == -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.rotateY == 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            }
        } else if (this.rotateY == -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            }
        }

        this.tail.shift()
        this.tail.push(newRect)
    }
}
// Function_Make_Apple_Position
class Apple{
    constructor(){
        let isTouching
        
        while (true) {
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size
            
            for (let i = 0; i < snake.tail.length; i++) {
                if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                    isTouching = true
                }
            }

            this.size = snake.size
            this.color = "red"

            if (!isTouching) {
                break;
            }
        }
    }
}

// Template_Information
const canvas = document.getElementById("canvas")
const canvasContext = canvas.getContext('2d')
const snake = new Snake(20,20,20);
let apple = new Apple();
window.onload = () => {
    gameLoop()
}

// Game_Play_Functions

//Function_GameLoop
function gameLoop() {
    setInterval(show, 1000/20) //  20 fps
}

// Function_Show
function show() {
    update()
    draw()
}

// Function_Update
function update() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    snake.move()
    eatApple()
    checkHitWall()
}

// Function_EatApple
function eatApple() {
    if(snake.tail[snake.tail.length - 1].x == apple.x &&
        snake.tail[snake.tail.length - 1].y == apple.y){
            snake.tail[snake.tail.length] = {x:apple.x, y: apple.y}
            apple = new Apple();
        }
}

// Function_CheckHillWall
function checkHitWall() {
    let headTail = snake.tail[snake.tail.length -1]

    if (headTail.x ==  -snake.size) {
        headTail.x = canvas.width - snake.size
    }else if(headTail.x == canvas.widh) {
        headTail.x = 0
    }else if(headTail.y == - snake.size) {
        headTail.y = canvas.height - snake.size
    }else if (headTail.y == canvas.height) {
        headTail.y = 0 
    }else if (headTail.x == canvas.width) {
        headTail.x = 0 
    }
}

//Function_Draw
function draw() {
    createRect(0,0,canvas.width, canvas.height, "DarkCyan")
    createRect(0,0, canvas.width, canvas.height)

    for (let i = 0; i < snake.tail.length; i++){
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5,
            snake.size - 5, snake.size- 5, "white")
    }

    canvasContext.font = "20px Patrick Hand"
    canvasContext.fillStyle = "white"
    canvasContext.fillText("0" + (snake.tail.length -1),canvas.width - 60,25)
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color)
}

// Function_CreateRect
function createRect(x,y,width, height,color) {
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, height)
}

// Game_Play
window.addEventListener("keydown", (event) => {
    setTimeout(() => {
        if (event.keyCode == 37 && snake.rotateX != 1) {
            snake.rotateX = -1
            snake.rotateY = 0
        } else if (event.keyCode == 38 && snake.rotateY != 1) {
            snake.rotateX = 0
            snake.rotateY = -1
        } else if (event.keyCode == 39 && snake.rotateX != -1) {
            snake.rotateX = 1
            snake.rotateY = 0
        } else if (event.keyCode == 40 && snake.rotateY != -1) {
            snake.rotateX = 0
            snake.rotateY = 1
        }
    }, 1)
})
