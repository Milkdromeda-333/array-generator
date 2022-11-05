// VARIABLES

const submitBtn = document.querySelector("#submit-btn");
const input = document.querySelector("input");
const canvas = document.querySelector("#canvas");
const copyBtn = document.querySelector("#copy-btn");
const clearBtn = document.querySelector("#clear-btn");
const stringifyBtn = document.querySelector("#stringify-btn");
let isStringified = false;
const userArr = [];

// FUNCTIONS

// handles submitting the user input
function submit() {

    let element = input.value;
    if (isStringified === true) {
        element = `"${input.value}"`;
    }
    userArr.push(element);
    let arr = document.createElement("p");
    arr.className = "generated-arr";
    arr.innerHTML = `[${userArr.join(", ")}]`;
    arr.style.fontSize = "1.5rem";
    canvas.lastChild && canvas.removeChild(canvas.lastChild);
    canvas.appendChild(arr);
    input.value = "";
}

// submits users input if they hit enter
document.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        submit();
    }
});

// submits users input if they hit the submit button
submitBtn.addEventListener("click", submit);


copyBtn.addEventListener("click", () => {
    if (canvas.textContent === "Nothing here to copy...") {
        return;
    }
    if (canvas.lastChild) {
        canvas.lastChild.style.backgroundColor = "black";
        canvas.lastChild.style.color = "white";
        canvas.lastChild.style.padding = "0";
        copyBtn.classList.add("copy-btn-copied");
        navigator.clipboard.writeText(canvas.lastChild.textContent);

        // removes the copy notif after 2 secs
        setTimeout(() => {
            copyBtn.classList.remove("copy-btn-copied");
        }, 2000);
    } else {
        canvas.textContent = "Nothing here to copy...";
        return;
    }

});

clearBtn.addEventListener("click", () => {
    canvas.removeChild(canvas.lastChild);
    userArr.length = 0;
});

// onclick the program will toggle stringifying the users input
stringifyBtn.addEventListener("click", () => {

    if (isStringified === true) {
        isStringified = false;
        stringifyBtn.textContent = "stringify!";
    } else if (isStringified === false) {
        isStringified = true;
        stringifyBtn.textContent = "UNstringify!";
    }

    console.log(isStringified);
});

console.log("isstringifyed onmount: " + isStringified);