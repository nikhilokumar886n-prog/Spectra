let gameData = [];

let currentRound = 0;
const maxRounds = 5;

const heroPage = document.getElementById("heropage");
const countdownPage = document.getElementById("countdownpage");
const colortimerPage = document.getElementById("colortimer");
const colorpickPage = document.getElementById("custom-card");
const roundresultPage = document.getElementById("result-card");
const finalPage = document.getElementById("finalpage");

function hideAllScreens() {
    heroPage.classList.add("hidden");
    countdownPage.classList.add("hidden");
    colortimerPage.classList.add("hidden");
    colorpickPage.classList.add("hidden");
    roundresultPage.classList.add("hidden");
    finalPage.classList.add("hidden");
}

function switchToPage(pageEl) {
    hideAllScreens();
    pageEl.classList.remove("hidden");
}

/////////////////////////////////////////////////////////////////////
// Random Color Loader logic                                       //
/////////////////////////////////////////////////////////////////////

const startEl = document.querySelectorAll(".start");

const cardEl = document.querySelectorAll(".card");

const countdownEl = document.getElementById("countdown-card");

const RoundNo = document.querySelectorAll(".onebyfive")

let shownColor = "hsl(0,0%,0%)";

switchToPage(heroPage);

startEl.forEach(btn=> {
  
  btn.addEventListener('click', () => {

    if (currentRound<maxRounds){

      switchToPage(countdownPage);
      setTimeout(()=>{
        showRandomColor()},3000);

      setTimeout(()=>countStage("set"),1500);
      setTimeout(()=>countStage("go"),3000);

      setTimeout(()=>{
        countStage("ready");
        switchToPage(colortimerPage);
      },4000);


      function countStage(text){
        countdownEl.innerHTML = text;
      }

      setTimeout(()=>{
        time = 600;
        clearInterval(timerId);
        timerId = setInterval(counter,10);
      },3100);

      currentRound++;

      RoundNo.forEach(el=> {
        el.innerHTML = `${currentRound} / 5`
      });

    }

    else {

      const roneEl = document.getElementById("r1");
      const rtwoEl = document.getElementById("r2");
      const rthreeEl = document.getElementById("r3");
      const rfourEl = document.getElementById("r4");
      const rfiveEl = document.getElementById("r5");

      const finalScore = document.getElementById("final-score");
      const upperText = document.getElementById("upper-text");

      roneEl.style.backgroundImage = `linear-gradient(-45deg, ${gameData[0].inputColor} 50%, ${gameData[0].outputColor} 50%)`;

      rtwoEl.style.backgroundImage = `linear-gradient(-45deg, ${gameData[1].inputColor} 50%, ${gameData[1].outputColor} 50%)`;

      rthreeEl.style.backgroundImage = `linear-gradient(-45deg, ${gameData[2].inputColor} 50%, ${gameData[2].outputColor} 50%)`;

      rfourEl.style.backgroundImage = `linear-gradient(-45deg, ${gameData[3].inputColor} 50%, ${gameData[3].outputColor} 50%)`;

      rfiveEl.style.backgroundImage = `linear-gradient(-45deg, ${gameData[4].inputColor} 50%, ${gameData[4].outputColor} 50%)`;

      const totalScore = gameData[0].roundScore + gameData[1].roundScore + gameData[2].roundScore + gameData[3].roundScore + gameData[4].roundScore;

      finalScore.innerHTML = `${totalScore.toFixed(2)}</span> / 50`;

      upperText.innerHTML = `Mmm almost ${Math.round(totalScore)} out of 50.`;

      const lowerText = document.getElementById("lower-text");
      if (totalScore < 5) lowerText.innerHTML = "Were your eyes even open? That was rough.";
      else if (totalScore < 10) lowerText.innerHTML = "Not too genius but hey – its the effort that counts.";
      else if (totalScore < 15) lowerText.innerHTML = "A little muddy, but you got a few hues right.";
      else if (totalScore < 20) lowerText.innerHTML = "Not bad, but your color memory needs some work.";
      else if (totalScore < 25) lowerText.innerHTML = "Almost average! You have a decent eye.";
      else if (totalScore < 30) lowerText.innerHTML = "Solid middle ground. You're getting the hang of it.";
      else if (totalScore < 35) lowerText.innerHTML = "Pretty good! Your color recall is above average.";
      else if (totalScore < 40) lowerText.innerHTML = "Great job! You have a very sharp eye.";
      else if (totalScore < 45) lowerText.innerHTML = "Incredible memory! You must work with colors.";
      else if (totalScore < 48) lowerText.innerHTML = "Basically a human color picker! Super impressive.";
      else lowerText.innerHTML = "Absolute perfection! Your color vision is flawless.";

      switchToPage(finalPage);
      
    }

  });
});

