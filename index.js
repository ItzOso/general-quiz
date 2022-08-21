// Home page code
const range = document.querySelector("#questions-range");
const number = document.querySelector("#questions-range-display");

number.innerText = range.value;

range.addEventListener("input", () => {
    number.innerText = range.value;
});

const start = document.querySelector("#start");

start.addEventListener("click", () => {
    console.log("clicked")
    localStorage.setItem("numOfQuestions", range.value);

    window.location.href = "./game.html"
})