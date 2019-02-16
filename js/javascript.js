jQuery(document).ready(function($) {
	//Variables
	var currentTime = getDate(0); // Cambridge time UTC +- 0
	var currentHour = currentTime.getHours();
	var currentMinute = currentTime.getMinutes();
	var currentSecond = currentTime.getSeconds();

	var countdownTime = "";

	function getDate(offset){
		var now = new Date();
		var hours = 60*60*1000;
		var minutes = 60*1000;
		return new Date(now.getTime() + (now.getTimezoneOffset() * minutes) + (offset * hours));
	}

	function getTimeRemaining(hourSeperation){
		var hoursRemaining = Math.abs( ( currentHour % hourSeperation ) - ( hourSeperation - 1 ) );
		var minutesRemaining = 60 - currentMinute;
		var secondsRemaining = 60 - currentSecond;

		//No 60 allowed
		if( minutesRemaining == 60 ){
			hoursRemaining++;
			minutesRemaining = 0;
		}

		return {
			hours: hoursRemaining,
			minutes: minutesRemaining,
			seconds: secondsRemaining
		};
	}

	function getStructuredMessage(hourSeperation){
		//Reset variables
		var times = getTimeRemaining( hourSeperation );

		var countdownTime = "";
		countdownTime += times.hours;
		if( times.hours != 1 ){
			countdownTime += ' hours ';
		} else {
			countdownTime += ' hour ';
		}
		countdownTime += times.minutes;
		if( times.minutes != 1 ){
			countdownTime += ' minutes';
		} else {	
			countdownTime += ' minute';
		}
		countdownTime += ' remaining.';

		return countdownTime;
	}

	function currentDnds(){
		var dndBigChinTime = 1;
		var dndGuthixianCacheTime = 3;

		$( '#big-chin p' ).html( getStructuredMessage(dndBigChinTime) );
		$( '#guthixian-cache p' ).html( getStructuredMessage(dndGuthixianCacheTime) );
	}

	//Print Message On Page Load

	currentDnds();

	setInterval(function(){

		//Print Message Every Second
		currentDnds();

	}, 1000);

});

/*
TODO:
	When closer to time, change border color
	Phone alerts?
	Cooler design?
	Post git to reddit - alpha stage 
	*/