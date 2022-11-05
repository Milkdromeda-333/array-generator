// DOM elements
const input = document.querySelector("input");
const canvas = document.querySelector("#canvas");

const formatPanelBtn = document.querySelector("#formatSec-toggler");
const submitBtn = document.querySelector("#submit-btn");
const copyBtn = document.querySelector("#copy-btn");
const clearBtn = document.querySelector("#clear-btn");
const stringifyBtn = document.querySelector("#stringify-btn");
const formatBtn = document.querySelector("#line-by-line-btn");

// VRIABLES
const formattingOpts = {
    isStringified: false,
    isFormatted: false
};
const userArr = [];


// FUNCTIONS

// callback function for triggering a re-render of the array
function rerenderArr() {
    let arr = document.createElement("p");
    arr.className = "generated-arr";

    if (formattingOpts.isFormatted) {
        arr.innerHTML = `[${userArr.join(",<br> ")}]`;
    } else {
        arr.innerHTML = `[${userArr.join(", ")}]`;
    }
    canvas.lastChild && canvas.removeChild(canvas.lastChild);
    canvas.appendChild(arr);
    console.log(arr.innerHTML);
}

// DOCS: handles submitting the user input
function submit() {

    let element = input.value;

    // adds " " around element
    if (formattingOpts.isStringified === true) {
        element = `"${input.value}"`;
    }

    userArr.push(element);
    rerenderArr();
    input.value = "";
}

// EVENT LISTENERS


// DOCS: submits users input if they hit enter
document.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        submit();
    }
});

// DOCS: submits users input if they hit the submit button
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

        // DOCS: removes the copy notif after 2 secs
        setTimeout(() => {
            copyBtn.classList.remove("copy-btn-copied");
        }, 2000);
    } else {
        canvas.textContent = "Nothing here to copy...";
    }
});

clearBtn.addEventListener("click", () => {
    canvas.removeChild(canvas.lastChild);
    userArr.length = 0;
});

// DOCS: onclick the program will toggle stringifying the users input
stringifyBtn.addEventListener("click", () => {

    if (formattingOpts.isStringified === true) {

        formattingOpts.isStringified = false;
        stringifyBtn.classList.toggle("formatting-panel-btn-inactive");
        stringifyBtn.classList.remove("formatting-panel-btn-active");

    } else if (formattingOpts.isStringified === false) {

        formattingOpts.isStringified = true;
        stringifyBtn.classList.toggle("formatting-panel-btn-active");
        stringifyBtn.classList.remove("formatting-panel-btn-inactive");

    }
});

formatBtn.addEventListener("click", () => {

    if (formattingOpts.isFormatted === true) {

        formattingOpts.isFormatted = false;
        formatBtn.classList.toggle("formatting-panel-btn-inactive");
        formatBtn.classList.remove("formatting-panel-btn-active");
        rerenderArr();

    } else if (formattingOpts.isFormatted === false) {

        formattingOpts.isFormatted = true;
        formatBtn.classList.toggle("formatting-panel-btn-active");
        formatBtn.classList.remove("formatting-panel-btn-inactive");
        rerenderArr();
    }
});
