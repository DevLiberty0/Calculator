const buttons = document.querySelectorAll(".btn");
const screen = document.querySelector("#screen");
let num = 0;
let num2 = 0;
let calcType;
let keyCalc; // = 1 jesli wcisnieto "+", "-", "*", "/", "=" lub "potęga"       = 0 jesli wcisnieto cyfre

function scrValue(numIn) {
    if(numIn == "C") {
        num = 0;
        num2 = 0;
        calcType = "";
        screen.textContent = "0";
        screen.style.setProperty("--cont", `"${calcType}"`);
        return;
    }
    if(numIn.charCodeAt(0) == 9003) {
        if(screen.textContent == "0" || screen.textContent.length == 1) {
            screen.textContent = "0";
        } else {
            screen.textContent = screen.textContent.substring(0, screen.textContent.length - 1);
        }
        return;
    }
    if(screen.textContent == "0" || keyCalc){
        (numIn != ".") ? screen.textContent = numIn : screen.textContent = "0.";
    } else if(screen.textContent.length < 8) {
        if(screen.textContent.includes(".")) {
            (numIn != ".") ? screen.textContent += numIn : false;
        } else {
            screen.textContent += numIn;
        }
    }
    keyCalc = 0;    
}

function calc(char, obj) {
    if(char == 8730) {
        screen.textContent = Math.pow(screen.textContent, 1/2);
        calcType = ""; 
    } else {
        if(!keyCalc) {
            num2 = screen.textContent;
            if(calcType) { 
               screen.textContent = eval(num + calcType + num2);
            }
            (char != 61) ? calcType = obj.getAttribute("value") : false;
        } else if(char == 61) {
            if(calcType) { 
                console.log("true");
                screen.textContent = eval(num + calcType + num2);
            }
        } else {
            calcType = obj.getAttribute("value");
        }
        num = screen.textContent;
    }
    if(screen.textContent.length > 8) {
        screen.textContent = screen.textContent.substring(0,9);
    }
    keyCalc = 1;
    screen.style.setProperty("--cont", `"${calcType}"`);
    // if(num1) {
    //     (!keyCalc) ? num2 = screen.textContent : false;
    //     num1 = eval(num1 + calcType + num2);
    //     screen.textContent = num1;
    // } 
    // else {
    //     num1 = screen.textContent;
    // }
    // if(char == 61) {
    //     num2 = 0;
    // }
    // else {
    //     calcType = obj.getAttribute("value");
    // }
    // keyCalc = 1;
}

function btnDown() {
    this.style.setProperty("--height", "45%");
    this.style.transform = "scale(0.97) translateY(2%)";
    this.style.color = "rgb(180, 180, 180)";
    this.style.textShadow = "0 0 5px rgb(180, 180, 180)"
    this.style.setProperty("--shadow", "1px");
    let char = this.textContent.charCodeAt(0);
    (char == 8730 || char == 247 || char == 215 || char == 8722 || char == 43 || char == 61) ?
                              calc(char, this) 
                              : scrValue(this.textContent);   
}

function btnUp() {
    this.style.setProperty("--height", "40%");
    this.style.transform = "scale(1)";
    this.style.color = "rgb(117, 117, 117)";
    this.style.textShadow = ""
    this.style.setProperty("--shadow", "3px");
}

for(x=0; x<buttons.length; x++) {
    buttons[x].onmousedown = btnDown;
    buttons[x].onmouseup = btnUp;
    buttons[x].onmouseleave = btnUp;
}
