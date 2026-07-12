// ===== QUESTIONNAIRE LOGIC - STEP BY STEP =====

// Get references to the pages
const landingPage = document.getElementById('landing-page');
const questionnairePage = document.getElementById('questionnaire-page');
const finalePage = document.getElementById('finale-page');

// Track current step
let currentStep = 1;
let selectedFood = null;
let selectedActivity = null;

// ===== SHOW QUESTIONNAIRE =====
function showQuestionnaire() {
    landingPage.style.display = 'none';
    questionnairePage.style.display = 'block';
    currentStep = 1;
    showStep(1);
}

// ===== SHOW A SPECIFIC STEP =====
function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.question-step').forEach(el => {
        el.classList.remove('active');
    });
    
    // Show the selected step
    const stepElement = document.getElementById(`question-${step}`);
    if (stepElement) {
        stepElement.classList.add('active');
    }
    
    // Update progress dots
    document.querySelectorAll('.progress-step').forEach((dot, index) => {
        const stepNum = index + 1;
        dot.classList.remove('active', 'completed');
        if (stepNum === step) {
            dot.classList.add('active');
        } else if (stepNum < step) {
            dot.classList.add('completed');
        }
    });
    
    // Update progress lines
    document.querySelectorAll('.progress-line').forEach((line, index) => {
        const stepNum = index + 1;
        if (stepNum < step) {
            line.classList.add('completed');
        } else {
            line.classList.remove('completed');
        }
    });
}

// ===== NAVIGATION FUNCTIONS =====
function goToNextStep() {
    if (currentStep < 3) {
        currentStep++;
        showStep(currentStep);
        // Scroll to top of container
        document.querySelector('.questionnaire-container').scrollTop = 0;
    }
}

function goToPreviousStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

// ===== SETUP FOOD OPTIONS =====
function setupFoodOptions() {
    const foodCards = document.querySelectorAll('.option-card-large[data-food]');
    
    foodCards.forEach(card => {
        const radio = card.querySelector('input[type="radio"]');
        
        radio.addEventListener('change', function() {
            if (this.checked) {
                selectedFood = this.value;
                document.getElementById('to-question-2').disabled = false;
            }
        });
        
        // Make the whole card clickable
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the radio directly (it's hidden anyway)
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                // Trigger the change event
                const event = new Event('change');
                radio.dispatchEvent(event);
            }
        });
    });
}

// ===== SETUP ACTIVITY OPTIONS =====
function setupActivityOptions() {
    const activityCards = document.querySelectorAll('.option-card-large[data-activity]');
    const otherContainer = document.getElementById('other-activity-container');
    const otherInput = document.getElementById('other-activity-input');
    
    activityCards.forEach(card => {
        const radio = card.querySelector('input[type="radio"]');
        
        radio.addEventListener('change', function() {
            if (this.checked) {
                selectedActivity = this.value;
                
                // If "Other" is selected, show the input
                if (this.value === 'Other') {
                    otherContainer.style.display = 'block';
                    setTimeout(() => otherInput.focus(), 100);
                    // Keep button disabled until they type something
                    document.getElementById('to-question-3').disabled = true;
                } else {
                    otherContainer.style.display = 'none';
                    otherInput.value = '';
                    document.getElementById('to-question-3').disabled = false;
                }
            }
        });
        
        // Make the whole card clickable
        card.addEventListener('click', function(e) {
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                const event = new Event('change');
                radio.dispatchEvent(event);
            }
        });
    });
    
    // Handle "Other" input
    otherInput.addEventListener('input', function() {
        if (this.value.trim().length > 0) {
            document.getElementById('to-question-3').disabled = false;
        } else {
            document.getElementById('to-question-3').disabled = true;
        }
    });
}

// ===== SETUP DATE PICKER =====
function setupDatePicker() {
    const datePicker = document.getElementById('date-time-picker');
    
    datePicker.addEventListener('change', function() {
        if (this.value) {
            document.getElementById('plan-date-btn').disabled = false;
        } else {
            document.getElementById('plan-date-btn').disabled = true;
        }
    });
}

// ===== PLAN THE DATE =====
function planDate() {
    const food = selectedFood;
    let activity = selectedActivity;
    const dateTime = document.getElementById('date-time-picker').value;
    
    // If "Other" was selected, get the custom activity
    if (activity === 'Other') {
        const otherInput = document.getElementById('other-activity-input');
        const customActivity = otherInput.value.trim();
        if (customActivity) {
            activity = customActivity;
        } else {
            alert('💝 Please tell me what activity you\'d like to do! ✍️');
            return;
        }
    }
    
    // Validate everything is selected
    if (!food) {
        alert('💝 Please select what you\'d like to eat!');
        return;
    }
    
    if (!activity) {
        alert('💝 Please select an activity you\'d enjoy!');
        return;
    }
    
    if (!dateTime) {
        alert('💝 Please choose a date and time for our special date!');
        return;
    }
    
    // Hide questionnaire and show finale
    questionnairePage.style.display = 'none';
    showFinale(food, activity, dateTime);
}

// ===== SETUP EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
    // Navigation buttons
    document.getElementById('to-question-2').addEventListener('click', goToNextStep);
    document.getElementById('to-question-3').addEventListener('click', goToNextStep);
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', goToPreviousStep);
    });
    
    // Plan button
    document.getElementById('plan-date-btn').addEventListener('click', planDate);
    
    // Setup options
    setupFoodOptions();
    setupActivityOptions();
    setupDatePicker();
    
    // Initial state - disable next buttons
    document.getElementById('to-question-2').disabled = true;
    document.getElementById('to-question-3').disabled = true;
    document.getElementById('plan-date-btn').disabled = true;
});