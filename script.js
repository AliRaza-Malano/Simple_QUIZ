window.onload = function () {
    let namefocus = document.getElementById("name").focus();
};

document.getElementById("name").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission (if any)
        document.getElementById("startBtn").focus(); // Move focus to the button
    }
});

let questions = new Array(10);
questions[0] = "Q1. What is the capital city of Canada?";
questions[1] = "Q2. Which planet is known as the Red Planet?";
questions[2] = "Q3. Who painted the Mona Lisa?";
questions[3] = "Q4. What is the largest mammal on Earth?";
questions[4] = "Q5. In which year did World War II end?";
questions[5] = "Q6. What is the chemical symbol for gold?";
questions[6] = "Q7. Which language has the most native speakers worldwide?";
questions[7] = "Q8. What is the tallest mountain in the world?";
questions[8] = "Q9. Who wrote Romeo and Juliet?";
questions[9] = "Q10. How many continents are there on Earth?";

const options = [
    ["Toronto", "Ottawa", "Vancouver", "Montreal", "Ottawa"],      // Ottawa is the capital of Canada
    ["Jupiter", "Mars", "Venus", "Saturn", "Mars"],              // Mars is the Red Planet
    ["Picasso", "Da Vinci", "Van Gogh", "Michelangelo", "Da Vinci"], // Da Vinci painted the Mona Lisa
    ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus", "Blue Whale"], // Blue Whale is the largest mammal
    ["1942", "1945", "1948", "1950", "1945"],                    // WWII ended in 1945
    ["Au", "Ag", "Gd", "Go", "Au"],                            // Au is the symbol for Gold
    ["English", "Hindi", "Mandarin", "Spanish", "Mandarin"],        // Mandarin has the most native speakers
    ["K2", "Mount Everest", "Kangchenjunga", "Makalu", "Kangchenjunga"], // Mount Everest is the tallest
    ["Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain", "Shakespeare"], // Shakespeare wrote Romeo and Juliet
    ["5", "6", "7", "8", "7"]                                 // 7 continents on Earth
];
const userAnswer = [];
var i = 0;
function next() {
    // Store answer for the current question (if any)
    if (i >= 0) {
        const radios = document.querySelectorAll(`input[name="Q${i}"]`);
        let selectedValue = null;
        for (const radio of radios) {
            if (radio.checked) {
                selectedValue = radio.value;
                userAnswer[i] = selectedValue;
                break;
            }
        }
        // alert("You selected : "+selectedValue || "No option selected");
    }

    i++; // Now go to the next question
    if (i == questions.length) {
        // window.location.href = "result.html";
        results();
        return;
    }
    const mainContainer = document.querySelector(".container");
    mainContainer.innerHTML = ""; // This clears previous question

    const divv = document.createElement("div")
    divv.classList.add("myquestion");
    divv.innerHTML = questions[i];

    mainContainer.append(divv)
    mainContainer.innerHTML += `<ul>
            <li><input type="radio" name="Q${i}" value="${options[i][0]}"> A) ${options[i][0]}<br></li>
            <li><input type="radio" name="Q${i}" value="${options[i][1]}"> B) ${options[i][1]}<br></li>
            <li><input type="radio" name="Q${i}" value="${options[i][2]}"> C) ${options[i][2]}<br></li>
            <li><input type="radio" name="Q${i}" value="${options[i][3]}"> D) ${options[i][3]}<br></li>
            </ul>`;
    const radios = document.querySelectorAll(`input[name="Q${i}"]`);
    for (const radio of radios) {
        if (radio.value == userAnswer[i]) {
            radio.checked = true;
        }
    }
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

function pre() {
    if (i >= 0) {
        const radios = document.querySelectorAll(`input[name="Q${i}"]`);
        let selectedValue = null;
        for (const radio of radios) {
            if (radio.checked) {
                selectedValue = radio.value;
                userAnswer[i] = selectedValue;
                break;
            }
        }
        // alert("You selected : "+selectedValue || "No option selected");
    }

    i--;
    if (i < 0) {
    } else {
        for (i; i < questions.length; i--) {
            const mainContainer = document.querySelector(".container");
            mainContainer.innerHTML = ""; // This clears previous question
            const divv = document.createElement("div")
            divv.classList.add("myquestion");
            divv.innerHTML = questions[i];
            mainContainer.append(divv)
            mainContainer.innerHTML += `<ul>
            <li><input type="radio" name="Q${i}" value="${options[i][0]}"> A) ${options[i][0]}<br></li>
            <li><input type="radio" name="Q${i}" value="${options[i][1]}"> B) ${options[i][1]}<br></li>
            <li><input type="radio" name="Q${i}" value="${options[i][2]}"> C) ${options[i][2]}<br></li>
            <li><input type="radio" name="Q${i}" value="${options[i][3]}"> D) ${options[i][3]}<br></li>
            </ul>`;
            const radios = document.querySelectorAll(`input[name="Q${i}"]`);
            for (const radio of radios) {
                if (radio.value == userAnswer[i]) {
                    radio.checked = true;
                }
            }
            break;
        }
    }
}

function rd() {
    let inputname = document.getElementById("name").value;
    if (inputname == "") {
        // window.location.href = "alert.html";
        showCustomAlert();
        document.getElementById("clickme").focus();
    } else {
        document.querySelector(".maincont").style.display = "block";
        i = -1;
        next();
        document.querySelectorAll(`input[name="Q1"]`).focus();
    }
}

function results() {
    let totalMarks = options.length;  
    let obtainedMarks = 0;             

    for (let i = 0; i < userAnswer.length; i++) {
        if (userAnswer[i] === options[i][4]) {
            obtainedMarks++;            
        }
    }
    let percentage = (obtainedMarks / totalMarks) * 100;
    let myname = document.getElementById("name").value;
    let rating = "Pass";
    let grade;
    if (percentage >= 90) {
        grade = "A+";
    } else if (percentage >= 80) {
        grade = "A";
    }else if (percentage >= 70) {
        grade = "B";
    }else if (percentage >= 50) {
        grade = "C";
    }else if (percentage < 50) {
        grade = "D";
        rating = "Fail"
    }
    // Store data in localStorage
    localStorage.setItem("name", myname);
    localStorage.setItem("total", totalMarks);
    localStorage.setItem("obtained", obtainedMarks);
    localStorage.setItem("percentage", percentage.toFixed(2));
    localStorage.setItem("grade",grade);
    localStorage.setItem("rating", rating);

    // Redirect to result page
    window.location.href = "result.html";
}
function showCustomAlert() {
    document.getElementById("customAlert").style.display = "block";
}
function closeCustomAlert() {
    document.getElementById("customAlert").style.display = "none";
    document.getElementById("name").focus();
}
