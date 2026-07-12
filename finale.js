// ===== FINALE LOGIC =====
// Simple and sweet finale page

function showFinale(food, activity, dateTime) {
    console.log("🎉 Finale starting with:", {food, activity, dateTime});
    
    // Get the finale page elements
    const finalePage = document.getElementById('finale-page');
    const finaleContent = document.getElementById('finale-content');
    const questionnairePage = document.getElementById('questionnaire-page');
    
    // Hide questionnaire
    questionnairePage.style.display = 'none';
    
    // Format the date beautifully
    const dateObj = new Date(dateTime);
    const formattedDate = dateObj.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Get the emoji for each food choice
    const foodEmojis = {
        'Italian': '🍝',
        'Sushi': '🍣',
        'Mexican': '🌮',
        'Burgers': '🍔',
        'Shawarma': '🥙',
        'Surprise': '🎁'
    };
    const foodEmoji = foodEmojis[food] || '🍽️';
    
    // Get the emoji for each activity
    const activityEmojis = {
        'Movie Night': '🎬',
        'Virtual Museum': '🏛️',
        'Game Night': '🎮',
        'Deep Convos': '💞'
    };
    const activityEmoji = activityEmojis[activity] || '✨';
    
    // ===== BUILD THE FINALE CONTENT =====
    finaleContent.innerHTML = `
        <div style="text-align: center;">
            <h1 class="finale-title">💖 Our Perfect Date is Planned! 💖</h1>
            <p style="color: #888; font-size: 1.1em; margin-bottom: 30px;">
                Here's what we're going to do on our special day...
            </p>
        </div>
        
        <!-- Her Choices -->
        <div class="finale-choices">
            <div class="choice-card-finale">
                <span class="emoji-big">${foodEmoji}</span>
                <div class="choice-label">Dinner</div>
                <div class="choice-value">${food}</div>
            </div>
            <div class="choice-card-finale">
                <span class="emoji-big">${activityEmoji}</span>
                <div class="choice-label">Activity</div>
                <div class="choice-value">${activity}</div>
            </div>
            <div class="choice-card-finale">
                <span class="emoji-big">📅</span>
                <div class="choice-label">Date & Time</div>
                <div class="choice-value">${formattedDate}</div>
            </div>
        </div>
        
        <!-- Simple Heartfelt Message -->
        <div class="heartfelt-message">
            <div class="greeting"> My little evil bunny princess,</div>
            
            <div class="message-text">
            I will love you for the rest of my life. There's no doubt in my mind about that. You are truly the most amazing woman I've ever known. I have fallen in love, I love you and I will never stop loving you!
            <br><br>
             You are absolutely breathtaking. I could get lost in your eyes forever, and just hearing your voice can turn my whole day around. More than anything else, you make my life infinitely better. The world is brighter, the colours are sharper, and my heart is warmer just because you're in it.
            <br><br>
    
                I can't wait to share this special date with you.
                <br><br>
                No matter the distance between us,
                my heart is always with you. I will always be yours, to infinity and beyond! (shush)
                <br><br>
                <span class="highlight">I Love You.💖</span>
            </div>
            
            <div class="signature">
                Forever yours,
                <div class="signature-name">Ahmad 💝</div>
            </div>
        </div>
    `;
    
    // Show the finale with animation
    finalePage.style.display = 'block';
    
    // Add floating hearts for extra romance
    addFloatingHearts();
    
    // ===== SEND EMAIL NOTIFICATION =====
    console.log('📧 About to send email from finale...');
    console.log('Food:', food);
    console.log('Activity:', activity);
    console.log('DateTime:', dateTime);
    
    // Check if the function exists
    if (typeof sendEmailNotification === 'function') {
        console.log('✅ sendEmailNotification function found!');
        
        sendEmailNotification(food, activity, dateTime)
            .then(success => {
                console.log('📧 Email result:', success);
                showEmailNotification(success);
            })
            .catch(error => {
                console.error('❌ Email error:', error);
                showEmailNotification(false);
            });
    } else {
        console.error('❌ sendEmailNotification function not found! Make sure email.js is loaded.');
        showEmailNotification(false);
    }
}

// ===== ADD FLOATING HEARTS =====
function addFloatingHearts() {
    // Remove any existing hearts
    const existingHearts = document.querySelector('.floating-hearts');
    if (existingHearts) {
        existingHearts.remove();
    }
    
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'floating-hearts';
    
    const heartEmojis = ['🌺', '💞','💖','🦋', '🌷'];
    const heartCount = 12;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Random position
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 30 + 15) + 'px';
        
        // Random animation duration
        const duration = Math.random() * 8 + 5;
        heart.style.animationDuration = duration + 's';
        
        // Random delay
        heart.style.animationDelay = Math.random() * 10 + 's';
        
        heartsContainer.appendChild(heart);
    }
    
    document.body.appendChild(heartsContainer);
}

// ===== RESET BUTTON =====
document.addEventListener('DOMContentLoaded', function() {
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            location.reload();
        });
    }
});