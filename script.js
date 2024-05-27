// Helper function to show and hide sections
function showSection(sectionId) {
    document.querySelectorAll('body > div').forEach(div => {
        div.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// User data storage (for simplicity, using localStorage)
function saveUserData(data) {
    localStorage.setItem('users', JSON.stringify(data));
}

function getUserData() {
    return JSON.parse(localStorage.getItem('users')) || {};
}

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    showSection('welcome-section');
}

// Login and Registration
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const userData = getUserData();

    if (userData[username] && userData[username].password === password) {
        localStorage.setItem('currentUser', username);
        const tournamentDate = new Date(userData[username].tournament.date);
        const
