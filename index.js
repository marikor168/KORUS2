let data = {
  ques1: 'ans1',
  ques2: ['HTML', 'CSS'],
};

let userAnswers = {};

let results = document.querySelector('.results'),
    btn = document.querySelector('button'),
    form = document.querySelector('form'),
    question1 = document.querySelector('.question1'),
    question2 = document.querySelector('.question2');
let correctAns = 0;
let questions = 2;


form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  checkAnswers();
  generateMessage();
  form.classList.add('hide');
  results.classList.remove('hide');
});

function checkAnswers() {
  let userKeys = Object.keys(userAnswers);
  
  userKeys.forEach((key) => {
    let ans = userAnswers[key];
    let correct = data[key];
    if(Array.isArray(ans)) {
      let isRight = true;
      if(ans.length === correct.length) {
        ans = ans.sort();
        correct = correct.sort();
        ans.forEach((item, i) => {
          if(item !== correct[i]) {
            isRight = false;
          }  
        });
        if(isRight) {
          correctAns++;
        }
      }
      
    } else {

      if(userAnswers[key] === data[key]) {
        correctAns += 1;
      }
    }
  });
};

function generateMessage() {
  let resultMessage = `Вы ответили на ${correctAns} из ${questions} вопросов`;
  
  results.append(resultMessage);
}


function onQuestionChange(e) {
  
  if(e.target.type === 'checkbox') {
    if(userAnswers.hasOwnProperty(e.target.name)) {
      if(Array.isArray(userAnswers[e.target.name])) {
        if(userAnswers[e.target.name].includes(e.target.value)) {
          userAnswers[e.target.name] = userAnswers[e.target.name].filter((i) => i !== e.target.value);
        } else {
          userAnswers[e.target.name].push(e.target.value);
        }
      } else {
        userAnswers[e.target.name] = [e.target.value];
      }
    } else {
      userAnswers[e.target.name] = [e.target.value];
    }    
  } else {
    userAnswers[e.target.name] = e.target.value;
  }
  enableButton();
}

function enableButton() {
  let isEnabled = true;
  let dataKeys = Object.keys(data);
  dataKeys.forEach((key) => {
    if(!userAnswers.hasOwnProperty(key)) {
      isEnabled = false;
    };
    if(userAnswers[key] && (userAnswers[key] < 1)) {
      isEnabled = false;
    }
  });
  
  if(isEnabled) {
    btn.removeAttribute('disabled');
  } else {
    btn.setAttribute('disabled', 'disabled');
  }
}

question1.addEventListener('change', onQuestionChange);
question2.addEventListener('change', onQuestionChange);
