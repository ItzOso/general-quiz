// Home page code
localStorage.removeItem("numOfQuestions");

const range = document.querySelector("#questions-range");
const number = document.querySelector("#questions-range-display");

number.innerText = range.value;
localStorage.setItem("numOfQuestions", range.value);

range.addEventListener("input", () => {
    number.innerText = range.value;
    localStorage.setItem("numOfQuestions", range.value);
});
