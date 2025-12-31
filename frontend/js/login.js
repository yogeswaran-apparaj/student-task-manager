// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Interactive elements
const interactiveElements = document.querySelectorAll('input, button, a');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.borderColor = '#00cec9';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.borderColor = '#6c5ce7';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Login Form Handling
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple demo authentication (frontend only)
    if (username === 'admin' && password === 'admin123') {
        // Show success animation
        const loginBtn = document.querySelector('.login-btn');
        loginBtn.innerHTML = '<i class="fas fa-check"></i> Login Successful!';
        loginBtn.style.background = 'linear-gradient(90deg, #00b894, #00cec9)';
        
        // Add success animation
        document.querySelector('.login-card').classList.add('pulse');
        
        // Redirect after delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        // Show error animation
        document.getElementById('loginForm').classList.add('shake');
        
        // Reset animation
        setTimeout(() => {
            document.getElementById('loginForm').classList.remove('shake');
        }, 500);
        
        alert('Invalid credentials! Use:\nUsername: admin\nPassword: admin123');
    }
});

// Input focus effects
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focus');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focus');
        }
    });
});