function showRandomColor() {
    const tempHue = Math.floor(Math.random() * (360 - 0 + 1)) + 0;
    const tempSat = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
    const tempBri = Math.floor(Math.random() * (100 - 0 + 1)) + 0;

    shownColor = `hsl(${tempHue},${tempSat}%, ${tempBri}%)`;

    cardEl.forEach(el=> {
    el.style.backgroundColor = shownColor;
    });

    setTimeout(()=>cardEl.forEach(el=> {
      el.style.backgroundColor = 'rgb(0,0,0)';
      }),7000);
}

const timerEl = document.getElementById("timer");
let time = 600;
let timerId;

function counter() {
      if (time>0){
          time = time - 1;

          let decimals = time % 100;
          let formattedDecimals = decimals < 10 ? "0" + decimals : decimals;

          timerEl.innerHTML = `${Math.floor(time/100)}<span style="color: rgb(255, 255, 255,.3);">${formattedDecimals}</span>`
      }
      else {
        clearInterval(timerId);
        switchToPage(colorpickPage);
      }
}


/////////////////////////////////////////////////////////////////////
//  Color Slider and Picker logic                                  //
/////////////////////////////////////////////////////////////////////

const root = document.documentElement;
const hueSlider = document.getElementById('hue');
const satSlider = document.getElementById('sat');
const briSlider = document.getElementById('bri');
const sliderParameter = document.getElementById('slider-parameter');

const customCard = document.getElementById("custom-card");

function updateColors(slider) {
  let h = hueSlider.value;
  let s = satSlider.value;
  let b = briSlider.value;
  
  sliderParameter.innerHTML = slider;

  root.style.setProperty('--h', h);
  root.style.setProperty('--s', `${s}%`);
  root.style.setProperty('--l', `${b}%`); 

  customCard.style.backgroundColor = `hsl(${h},${s}%,${b}%)`;
}

hueSlider.addEventListener('input', () => updateColors("HUE"));
satSlider.addEventListener('input', () => updateColors("SATURATION"));
briSlider.addEventListener('input', () => updateColors("BRIGHTNESS"));

saveEl = document.getElementById("savebtn");
let chosenColor = "";

/////////////////////////////////////////////////////////////////////
// Color Score Calculation logic                                   //
/////////////////////////////////////////////////////////////////////

const chosenColorEl = document.getElementById("chosen-color");
const shownColorEl = document.getElementById("shown-color");

const chosenColorCardEl = document.getElementById("chosen-color-card");
const resultCardEl = document.getElementById("result-card");

const scoreEl = document.getElementById("score");
const roundMessageEl = document.querySelector("#result-card #heroText");

