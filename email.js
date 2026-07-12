// ===== EMAIL SERVICE =====
// This file handles sending email notifications via Formspree

// ===== CONFIGURATION =====
const EMAIL_CONFIG = {
    endpoint: 'https://formspree.io/f/mojgazyl'
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
    
    // Create the email content
    const emailData = {
        food: food,
        activity: activityValue,
        date: dateTime,
        formattedDate: formattedDate,
        _cc: 'ahmadbalal265@gmail.com, shihamt13@gmail.com',  
        message: `
💖 NEW DATE PLANNED! 💖

━━━━━━━━━━━━━━━━━━━━━━━━━

🍽️  What to eat: ${food}

🎭  Activity: ${activityValue}

📅  Date & Time: ${formattedDate}

━━━━━━━━━━━━━━━━━━━━━━━━━

💕 Time to start planning! 💕

---
Sent from the Date Planner 💖
        `
    };
    
    // Send to Formspree
    return fetch(EMAIL_CONFIG.endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
    })
    .then(response => {
        if (response.ok) {
            console.log('✅ Email sent successfully!');
            return true;
        } else {
            console.log('❌ Email error:', response.status);
            return false;
        }
    })
    .catch(error => {
        console.log('❌ Email error:', error);
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
                console.log('✅ Test email sent! Check your inbox.');
            } else {
                console.log('❌ Test email failed. Check your Formspree endpoint.');
            }
        });
}

// ===== EXPOSE FUNCTIONS GLOBALLY =====
window.sendEmailNotification = sendEmailNotification;
window.testEmail = testEmail;

console.log('💖 Email service loaded!');
console.log('📧 To test, open console and type: testEmail()');