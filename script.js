const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const thewpm = document.querySelector(".wpm");
var interval;
var timer=[0,0,0,0];
var donetest=false;
// display and select paragraph 







// Add leading zero to numbers 9 or below (purely for aesthetics):
function addingzero(time){
    if(time <=9){
        time="0"+time;
    }
    return time
}

function wordcount(text)
{
    return text.split(" ").length;
}
function calculatewpm(words)
{
    var time=timer[0] + timer[1]/60;
    if(time!==0)
    {
        var wpm=words/time;
        thewpm.innerHTML="("+wpm.toFixed(2)+")"+"wpm";
        thewpm.style="display:block";
    }
}


// Run a standard minute/second/hundredths timer:
function starttimmer(){
    let currenttime= addingzero(timer[0]) + ":" + addingzero(timer[1]) + ":" + addingzero(timer[2]);
    theTimer.innerHTML=currenttime;
    timer[3]++;
    timer[0]=Math.floor((timer[3]/100)/60);
    timer[1]=Math.floor((timer[3]/100)-(timer[0]*60));
    timer[2]=Math.floor(timer[3]-(timer[1]*100)-(timer[0]*6000));
}


// Match the text entered with the provided text on the page:


function checker(){
    let textentered=testArea.value;
    var originTextmatch=originText.substring(0,textentered.length);
    
    if(textentered==originText)
    {
        clearInterval(interval);
        testWrapper.style.borderColor="#429890";
        donetest=true;
        testArea.disabled=true;
        var words=wordcount(originText);
        calculatewpm(words)
        // var time=timer[0] + timer[1]/60;
        // if(time!==0)
        // {
        //     var wpm=words/time;
        //     thewpm.innerHTML="("+wpm.toFixed(2)+")"+"wpm";
        //     thewpm.style="display:block";
        // }
    }
    else if(textentered==originTextmatch){
        if(donetest==false)
        {
            testWrapper.style.borderColor="#65CCf3";
            var words=wordcount(textentered);
            calculatewpm(words)    
        }
        // var time=timer[0] + timer[1]/60;
        // if(time!==0)
        // {
        //     var wpm=words/time;
        //     thewpm.innerHTML="("+wpm.toFixed(2)+")"+"wpm";
        //     thewpm.style="display:block";
        // }
        

    }
    else{
        testWrapper.style.borderColor="#E95D0F";
    }
    
    console.log(textentered);
}

// Start the timer:
function typingstarted(){
    let textlength=testArea.value.length;
    if(textlength===0 && donetest==false){
        interval = setInterval(starttimmer,10);
        statdate=new Date();
    }
        
    console.log(textlength);
}

// Reset everything:
function reset()
{
    clearInterval(interval);
    interval=null;
    theTimer.innerHTML="00:00:00";
    donetest=false;
    testArea.value="";
    timer=[0,0,0,0];
    thewpm.innerHTML="(0wpm)";
    thewpm.style="display:none";
    testArea.disabled=false;
    testWrapper.style.borderColor="#808080";
    console.log("reset clicked");

}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener('keypress',typingstarted,false);
testArea.addEventListener('keyup',checker,false);
resetButton.addEventListener('click',reset,false);