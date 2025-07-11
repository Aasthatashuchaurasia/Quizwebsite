window.onload = function () {
  const startBtn = document.querySelector('.start-btn');
  const popupInfo = document.querySelector('.popup-info');
  const exitBtn = document.querySelector('.exit-btn');
  const main = document.querySelector('.main');
  const continueBtn = document.querySelector('.continue-btn');
  const quizSection = document.querySelector('.quiz-section');
  const quizBox = document.querySelector('.quiz-box');
  const nextBtn = document.querySelector('.next-btn');
  const optionList = document.querySelector('.option-list');
  const resultBox = document.querySelector('.result-box');
  const tryAgainBtn = document.querySelector('.tryagain-btn');
  const goHomeBtn = document.querySelector('.goHome-btn');

  let questionCount = 0;
  let questionNumb = 1;
  let userScore = 0;

  let timer;
  let timerCount = 15; // seconds per question
  const timerSec = document.querySelector('.timer-sec'); // You need a <div class="timer-sec"></div> in HTML


  startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
  };

  exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
  };

  continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    showQuestions(0);
    questionCounter(1);
    headerScore();
  };

  nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
      questionCount++;
      showQuestions(questionCount);
      questionNumb++;
      questionCounter(questionNumb);
    } else {
      showResultBox();
    }
  };

  function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = questions[index].options.map(
      option => `<div class="option"><span>${option}</span></div>`
    ).join("");

    optionList.innerHTML = optionTag;

    const options = document.querySelectorAll('.option');
    options.forEach(opt => {
      opt.onclick = function () {
        optionSelected(this);
      };
    });

    nextBtn.classList.remove('active');
  }

  function optionSelected(answerDiv) {
    const userAnswer = answerDiv.querySelector('span').textContent.trim().toLowerCase();
    const correctAnswer = questions[questionCount].answer.trim().toLowerCase();

    const options = document.querySelectorAll('.option');

    if (userAnswer === correctAnswer) {
      answerDiv.classList.add('correct');
      userScore++;
      headerScore();
    } else {
      answerDiv.classList.add('incorrect');
      options.forEach(option => {
        if (option.querySelector('span').textContent.trim().toLowerCase() === correctAnswer) {
          option.classList.add('correct');
        }
      });
    }

    options.forEach(option => {
      option.classList.add('disabled');
      option.style.pointerEvents = 'none';
    });

    nextBtn.classList.add('active');
  }

  function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
  }

  function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
  }

  function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');

    let progressStartValue = -1;
    let progressEndValue = Math.round((userScore / questions.length) * 100);
    let speed = 20;

    let progress = setInterval(() => {
      progressStartValue++;
      progressValue.textContent = `${progressStartValue}%`;
      circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) ${progressStartValue * 3.6}deg)`;

      if (progressStartValue >= progressEndValue) {
        clearInterval(progress);
      }
    }, speed);
  }

  tryAgainBtn.onclick = () => {
    resultBox.classList.remove('active');
    quizBox.classList.add('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
  };

  // ✅ Go Home Button Working Handler
  goHomeBtn.onclick = () => {
    resultBox.classList.remove('active');     // Hide result box
    quizSection.classList.remove('active');   // Hide quiz section
    quizBox.classList.remove('active');       // Hide quiz box
    main.classList.remove('active');          // Reset blur
    popupInfo.classList.remove('active');     // Hide popup if any

              

    // Reset state
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    const questionText = document.querySelector('.question-text');
    if (questionText) questionText.textContent = '';

    const optionList = document.querySelector('.option-list');
    if (optionList) optionList.innerHTML = '';

    const headerScoreText = document.querySelector('.header-score');
    if (headerScoreText) headerScoreText.textContent = '';

    const questionTotal = document.querySelector('.question-total');
    if (questionTotal) questionTotal.textContent = '';
  };
};
