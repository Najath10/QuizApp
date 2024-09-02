const questions = [
    {
        question: "What is the capital of France?",
        options: [ 
            {text:"Paris",correct:true},
            {text:"Madrid",correct:false},
            {text:"Berlin",correct:false},
            {text:"Rome",correct:false},
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: [ 
            {text:"Earth",correct:false},
            {text:"Mars",correct:true},
            {text:"Jupiter",correct:false},
            {text:"Venus",correct:false},
        ]
    },
    {
        question: "Who wrote 'Romeo and Juliet",
        options: [ 
            {text:"Charles Dickens",correct:false},
            {text:"William Shakespeare",correct:true},
            {text:"Mark Twain",correct:false},
            {text:"Jane Austen",correct:false},
        ]
    },
    {
        question: "What is the largest ocean on Earth",
        options: [ 
            {text:"Atlantic Ocean",correct:false},
            {text:"Arctic Ocean",correct:false},
            {text:"Pacific Ocean",correct:true},
            {text:"Indian Ocean",correct:false},
        ]
    },
]
 
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex =0;
let score =0;


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML= "Next"
    showQuestion()
}
function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ") " + currentQuestion.question;
    currentQuestion.options.forEach(option =>{
        const button = document.createElement("button")
        button.innerHTML=option.text;
        button.classList.add("btn");
        answerButton.appendChild(button)
        if (option.correct) {
            button.dataset.correct=option.correct
        }
        button.addEventListener("click",selectAnswer)
        
    })
}

function resetState(){
     nextButton.style.display="none";
     while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }
}


function selectAnswer(e){
    const selectedBtn =e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true"
    if (isCorrect) {
        selectedBtn.classList.add("correct")
        score++;
    }else{
        selectedBtn.classList.add("incorrect")    
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled =true
    })
   nextButton.style.display="block";

}
nextButton.addEventListener("click",()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }
});
function showScore(){
    resetState();
    questionElement.innerHTML =`You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again"
    nextButton.style.display ="block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

startQuiz();
