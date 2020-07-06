let correctAnswers = {
  ques1: 'ans1',
  ques2: ['HTML', 'CSS'],
};

let userAnswers = {};

let resultsElem = document.querySelector('.results'),
    btn = document.querySelector('button'),
    form = document.querySelector('form'),
    inputs = document.querySelectorAll('form#questions input');

form.addEventListener('submit', submitHandle);
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('change', onQuestionChange)
}

function submitHandle(e) {
  e.preventDefault();

  let questionsAmount = Object.keys(correctAnswers).length;
  let correctAmount = checkAnswers();

  createAndAppendMessage(correctAmount, questionsAmount);

  form.classList.add('hide');
  resultsElem.classList.remove('hide');
}

function checkAnswers() {
  let userKeys = Object.keys(userAnswers);
  let corrUserAnswersAmount = 0;
  
  userKeys.forEach((key) => {
    let ans = userAnswers[key];
    let correct = correctAnswers[key];
    if(Array.isArray(ans)) {
        if(areArraysSame(ans, correct)) {
          corrUserAnswersAmount++;
        }
    } else {
      if(userAnswers[key] === correctAnswers[key]) {
        corrUserAnswersAmount += 1;
      }
    }
  });

  return corrUserAnswersAmount;
}

function areArraysSame(first, second) {
  if (first.length !== second.length) return false;

  first = first.sort();
  second = second.sort();
  for (let i = 0; i < first.length; i++) {
    if(first[i] !== second[i]) {
      return false;
    }
  }

  return true;
}

function createAndAppendMessage(correct, all) {
  let resultMessage = `Вы ответили на ${correct} из ${all} вопросов`;
  resultsElem.append(resultMessage);
}

function onQuestionChange(e) {
  const {type, name, value} = e.target;
  if(type === 'checkbox') {
    if(userAnswers.hasOwnProperty(name) && Array.isArray(userAnswers[name])) {
        if(userAnswers[name].includes(value)) {
          userAnswers[name] = userAnswers[name].filter((i) => i !== value);
        } else {
          userAnswers[name].push(value);
        }
    } else {
      userAnswers[name] = [value];
    }    
  } else {
    userAnswers[name] = value;
  }

  toggleButtonIfNeeded();
}

function toggleButtonIfNeeded() {
  let isEnabled = shouldSubmitEnabled();
  if(isEnabled) {
    btn.removeAttribute('disabled');
  } else {
    btn.setAttribute('disabled', 'disabled');
  }
}

function shouldSubmitEnabled() {
  let isEnabled = true;
  let dataKeys = Object.keys(correctAnswers);
  dataKeys.forEach((key) => {
    if(!userAnswers[key] || (userAnswers[key] && (userAnswers[key].length < 1))) {
      isEnabled = false;
    }
  });

  return isEnabled;
}