const buttons = document.querySelectorAll(".btn");

function btnDown() {
    this.style.setProperty("--height", "45%");
    this.style.transform = "scale(0.97) translateY(2%)";
    this.style.setProperty("--shadow", "1px");
    console.log(this.textContent);
}

function btnUp() {
    this.style.setProperty("--height", "40%");
    this.style.transform = "scale(1)";
    this.style.setProperty("--shadow", "3px");
}

for(x=0; x<buttons.length; x++) {
    buttons[x].onmousedown = btnDown;
    buttons[x].onmouseup = btnUp;
}
