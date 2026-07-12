// ===== LANDING PAGE LOGIC =====

// Get the buttons - ONLY get the buttons here
const yesButton = document.getElementById('yes-btn');
const noButton = document.getElementById('no-btn');

// We'll get landingPage from questionnaire.js
// So we DON'T declare it here again

// ===== MAKE THE NO BUTTON RUN AWAY =====
function makeNoButtonRunAway() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    
    const maxX = windowWidth - buttonWidth - 20;
    const maxY = windowHeight - buttonHeight - 20;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noButton.style.position = 'fixed';
    noButton.style.left = randomX + 'px';
    noButton.style.top = randomY + 'px';
    noButton.style.transition = 'all 0.2s ease';
    noButton.style.zIndex = '1000';
}

// Run away on hover
noButton.addEventListener('mouseover', makeNoButtonRunAway);

// Run away on click
noButton.addEventListener('click', function() {
    makeNoButtonRunAway();
    setTimeout(makeNoButtonRunAway, 100);
    setTimeout(makeNoButtonRunAway, 200);
});

// ===== HANDLE YES CLICK =====
yesButton.addEventListener('click', function() {
    // Get landingPage from the global scope (declared in questionnaire.js)
    const landingPage = document.getElementById('landing-page');
    
    // Fade out landing page
    landingPage.style.transition = 'opacity 1s ease';
    landingPage.style.opacity = '0';
    
    // After fade, hide it and show questionnaire
    setTimeout(function() {
        landingPage.style.display = 'none';
        showQuestionnaire(); // This function is in questionnaire.js
    }, 1000);
});