var gHours = 0;
var gMinutes = 0;
var gSeconds = 0;

var remainingTime;
var countdownHandle;

var audio = new Audio('./sounds/beep4segundos.mp3');

$(document).ready(function() {
  onPomodoroTimer();
});


function cincoSegundos(){
   renderTimer(); //encrementa 5 segundos sem iniciar
   remainingTime = remainingTime +(5*1000);
   renderTimer();
}

function trintaSegundos(){
     renderTimer(); //encrementa 30 segundos sem iniciar
     remainingTime = remainingTime +(30*1000);
     renderTimer();
}

function umMinuto(){
   renderTimer(); //encrementa 1 minuto sem iniciar
   remainingTime = remainingTime +(60*1000);
   renderTimer();
}

function doisMinutos(){
    renderTimer(); //encrementa 2 minutos sem iniciar 
    remainingTime = remainingTime +(2*60*1000);
    renderTimer();
}

function tresMinutos(){
  renderTimer(); //encrementa 3 minutos sem iniciar 
  remainingTime = remainingTime +(3*60*1000);
  renderTimer();
}

function cincoMinutos(){
    
  renderTimer(); //encrementa 5 minutos sem iniciar   
  remainingTime = remainingTime +(5*60*1000);
  renderTimer();
}

function dezMinutos(){
  renderTimer(); //encrementa 10 minutos sem iniciar 
  remainingTime = remainingTime +(10*60*1000);
  renderTimer();
}

function onStartTimer(){
  stopTimer();
  startTimer();
};

function onStopTimer(){
    clearInterval(countdownHandle);

};

function onResetTimer(){
    stopTimer();
    resetTimer();
   
}

function startAlarm(){
  if(remainingTime<1000)
  {
    audio.play();
  }
}

function startTimer() {
    
    if( remainingTime > 0){
  countdownHandle=setInterval(function() {
    decrementTimer();
  },1000);
    }else {
        alert("Tempo zerado. Não vai iniciar!");
    }
}

function stopTimer() {
  clearInterval(countdownHandle);
  

}

function resetTimer(){
  remainingTime = (gHours*60*60*1000)+
  (gMinutes*60*1000)+
  (gSeconds*1000); 
  renderTimer();
}

function renderTimer(){

  var deltaTime=remainingTime;

  var hoursValue=Math.floor(deltaTime/(1000*60*60));
  deltaTime=deltaTime%(1000*60*60);

  var minutesValue=Math.floor(deltaTime/(1000*60));
  deltaTime=deltaTime%(1000*60);

  var secondsValue=Math.floor(deltaTime/(1000));

  animateTime(hoursValue, minutesValue, secondsValue);
};

function animateTime(remainingHours, remainingMinutes, remainingSeconds) {

  // position
  $('#hoursValue').css('top', '0em');
  $('#minutesValue').css('top', '0em');
  $('#secondsValue').css('top', '0em');

  $('#hoursNext').css('top', '0em');
  $('#minutesNext').css('top', '0em');
  $('#secondsNext').css('top', '0em');

  var oldHoursString = $('#hoursNext').text();
  var oldMinutesString = $('#minutesNext').text();
  var oldSecondsString = $('#secondsNext').text();

  var hoursString = formatTime(remainingHours);
  var minutesString = formatTime(remainingMinutes);
  var secondsString = formatTime(remainingSeconds);

  $('#hoursValue').text(oldHoursString);
  $('#minutesValue').text(oldMinutesString);
  $('#secondsValue').text(oldSecondsString);

  $('#hoursNext').text(hoursString);
  $('#minutesNext').text(minutesString);
  $('#secondsNext').text(secondsString);

  // set and animate
  if(oldHoursString !== hoursString) {
    $('#hoursValue').animate({top: '-=1em'});
    $('#hoursNext').animate({top: '-=1em'});
  }

  if(oldMinutesString !== minutesString) {
    $('#minutesValue').animate({top: '-=1em'});
    $('#minutesNext').animate({top: '-=1em'});
  }

  if(oldSecondsString !== secondsString) {
    $('#secondsValue').animate({top: '-=1em'});
    $('#secondsNext').animate({top: '-=1em'});
  }
}

function formatTime(intergerValue){
  return intergerValue > 9 ? intergerValue.toString():'0'+intergerValue.toString();
}

function decrementTimer(){

  remainingTime-=(1*1000);

  if(remainingTime<1000){
    startAlarm();
    onStopTimer();
  }
  renderTimer();
}