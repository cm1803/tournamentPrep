// Helper function to show and hide sections
function showSection(sectionId) {
    document.querySelectorAll('body > div').forEach(div => {
        div.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// User data storage (for simplicity, using localStorage)
function saveUserData(data) {
    localStorage.setItem('user', JSON.stringify(data));
}

function getUserData() {
    return JSON.parse(localStorage.getItem('user'));
}

// Login and Registration
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const userData = getUserData();

    if (userData && userData.username === username && userData.password === password) {
        showSection('home-section');
        loadHomePage();
    } else {
        alert('Invalid username or password');
    }
});

document.getElementById('register-button').addEventListener('click', function () {
    showSection('register-section');
});

document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;

    const userData = {
        username: newUsername,
        password: newPassword,
        firstName: firstName,
        lastName: lastName,
        tournament: null
    };

    saveUserData(userData);
    showSection('tournament-section');
});

document.getElementById('tournament-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const tournamentName = document.getElementById('tournament-name').value;
    const tournamentDate = document.getElementById('tournament-date').value;

    let userData = getUserData();
    userData.tournament = {
        name: tournamentName,
        date: tournamentDate
    };

    saveUserData(userData);
    showSection('home-section');
    loadHomePage();
});

function loadHomePage() {
    const userData = getUserData();
    document.getElementById('greeting').textContent = `Hi, ${userData.firstName}`;
    updateCountdown();
}

function updateCountdown() {
    const userData = getUserData();
    const tournamentDate = new Date(userData.tournament.date);
    const currentDate = new Date();
    const diffTime = Math.abs(tournamentDate - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    document.getElementById('countdown').textContent = `${diffDays} days until ${userData.tournament.name}`;
}

// Initialize app
document.addEventListener('DOMContentLoaded', function () {
    const userData = getUserData();

    if (userData) {
        const tournamentDate = new Date(userData.tournament.date);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - tournamentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (!userData.tournament || diffDays > 7) {
            showSection('tournament-section');
        } else {
            showSection('home-section');
            loadHomePage();
        }
    } else {
        showSection('login-section');
    }
});
