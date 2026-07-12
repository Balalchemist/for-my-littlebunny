// ===== EMAIL SERVICE =====
// This file handles sending email notifications via Formspree

// ===== CONFIGURATION =====
const EMAIL_CONFIG = {
    // Your Formspree endpoint (your email)
    yourEndpoint: 'https://formspree.io/f/mojgazyl',
    // Her Formspree endpoint (her email)
    herEndpoint: 'https://formspree.io/f/xkodwlwv'
};

// ===== SEND EMAIL =====
function sendEmailNotification(food, activity, dateTime) {
    console.log('📧 Sending email notification...');
    
    // Format the date nicely for the email
    const dateObj = new Date(dateTime);
    const formattedDate = dateObj.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Check if activity was "Other"
    const otherInput = document.getElementById('other-activity-input');
    const otherRadio = document.querySelector('input[name="activity"][value="Other"]');
    let activityValue = activity;
    
    if (otherRadio && otherRadio.checked && otherInput) {
        const customActivity = otherInput.value.trim();
        if (customActivity) {
            activityValue = customActivity + ' ✨';
        }
    }
    
    // ===== BUILD THE MESSAGE CONTENT =====
    const messageForYou = `
💖 SHE PLANNED A DATE! 💖

━━━━━━━━━━━━━━━━━━━━━━━━━

🍽️  What she wants to eat: ${food}

🎭  What she wants to do: ${activityValue}

📅  When: ${formattedDate}

━━━━━━━━━━━━━━━━━━━━━━━━━

💕 Time to start planning! Make it special! 💕

She's so excited about this date - don't let her down! 😉

---
Sent from the Date Planner 💖
    `;
    
    const messageForHer = `
💖 YOU PLANNED A DATE! 💖

━━━━━━━━━━━━━━━━━━━━━━━━━

🍽️  You chose: ${food}

🎭  You chose: ${activityValue}

📅  On: ${formattedDate}

━━━━━━━━━━━━━━━━━━━━━━━━━

💕 He's already planning something amazing for you! 💕

Get ready for a wonderful time together! 🥰

---
Sent from the Date Planner 💖
    `;
    
    // ===== EMAIL FOR YOU (Ahmad) =====
    const emailForYou = {
        // Use 'message' as the field name (this is what Formspree expects)
        message: messageForYou,
        // Also include individual fields for better formatting
        food: food,
        activity: activityValue,
        date: formattedDate,
        // This helps Formspree format the email properly
        _subject: '💖 She planned a date! 💖'
    };
    
    // ===== EMAIL FOR HER (Shiham) =====
    const emailForHer = {
        message: messageForHer,
        food: food,
        activity: activityValue,
        date: formattedDate,
        _subject: '💖 You planned a date! 💖'
    };
    
    console.log('📧 Sending to you:', EMAIL_CONFIG.yourEndpoint);
    console.log('📧 Sending to her:', EMAIL_CONFIG.herEndpoint);
    
    // Send to BOTH Formspree endpoints with different messages
    const sendToYou = fetch(EMAIL_CONFIG.yourEndpoint, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(emailForYou)
    });
    
    const sendToHer = fetch(EMAIL_CONFIG.herEndpoint, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(emailForHer)
    });
    
    // Wait for both to complete
    return Promise.all([sendToYou, sendToHer])
        .then(responses => {
            const allSuccess = responses.every(res => res.ok);
            if (allSuccess) {
                console.log('✅ Emails sent successfully to both!');
                return true;
            } else {
                console.log('❌ Some emails failed:', responses.map(r => r.status));
                return false;
            }
        })
        .catch(error => {
            console.error('❌ Email error:', error);
            return false;
        });
}

// ===== SHOW NOTIFICATION =====
function showEmailNotification(success) {
    // Remove any existing notifications
    const existing = document.querySelector('.email-notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'email-notification';
    
    if (success) {
        notification.textContent = '💖 Date saved! Check your email! 💖';
        notification.style.background = 'linear-gradient(135deg, #ff6b8a, #d6336c)';
    } else {
        notification.textContent = '💖 Date saved! (Email notification failed) 💖';
        notification.style.background = 'linear-gradient(135deg, #ff8fab, #d6336c)';
    }
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #ff6b8a, #d6336c);
        color: white;
        padding: 18px 30px;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(214, 51, 108, 0.4);
        z-index: 99999;
        font-family: 'Georgia', serif;
        font-size: 1.1em;
        text-align: center;
        max-width: 90%;
        animation: slideUp 0.5s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        notification.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(30px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 5000);
}

// ===== ADD ANIMATION STYLES =====
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
`;
document.head.appendChild(styleSheet);

// ===== TEST FUNCTION =====
function testEmail() {
    console.log('🧪 Testing email...');
    const testFood = 'Test Food 🍝';
    const testActivity = 'Test Activity 🎬';
    const testDate = new Date().toISOString();
    
    sendEmailNotification(testFood, testActivity, testDate)
        .then(success => {
            showEmailNotification(success);
            if (success) {
                console.log('✅ Test emails sent! Check both inboxes.');
            } else {
                console.log('❌ Test emails failed. Check your Formspree endpoints.');
            }
        });
}

// ===== EXPOSE FUNCTIONS GLOBALLY =====
window.sendEmailNotification = sendEmailNotification;
window.testEmail = testEmail;

console.log('💖 Email service loaded!');
console.log('📧 To test, open console and type: testEmail()');