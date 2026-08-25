// Game history and round trackers
let gameHistory = [];
let currentRound = 0;
const totalRounds = 5;

// Screen / Card DOM references
const homeCard = document.getElementById("home-card");
const countdownCard = document.getElementById("countdown-card");
const memoryCard = document.getElementById("memory-card");
const pickerCard = document.getElementById("picker-card");
const resultCard = document.getElementById("result-card");
const finalCard = document.getElementById("final-card");

function hideAllCards() {
    homeCard.classList.add("hidden");
    countdownCard.classList.add("hidden");
    memoryCard.classList.add("hidden");
    pickerCard.classList.add("hidden");
    resultCard.classList.add("hidden");
    finalCard.classList.add("hidden");
}

function showCard(cardElement) {
    hideAllCards();
    cardElement.classList.remove("hidden");
}

// Global target color for current round
let targetColor = "hsl(0, 0%, 0%)";

const startButtons = document.querySelectorAll(".start-btn");
const allCards = document.querySelectorAll(".card");
const countdownStatus = document.getElementById("countdown-status");
const roundLabels = document.querySelectorAll(".round-counter");

// Display home screen on load
showCard(homeCard);

startButtons.forEach(btn => {
    btn.addEventListener('click', () => {

        if (currentRound < totalRounds) {
            showCard(countdownCard);

            setTimeout(() => {
                showRandomColor();
            }, 3000);

            setTimeout(() => setCountdownText("set"), 1500);
            setTimeout(() => setCountdownText("go"), 3000);

            setTimeout(() => {
                setCountdownText("ready");
                showCard(memoryCard);
            }, 4000);

            function setCountdownText(text) {
                countdownStatus.innerHTML = text;
            }

            setTimeout(() => {
                timerCount = 600;
                clearInterval(timerInterval);
                timerInterval = setInterval(runTimer, 10);
            }, 3100);

            currentRound++;

            roundLabels.forEach(label => {
                label.innerHTML = `${currentRound} / ${totalRounds}`;
            });

        } else {
            // Render final results page
            const r1 = document.getElementById("r1");
            const r2 = document.getElementById("r2");
            const r3 = document.getElementById("r3");
            const r4 = document.getElementById("r4");
            const r5 = document.getElementById("r5");

            const finalScoreEl = document.getElementById("final-score");
            const upperText = document.getElementById("upper-text");
            const lowerText = document.getElementById("lower-text");

            r1.style.backgroundImage = `linear-gradient(-45deg, ${gameHistory[0].inputColor} 50%, ${gameHistory[0].outputColor} 50%)`;
            r2.style.backgroundImage = `linear-gradient(-45deg, ${gameHistory[1].inputColor} 50%, ${gameHistory[1].outputColor} 50%)`;
            r3.style.backgroundImage = `linear-gradient(-45deg, ${gameHistory[2].inputColor} 50%, ${gameHistory[2].outputColor} 50%)`;
            r4.style.backgroundImage = `linear-gradient(-45deg, ${gameHistory[3].inputColor} 50%, ${gameHistory[3].outputColor} 50%)`;
            r5.style.backgroundImage = `linear-gradient(-45deg, ${gameHistory[4].inputColor} 50%, ${gameHistory[4].outputColor} 50%)`;

            const totalScore = gameHistory.reduce((sum, item) => sum + item.roundScore, 0);

            finalScoreEl.innerHTML = `<span style="color: #ffeb3b;">${totalScore.toFixed(2)}</span> / 50`;
            upperText.innerHTML = `Mmm almost ${Math.round(totalScore)} out of 50.`;

            if (totalScore < 5) lowerText.innerHTML = "Were your eyes even open? That was rough.";
            else if (totalScore < 10) lowerText.innerHTML = "Not too genius but hey – it's the effort that counts.";
            else if (totalScore < 15) lowerText.innerHTML = "A little muddy, but you got a few hues right.";
            else if (totalScore < 20) lowerText.innerHTML = "Not bad, but your color memory needs some work.";
            else if (totalScore < 25) lowerText.innerHTML = "Almost average! You have a decent eye.";
            else if (totalScore < 30) lowerText.innerHTML = "Solid middle ground. You're getting the hang of it.";
            else if (totalScore < 35) lowerText.innerHTML = "Pretty good! Your color recall is above average.";
            else if (totalScore < 40) lowerText.innerHTML = "Great job! You have a very sharp eye.";
            else if (totalScore < 45) lowerText.innerHTML = "Incredible memory! You must work with colors.";
            else if (totalScore < 48) lowerText.innerHTML = "Basically a human color picker! Super impressive.";
            else lowerText.innerHTML = "Absolute perfection! Your color vision is flawless.";

            showCard(finalCard);
        }
    });
});

function showRandomColor() {
    const randomHue = Math.floor(Math.random() * 361);
    const randomSat = Math.floor(Math.random() * 101);
    const randomBri = Math.floor(Math.random() * 101);

    targetColor = `hsl(${randomHue}, ${randomSat}%, ${randomBri}%)`;

    allCards.forEach(card => {
        card.style.backgroundColor = targetColor;
    });

    setTimeout(() => {
        allCards.forEach(card => {
            card.style.backgroundColor = '#111216';
        });
    }, 7000);
}

const timerEl = document.getElementById("timer");
let timerCount = 600;
let timerInterval;

