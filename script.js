//Creating variables needed for timer
var timerEl = document.getElementById('countdown');
var numOfSeconds = 75;
var timeLeft = 75;
var timer;

//----------------------------------------------------clearScores() 
function clearScores() {
    var objHighScores = [];
    localStorage.setItem("obj_highscores", JSON.stringify(objHighScores));

    localStorage.setItem("arr_highscores", "");
 
    var scoresSection = document.querySelector("#scores");
    var submitSection = document.querySelector("#submission");


    //Removing text for scores
    var textSection = scoresSection.querySelector("#text_section");
    scoresSection.removeChild(textSection);
   
    //Removing button
    var btn_submitPlacement = submitSection.querySelector("#btn_clear_scores");
    submitSection.removeChild(btn_submitPlacement);


     //Setting text for scores
    var scorePlacement = document.querySelector("#time_left");
    scorePlacement.textContent = "All scores were removed";
}


//----------------------------------------------------goBack()
function goBack() {
    window.location = './index.html';
}




//----------------------------------------------------showHighScores()
function showHighScores() {
    var lbStorageUseString = false;
    var sExistingScores = "";
    var arrHighScores = "";
    var objHighScores = [];
    var allPlayers = [];
    var sortedPlayers = [];


    //-----------------------IDs to remove children
    //scores & submission
    var scoresSection = document.querySelector("#scores");    
    var submitSection = document.querySelector("#submission");

    //textbox, label, and button
    var label_initialsPlc = submitSection.querySelector("#newlabel");
    var initialsPlacement = submitSection.querySelector("#initials");    
    var btn_submitPlacement = submitSection.querySelector("#btn_submit");


    //Total Score
    var sTimeLeft = localStorage.getItem("time_left");
   
    //Initials
    var screenInitialsValue = initialsPlacement.value;
   
    //-------------------------------------------Getting whatever is in localstorage to array
    if (lbStorageUseString) {
        arrHighScores = screenInitialsValue + " = " + sTimeLeft;
        sExistingScores = localStorage.getItem("arr_highscores");  


        if (sExistingScores.length > 1) {
            arrHighScores = arrHighScores  + "~" + sExistingScores;
        }
   
        //Updating localstorage with string
        localStorage.setItem("arr_highscores", arrHighScores);

    } else {
        objHighScores = localStorage.getItem('obj_highscores');
       
        if (objHighScores == null || objHighScores == "undefined" ||  objHighScores == "[]"){
            allPlayers = [];
        } else {
            if (objHighScores.length < 1) {
                allPlayers = [];
            } else {
                allPlayers = JSON.parse(objHighScores);
            }        
        }
     
        var aPlayer = {name: screenInitialsValue, score: sTimeLeft};
        allPlayers.push(aPlayer);
 
        //Updating localstorage with object
        localStorage.setItem('obj_highscores', JSON.stringify(allPlayers));
    }

    //-----------------------Removing children
    submitSection.removeChild(label_initialsPlc);  
    submitSection.removeChild(initialsPlacement);  
    submitSection.removeChild(btn_submitPlacement);


    var rightQuestions = document.querySelector("#right_questions");
    rightQuestions.textContent = "";


    //The total score
    var scorePlacement = document.querySelector("#time_left");
    scorePlacement.textContent = "";
   
    //------------------------Updating:
   //The title
    var titleResult = document.querySelector("#title_result");
    titleResult.textContent = "Highscores";
   
    //The text
    var textSection = document.createElement("section");
    textSection.id = "text_section";


    if (lbStorageUseString) {
        var sHighScores = "";
        arrHighScores = sHighScores.split("~");


        for (line of arrHighScores) {
            var txtNode = document.createTextNode(line);
            textSection.appendChild(txtNode);


            var brNode = document.createElement("div");
            textSection.appendChild(brNode);


        }      
    }  else {
        var sortedPlayers = allPlayers.sort(function(a, b) {
            return b.score - a.score
          });


        for (var i = 0; i < sortedPlayers.length; i++) {
            var line = sortedPlayers[i].name + ": " + sortedPlayers[i].score;
            var txtNode = document.createTextNode(line);
            textSection.appendChild(txtNode);


            var brNode = document.createElement("div");
            textSection.appendChild(brNode);
        }
    }      
    scoresSection.appendChild(textSection);


    //Creating the buttons
    for (var i = 1; i <= 2; i++) {
        var btn = document.createElement('BUTTON');


        if (i == 1) {
            btn.id = "btn_go_back";
            btn.addEventListener("click", goBack);
            var tNode = document.createTextNode("Go Back");
        }
        else {
            btn.id = "btn_clear_scores";
            btn.addEventListener("click", clearScores);
            var tNode = document.createTextNode("Clear highscores");
        }


        btn.setAttribute("style", "color: purple; font-size: 16px");
        btn.appendChild(tNode);  
        submitSection.appendChild(btn);
    }
}


