$(document).ready(function(){
	//keep track of questions
	var qtracker = 0;
	//timer object with variable time and functions
	var timer = {
		time: 30,
		//begin the timer
		start: function(){
			counter = setInterval(timer.decrease, 2000);
		},
		//time starts ticking down
		decrease: function(){
			timer.time--;
			//double check on time in the console to make sure it is running
			console.log(timer.time);
			//if time has not ran out...
			if(timer.time >= 0){
				//declare the the time remaining in seconds
				$(".time-left").html("<h2>" + "Time Remaining: " + timer.time + " seconds" + "</h2>");
			}
			//if time has run out for the question
			else{
				qtracker++;      //move to next question via incrementing question tracker (qtracker)
				wrongAnswer();	 //activate function for wrong answer submitted
				alert("Time is Up! Your answers have been Submitted.");
				timer.reset();   //reset timer to 30 for the new question
				//if all the questions haven't been completed yet, load the appropriate question in the order
				if (qtracker < questionArray.length){
					renderQuestion(qtracker);
				}
				//if all questions completed, hide the answer buttons
				else{
					$(".pick-answer").hide();
					finalScore();
				}
			}
			//if there is still time on the clock, show the time remaining	
		},
		//reset the timer function
		reset: function(){
			this.time = 30; //reset clock back to 30 seconds
			$(".time-left").html("<h2>" + "Time Remaining: " + timer.time + " seconds" + "</h2>");
		},
		//stops the timer after game ends
		stop: function(){
			clearInterval(counter);
		}
	};

	
	//track the number of correct answers - initialize to zero
	var correct = 0;
	//track the number of wrong answers - initialize to zero
	var wrong = 0;
	//five questions in the trivia, listed out one by one
	var quest1 = {
		question: "Who was the Patriots quarterback during the 2004 season?",
		//possible answers stored in an array
		possibleAnswers: ["A. Drew Bledsoe", 
							"B. Chad Pennington",
							"C. Tom Brady",
							"D. Jimmy Garropolo"],
		//actual status of each possible answer - only one is right, the rest are wrong
		actualAnswers: [false, false, true, false],
		//correct answer
		answer: "C. Tom Brady"
	};
	var quest2 = {
		question: "Who was the singer of the band Korn?",
		possibleAnswers: ["A. Jonathan Davis", 
							"B. Bon Jovi",
							"C. Corey Taylor",
							"D. Chad Kroeger"],
		actualAnswers: [true, false, false, false],
		answer: "A. Jonathan Davis"
	};
	var quest3 = {
		question: "The drug Viagra was created by which company?",
		possibleAnswers: ["A. Astra Zeneca", 
							"B. Pfizer",
							"C. Novartis",
							"D. Novo Nordisk"],
		actualAnswers: [false, true, false, false],
		answer: "B. Pfizer"
	};
	var quest4 = {
		question: "Who invented Penicillin?",
		possibleAnswers: ["A. Howard Florey", 
							"B. Robert Koch",
							"C. Edward Jenner",
							"D. Alexander Fleming"],
		actualAnswers: [false, false, false, true],
		answer: "D. Alexander Fleming"
	};
	var quest5 = {
		question: "What was the first vaccine created to treat?",
		possibleAnswers: ["A. Smallpox", 
							"B. Rabies",
							"C. Ebola",
							"D. Bird Flu"],
		actualAnswers: [true, false, false, false],
		answer: "A. Smallpox"
	};
	//all questions in the trivia are put into array
	var questionArray = [quest1, quest2, quest3, quest4, quest5];
	//fuction for loading each question along with answer buttons
	function renderQuestion(pickQuestion){
		
		timer.reset();
		$(".question").html("<h2>" + questionArray[pickQuestion].question + "</h2>");
		$("#redButton").text(questionArray[pickQuestion].possibleAnswers[0]).show();
		$("#whiteButton").text(questionArray[pickQuestion].possibleAnswers[1]).show();
		$("#blueButton").text(questionArray[pickQuestion].possibleAnswers[2]).show();
		$("#yellowButton").text(questionArray[pickQuestion].possibleAnswers[3]).show();
	
	}
	//setting up the beginning of the game from the Start button click
	function initialize(){
		qtracker = 0;
		
		$("#start-trivia").on("click", function(){
			$(this).hide();
			timer.start();
			renderQuestion(qtracker);
		});
	}

	function answerInput(){

		$(".pick-answer").on("click", function(){
			console.log("alert", qtracker);
			qtracker++; //move to the next question after answer button is clicked
			console.log("click", qtracker);
			$(".question").text("");
			$("#redButton").text("");
			$("#whiteButton").text("");
			$("#blueButton").text("");
			$("#yellowButton").text("");
			renderQuestion();
		})
	}
	//function to tally correct score and notify the player
	function correctAnswer(){
		correct++;
		alert("You are Right! Good job!");
	}
	//function to tally incorrect score and notify the player
	function wrongAnswer(){
		wrong++;
		alert("That is not correct.");
	}
	//function for showing final score, clearing questions and displaying #s of correct and wrong answers
	function finalScore(){
		//stop the timer once final score is to be shown
		timer.stop();
		//empty the contents of question from screen
		$(".question").empty();
		//append the correct number of answers to the question div
		$(".question").append("<h3>" + correct + " questions answered right." + "</h3>");
		//append the wrong number of answers to the question div
		$(".question").append("<h3>" + wrong + " questions answered wrong." + "</h3>");
		$(".time-left").empty();
	}
	

	//logic for setting up the trivia and designate what happens when different buttons are pressed

	initialize();
	//picked button/answer will be saved in a variable called chosen
	$(".pick-answer").on("click", function(){
		if (this.id == "redButton"){
			var chosen = "A";
		}
		else if(this.id == "whiteButton"){
			var chosen = "B";
		}
		else if(this.id == "blueButton"){
			var chosen = "C";
		}
		else if(this.id == "yellowButton"){
			var chosen = "D";
		}

		if((chosen == "A") && (questionArray[qtracker].actualAnswers[0] == true)){
			correctAnswer();
		}
		else if(chosen == "A"){
			wrongAnswer();
		}

		if((chosen == "B") && (questionArray[qtracker].actualAnswers[1] == true)){
			correctAnswer();
		}
		else if(chosen == "B"){
			wrongAnswer();
		}

		if((chosen == "C") && (questionArray[qtracker].actualAnswers[2] == true)){
			correctAnswer();
		}
		else if(chosen == "C"){
			wrongAnswer();
		}

		if((chosen == "D") && (questionArray[qtracker].actualAnswers[3] == true)){
			correctAnswer();
		}
		else if(chosen == "D"){
			wrongAnswer();
		}

		$(".question").text("");
		$("#redButton").text("");
		$("#whiteButton").text("");
		$("#blueButton").text("");
		$("#yellowButton").text("");
		qtracker++;
		//check if all questions have been answered...the entire array has been cycled through
		if (qtracker < questionArray.length){ //if not through all questions,
		renderQuestion(qtracker);              //render the proper question from array
		}
		else{
			$(".pick-answer").hide();     //if went through all Q's, hide the answer buttons
			finalScore();                 //show final score of the trivia

		}

	});
});


	
	