function runTimer() {
    if (timerCount > 0) {
        timerCount--;

        let decimals = timerCount % 100;
        let formattedDecimals = decimals < 10 ? "0" + decimals : decimals;

        timerEl.innerHTML = `${Math.floor(timerCount / 100)}<span style="color: rgba(255, 255, 255, 0.3);">${formattedDecimals}</span>`;
    } else {
        clearInterval(timerInterval);
        showCard(pickerCard);
    }
}

// -------------------------------------------------------------
// Color Sliders and Live Preview
// -------------------------------------------------------------

const rootEl = document.documentElement;
const hueInput = document.getElementById('hue');
const satInput = document.getElementById('sat');
const briInput = document.getElementById('bri');
const sliderParameter = document.getElementById('slider-parameter');

const pickerCardEl = document.getElementById("picker-card");

function updateColor(sliderName) {
    let h = hueInput.value;
    let s = satInput.value;
    let b = briInput.value;

    sliderParameter.innerHTML = sliderName;

    rootEl.style.setProperty('--h', h);
    rootEl.style.setProperty('--s', `${s}%`);
    rootEl.style.setProperty('--l', `${b}%`);

    pickerCardEl.style.backgroundColor = `hsl(${h}, ${s}%, ${b}%)`;
}

hueInput.addEventListener('input', () => updateColor("HUE"));
satInput.addEventListener('input', () => updateColor("SATURATION"));
briInput.addEventListener('input', () => updateColor("BRIGHTNESS"));

const saveBtn = document.getElementById("save-btn");
let selectedColor = "";

// -------------------------------------------------------------
// Score and Redmean Accuracy Calculation
// -------------------------------------------------------------

const chosenColorText = document.getElementById("chosen-color");
const shownColorText = document.getElementById("shown-color");
const chosenColorCard = document.getElementById("chosen-color-card");
const scoreText = document.getElementById("score");
const feedbackText = document.getElementById("feedback-text");

saveBtn.addEventListener('click', function(e) {
    e.preventDefault();
    clearInterval(timerInterval);

    let h = hueInput.value;
    let s = satInput.value;
    let b = briInput.value;

    selectedColor = `hsl(${h}, ${s}%, ${b}%)`;

    const chosenColorValues = selectedColor
        .slice(4, -1)
        .split(',')
        .map(parseFloat);

    const shownColorValues = targetColor
        .slice(4, -1)
        .split(',')
        .map(parseFloat);

    const chosenRgb = hslToRgb(chosenColorValues);
    const shownRgb = hslToRgb(shownColorValues);

    const calculatedScore = calculateAccuracy(chosenRgb, shownRgb);

    chosenColorText.innerHTML = `H${chosenColorValues[0]} S${chosenColorValues[1]} B${chosenColorValues[2]}`;
    shownColorText.innerHTML = `H${shownColorValues[0]} S${shownColorValues[1]} B${shownColorValues[2]}`;

    chosenColorCard.style.backgroundColor = selectedColor;
    resultCard.style.backgroundColor = targetColor;

    gameHistory.push({
        inputColor: targetColor,
        outputColor: selectedColor,
        roundScore: calculatedScore
    });

    if (calculatedScore < 2) {
        feedbackText.innerHTML = "Way off track! Are we seeing the same color?";
    } else if (calculatedScore < 4) {
        feedbackText.innerHTML = "A bit muddy. Try to focus on the exact hue.";
    } else if (calculatedScore < 6) {
        feedbackText.innerHTML = "Getting somewhere. Don't get excited – slowly.";
    } else if (calculatedScore < 8) {
        feedbackText.innerHTML = "Solid memory! You are getting close to it.";
    } else if (calculatedScore < 9.5) {
        feedbackText.innerHTML = "Very impressive! Almost an exact match now.";
    } else {
        feedbackText.innerHTML = "Perfect match! Your color vision is insane.";
    }

    targetColor = "hsl(0, 0%, 0%)";
    selectedColor = "hsl(0, 0%, 0%)";

    showCard(resultCard);
});

function hslToRgb([h, s, l]) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
}

function calculateAccuracy([r1, g1, b1], [r2, g2, b2]) {
    // Redmean Color Difference Algorithm (accounts for human eye sensitivity)
    const rMean = (r1 + r2) / 2;

    const r = r1 - r2;
    const g = g1 - g2;
    const b = b1 - b2;

    // Perceptual sensitivity weights
    const weightR = 2 + (rMean / 256);
    const weightG = 4.0;
    const weightB = 2 + ((255 - rMean) / 256);

    const distance = Math.sqrt((weightR * r * r) + (weightG * g * g) + (weightB * b * b));

    // Convert distance to similarity score out of 10
    const similarity = Math.max(0, 1 - (distance / 765));
    const score = Math.pow(similarity, 1.2) * 10;

    scoreText.innerHTML = score.toFixed(2);
    return parseFloat(score.toFixed(2));
}

// -------------------------------------------------------------
// WhatsApp Score Share
// -------------------------------------------------------------

const postBtn = document.getElementById("post-btn");
const nameInput = document.getElementById("name-input");

postBtn.addEventListener('click', () => {
    let playerName = nameInput.value.trim() || "Someone";
    playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1);
    const finalScoreText = document.getElementById("final-score").innerText;

    const shareMsg = `${playerName} scored ${finalScoreText} on spectra!🤙\nCan you beat their color memory?\nGive it a try : https://spectra.vercel.app/`;
    const encoded = encodeURIComponent(shareMsg);

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
});