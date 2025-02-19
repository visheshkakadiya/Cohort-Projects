const screen = document.getElementById("screen")
const buttons = document.querySelectorAll("button")

let expression = ""

buttons.forEach(button => {
    button.addEventListener('click', function() {
       handleInput(button.innerText)
    })
});

document.addEventListener('keydown', function(event) {
    const key = event.key

    if(!isNaN(key) || '+-/%*.'.includes(key)) {
        handleInput(key)
    } else if(key === "Enter") {
        handleInput("=");
    } else if (key === "Backspace") {
        handleInput("⌫");
    } else if (key.toLowerCase() === "c") {
        handleInput("AC");
    }
})

function handleInput(input) {
    if(input === "AC") {
        expression = ""
    } else if(input === "⌫") {
        expression = expression.slice(0, -1)
    } else if(input === "=") {
        try {
            expression = expression.replace(/÷/g, "/")
            expression = expression.replace(/x/g, "*")
            expression = String(calculateExpression(expression));
            if(screen.innerText === "") {
                screen.innerText = "invalid"
            } else {
                screen.innerText = expression
            }
            return
            
        } catch (error) {
            expression = "invalid"
            screen.innerText = expression
        }
    }
    else {
        if('+-/%*.x'.includes(input) && '+-/%*.x'.includes(expression.slice(-1))) {
            return;
        }
        expression += input
        //expression.innerText += expression
    }

    screen.innerText = expression
}

function calculateExpression(exp) {
    return new Function('return ' + exp)()
}