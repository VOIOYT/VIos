const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');




// script.js
document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.querySelector('.fade-in-text');
    setTimeout(() => {
        textElement.classList.add('visible');
    }, 1); // Delay to start the animation
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === 'Mosleh' && password === 'Warren4577') {
        // Trigger the animation
        const toggleContainer = document.querySelector('.toggle-container');
        toggleContainer.classList.add('shift-and-fade');

        // Redirect after the animation completes
        setTimeout(() => {
            window.location.href = 'homepage.html';
        }, 1000); // 1 second to match the animation duration
    } else {
        alert('Invalid username or password. Please try again.');
    }
});