//----------------------------------------------------loadHighScores() 
function loadHighScores() {
    //The title
    var titleResult = document.querySelector("#title_result");
    titleResult.textContent = "All done!";
   
    //The total score
    var sTimeLeft = localStorage.getItem("time_left");
    var scorePlacement = document.querySelector("#time_left");
    scorePlacement.textContent = "Your final score is " + sTimeLeft + ".";


    //The right questions
    var sRightQuestions = localStorage.getItem("right_questions");
    var rightQuestions = document.querySelector("#right_questions");
    rightQuestions.textContent = "You have answered " + sRightQuestions +  " correct question(s).";


    //----------------------To submit:
    var submitSection = document.querySelector("#submission");
   
    //The label for input
    var newlabel = document.createElement("label");
    newlabel.setAttribute("for","inputBox");
    newlabel.setAttribute("id","newlabel");
    newlabel.innerHTML = "Enter initials:";
    submitSection.appendChild(newlabel);
   
    //The input
    var inputBox = document.createElement("input");
    inputBox.setAttribute("type", "text");
    inputBox.setAttribute("id", "initials");
    submitSection.appendChild(inputBox);


    //The submit button
    var btn = document.createElement('BUTTON');
    btn.id = "btn_submit";
    var tNode = document.createTextNode("Submit Result");
    btn.setAttribute("style", "color: purple; font-size: 16px");
    btn.appendChild(tNode);
    btn.addEventListener("click", showHighScores);
    submitSection.appendChild(btn);
}


//----------------------------------------------------endTest() 
function endTest() {
        stopTimer();
        localStorage.setItem("time_left", String(timeLeft));        
        resetTimer();
        window.location = './highscores.html';
}


//-----------------------------------------------startTimer()
function startTimer(){
    timer = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft + " seconds";
   
        if(timeLeft <= 0) {
            clearInterval(timer);
            endTest();
            //timerEl.textContent = "End Of Timer";
        }      
    }, 1000);
}


//-------------------------------------------------stopTimer()
function stopTimer() {
    clearInterval(timer);
    timer.stopTimer;
}


//----------------------------------------------------resetTimer()
function resetTimer(){
    timeLeft = numOfSeconds;
}

//----------------------------------------------------decreaseTimer()
function decreaseTimer(){
    timeLeft -= 15;
}

//----------------------------------------------------addScore()
function addScore() {
    //get score
    var iScore = parseInt(localStorage.getItem("right_questions"));
   
    //set new score
    iScore += 1;
    localStorage.setItem("right_questions", String(iScore));
}


//----------------------------------------------------checkAnswer()
function checkAnswer(){


    //check if correct button was clicked
    var sStatus = this.name;
    if(sStatus == "correct"){
        addScore();
    } else {
        decreaseTimer();
    }

    var sSet = "";
    var iSet = parseInt(localStorage.getItem("arr_index_questions"));

    //Setting/increasing indexing for next question 
    iSet += 1;

    var iArrSize = parseInt(localStorage.getItem("arr_questions_size"));

    //Checking if we are on the last question and can add the test showing score
    if(iSet < iArrSize) {
        sSet = String(iSet);
        localStorage.setItem("arr_index_questions", sSet);        
        setNextQuestion();
    }
    else {
        endTest();
    }
}

//----------------------------------------------------setNextQuestion()
function setNextQuestion() {
    var btn_id_base = "#btn_answer_";
    var btn_id = "";
    var sIndex = "";
    var sBtnText = "";
    var iRandom = 0;
    var iButtonsNum = 4;
    var sStatus = "";


    //Getting questions from global storage
    var iSet = parseInt(localStorage.getItem("arr_index_questions"));
   
    var arrQuestions = JSON.parse(localStorage.getItem(String(iSet)));


    //The title
    var title = document.querySelector("#main-header");
    title.textContent = "";


    //The questions
    var question = document.querySelector("#text-direction-container");
    question.textContent = arrQuestions[4];
    question.setAttribute("style", "color: blue; font-size: 24px; min-width: 400px");


    //The buttons
    var place = document.querySelector("#buttons-container");


    //iRandom will be correct button
    iRandom = Math.floor(Math.random() * iButtonsNum);


    for (var i = 0; i < iButtonsNum; i++) {  
        sIndex = String(i);
        btn_id = btn_id_base + sIndex;
       
        var btn = place.querySelector(btn_id);
       
        //Setting text for the buttons
        if (iRandom == 0) {
            sBtnText = arrQuestions[i];
        }
        else {
            if (i == 0) {
                sBtnText = arrQuestions[iRandom];
            }
            else{
               if (i == iRandom) {
                 sBtnText = arrQuestions[0];
               }
               else {
                sBtnText = arrQuestions[i];
               }
            }
        }    
        btn.textContent = sBtnText;


        //setting status
        if (i == iRandom) {
            btn.name = "correct";
        }
        else {
            btn.name = "error";
        }
    }    
}


