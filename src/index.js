import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
//import file name and path for other js files

// Business Logic

  function getTrivia() {
    let promise = new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`;
      request.addEventListener("loadend", function () {
        const response = JSON.parse(this.responseText);
        console.log(response);
        if (this.status === 200) {
          resolve([response]);
        } else {
          reject([this, response]);
        }
      });
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(triviaArray) {
      printElements(triviaArray);
    }, function (errorArray) {
      printError(errorArray);
    });
  }


// UI Logic
// function displayQuestion(trivia) {
//   document.getElementById("showResponse").innerText = `This is your question ${trivia}`;
// }

function printError(error) {
  document.querySelector('#show-error').innerText = `There was an error retreiving your trivia question ${error[2]}: ${error[0].status} ${error[0].statusText}: ${error[1].message}`;
}

function printElements(apiResponse) {
  const container = document.querySelector('#question-container');//.p.innerText = `Question: ${data[0]}`;
  apiResponse.data.forEach((response) => {
    container.innerHTML += response.results[3];
  });
}

function handleFormSubmission(event) {
  event.preventDefault();
  //const trivia = document.getElementById("question-container");
  getTrivia();
  //displayQuestion(trivia);
}

// function handleFormSubmission(event) {
//   event.preventDefault();
//   const gifSearch = document.querySelector('#keyword').value;
//   document.querySelector('#keyword').value = null;
//   getGifs(gifSearch);
//   displayGif(gifSearch);
// }


window.addEventListener("load", function () {
  document.querySelector("#generate-question").addEventListener("submit", handleFormSubmission);
  // document.querySelector();
});