saveEl.addEventListener('click', function(e){

  e.preventDefault();
  clearInterval(timerId);

  let h = hueSlider.value;
  let s = satSlider.value;
  let b = briSlider.value;

  chosenColor = `hsl(${h}, ${s}%, ${b}%)`;

  const chosenColorValues = chosenColor
        .slice(4,-1)
        .split(',')
        .map(parseFloat)

  const shownColorValues = shownColor
          .slice(4,-1)
          .split(',')
          .map(parseFloat)

  const chosenColorRGB = hslToRgb(chosenColorValues);
  const shownColorRGB = hslToRgb(shownColorValues);

  getAccuracy(chosenColorRGB, shownColorRGB);

  chosenColorEl.innerHTML = `H${chosenColorValues[0]} S${chosenColorValues[1]} B${chosenColorValues[2]}`;
  shownColorEl.innerHTML = `H${shownColorValues[0]} S${shownColorValues[1]} B${shownColorValues[2]}`;

  chosenColorCardEl.style.backgroundColor = chosenColor;
  resultCardEl.style.backgroundColor = shownColor;

  gameData.push({
          inputColor : shownColor,
          outputColor : chosenColor,
          roundScore : Number(scoreEl.innerHTML)
        });

  let currentScore = Number(scoreEl.innerHTML);
  if (currentScore < 2) {
    roundMessageEl.innerHTML = "Way off track! Are we seeing the same color?";
  } else if (currentScore < 4) {
    roundMessageEl.innerHTML = "A bit muddy. Try to focus on the exact hue.";
  } else if (currentScore < 6) {
    roundMessageEl.innerHTML = "Getting somewhere. Don't get excited – slowly.";
  } else if (currentScore < 8) {
    roundMessageEl.innerHTML = "Solid memory! You are getting close to it.";
  } else if (currentScore < 9.5) {
    roundMessageEl.innerHTML = "Very impressive! Almost an exact match now.";
  } else {
    roundMessageEl.innerHTML = "Perfect match! Your color vision is insane.";
  }

  shownColor = "hsl(0,0%,0%)";
  chosenColor = "hsl(0,0%,0%)";

  switchToPage(roundresultPage);

})

function hslToRgb([h, s, l]) {
    s /= 100; l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
  }


function getAccuracy([r1,g1,b1],[r2,g2,b2]){

  //EUCLIDEAN METHOD OF COLOR ACCURACY CALCULATION IS NOT WORKING THAT GOOD

  // const distance = Math.sqrt(
  //   Math.pow(r2 - r1, 2) +
  //   Math.pow(g2 - g1, 2) +
  //   Math.pow(b2 - b1, 2) 
  // );

  // const similarity = (Math.max(0,1 - (distance/441.67)))*10;  //441.67 is dist btw black n white

  // const score = parseFloat(similarity.toFixed(2));

  // scoreEl.innerHTML = score.toFixed(2);


  //USING ANOTHER METHOD SOMETHING CALLED REDMEAN ALGORITHM THAT I FOUND ONLINE 

  const rMean = (r1 + r2) / 2;

  const r = r1 - r2;
  const g = g1 - g2;
  const b = b1 - b2;

  // 2. Apply human perceptual weights
  // Green gets a static heavy weight (4.0) because our eyes are most sensitive to it
  const weightR = 2 + (rMean / 256);
  const weightG = 4.0;
  const weightB = 2 + ((255 - rMean) / 256);

  // 3. Calculate the weighted perceptual distance
  const distance = Math.sqrt((weightR * r * r) + (weightG * g * g) + (weightB * b * b));

  // 4. Convert to a 0-1 score (765 is roughly the max distance in this model)
  const similarity = Math.max(0, 1 - (distance / 765));

  // 5. The Punishment Curve
  // A gentler exponent (1.2 instead of 2) stops players from getting a 7/10 for a muddy guess 
  // but doesn't over-punish accurate hues with imperfect lightness.
  const score = Math.pow(similarity, 1.2) * 10;

  scoreEl.innerHTML = score.toFixed(2);
  return parseFloat(score.toFixed(2));

}



/////////////////////////////////////////////////////////////////////
// Share progress and website link                                 //
/////////////////////////////////////////////////////////////////////


const postBtn = document.getElementById("post-btn");
const nameInput = document.getElementById("name-input");

postBtn.addEventListener('click', () => {

    let playerName = nameInput.value.trim() || "Someone";
    playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1);
    const finalScoreText = document.getElementById("final-score").innerText; 

    const rawMessage = `${playerName} scored ${finalScoreText} on Prism.gg!🤙\nCan you beat their color memory?\nGive it a try : https://prismgg.vercel.app/`;
    const encodedMessage = encodeURIComponent(rawMessage);

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
});