//----------------------------------------------------loadPage()
function loadPage() {
    //Loading the questions
    //Only the first element (index 0) is correct; the last index is the question
    //Format: ["correct","incorrect", "incorrect","incorrect","question"]
   
    const arrQuestions = [
        ["myFunction()","call myFunction()", "call function myFunction","Call.myFunction()","How do you call a function named myFunction?"],
       
        ["for (i = 0; i <= 5; i++)","for (i = 0; i <= 5)", "for i = 1 to 5","for (i <= 5; i++)","How does a 'for' loop start?"],
       
        ["script","scripting", "js","javascript","Inside which HTML element do we put the JavaScript?"],

        ["var colors = ['red', 'green', 'blue']", "var colors = (1: 'red', 2 = 'green', 3 = 'blue'", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')","var colors = 'red', 'green', 'blue'","What is the correct way to write a Javascript array?"],

        ["/* This comment has more than one line */","//This comment has more than one line//", "<!--This comment has more than one line -->","<This comment has more than one line>","How to insert a comment that has more than one line?"],

        ["if(i == 5)", "if i == 5 then","if i = 5 then", "if i = 5","How to write an IF statement in Javascript"],

        ["alert('Hello World');","msgBox('Hello World')", "alertBox('Hello World')","msg('Hello World')","How do you write 'Hello World' in an alert box?"],

        ["<script src='xxx.js'>  ","<script name='xxx.js'>", "<script href='xxx.js'>","<script title='xxx.js'>","What is the correct syntax for referring to an external script called 'xxx.js'?"],

        ["False","True", "Not Applicable","No Clue","The external JavaScript file must contain the <script> tag."],

        ["Math.round(7.25)","rnd(7.25)", "Math.rnd(7.25)","round(7.25)","How do you round the number 7.25... to the nearest integer?"]
    ];


    //Array Size
    var iArrSize = arrQuestions.length;
    localStorage.setItem("arr_questions_size", String(iArrSize));

    var sArrLine = "";

    for(var i = 0; i < iArrSize; i++) {
        sArrLine = arrQuestions[i];
        localStorage.setItem(String(i), JSON.stringify(sArrLine));
    }


    //Local storage for array of questions
    localStorage.setItem("arr_index_questions", "0");


    //The title
    var title = document.querySelector("#main-header");
    title.textContent = "Coding Quiz Challenge";


    //The start button
    var btn = document.createElement('BUTTON');
    btn.id = "btn_start";
    var tNode = document.createTextNode("Start Quiz");
    btn.setAttribute("style", "color: red; font-size: 23px");
    btn.appendChild(tNode);


    btn.addEventListener("click", removeBtnStart);
    btn.addEventListener("click", loadTest);
    btn.addEventListener("click", setNextQuestion);
    btn.addEventListener("click", startTimer);


    var place = document.querySelector("#buttons-container");
    place.appendChild(btn);


    //The score
    localStorage.setItem("right_questions", "0");


    //The timer
    localStorage.setItem("time_left", String(timeLeft));
}


//----------------------------------------------------removeBtnStart()
function removeBtnStart() {
    var place = document.querySelector("#buttons-container");
    var btn = place.querySelector("#btn_start");
    place.removeChild(btn);
}


//----------------------------------------------------loadTest()
function loadTest() {
    var test_answers = ["btn_answer_0","btn_answer_1","btn_answer_2","btn_answer_3"];
    var place = document.querySelector("#buttons-container");


    for (var i = 0; i < 4; i++) {          
        var btn = document.createElement('BUTTON');
        var txt = test_answers[i];        
        btn.id = txt;
        btn.textContent = txt;
        btn.setAttribute("style", "color: blue; font-size: 18px; min-width: 400px");        
        btn.addEventListener("click", checkAnswer);


        place.appendChild(btn);
    }
}

//--------------------------------------------------testObject() FOR TESTING PURPOSES ONLY
function testObject() {
    var objHighScores = [];
     
    var  objHighScores = localStorage.getItem('obj_highscores');
   
      if (objHighScores == null || objHighScores == "undefined"){
        var allPlayers = [];
      } else {
        var allPlayers = JSON.parse(objHighScores);
      }
      alert( allPlayers)  ;
     
      var sName = "Monkey D. Luffy";
      var iScore = 20;
      var aPlayer = {name: sName, score: iScore};
      allPlayers.push(aPlayer);


      var sName = "Gol D. Roger";
      var iScore = 40;
      var aPlayer = {name: sName, score: iScore};
      allPlayers.push(aPlayer);


      localStorage.setItem('obj_highscores', JSON.stringify(allPlayers));


      allPlayers = JSON.parse(localStorage.getItem('obj_highscores') || "[]");


      for (var i = 0; i < allPlayers.length; i++) {
        alert(allPlayers[i].name + " " + allPlayers[i].score);
      }


      var sName = "Red-Haired Shanks";
      var iScore = 70;
      var aPlayer = {name: sName, score: iScore};
      allPlayers.push(aPlayer);


      var sortedPlayers = allPlayers.sort(function(a, b) {
        return b.score - a.score
      });


      for (var i = 0; i < sortedPlayers.length; i++) {
        alert(sortedPlayers[i].name + " " + sortedPlayers[i].score);
      }
}
