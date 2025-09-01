// Simulated database for users
const usersDB = {};

// Register a new user
function registerUser() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const idNumber = document.getElementById('reg-id').value;
    const phoneNumber = document.getElementById('reg-phone').value;

    if (username && password && idNumber && phoneNumber) {
        if (usersDB[username]) {
            document.getElementById('register-message').innerHTML = "Username already exists!";
        } else {
            usersDB[username] = { password, idNumber, phoneNumber };
            document.getElementById('register-message').innerHTML = "Registration successful!";
            // Hide registration form and show login form
            setTimeout(() => {
                document.getElementById('register').style.display = 'none';
                document.getElementById('login').style.display = 'block';
            }, 1000);
        }
    } else {
        document.getElementById('register-message').innerHTML = "Please fill in all fields!";
    }
}

// Log in a user
function loginUser() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (usersDB[username] && usersDB[username].password === password) {
        document.getElementById('login-message').innerHTML = "Login successful!";
        document.getElementById('login').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
    } else {
        document.getElementById('login-message').innerHTML = "Invalid credentials!";
    }
}

// Show Booking Section
function showBooking() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('parking-management').style.display = 'block';
    createParkingSpots();
}

// Show Payments Section
function showPayments() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('payments').style.display = 'block';
}

// Show Profile Section
function showProfile() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('profile').style.display = 'block';
}

// Create parking spots dynamically
function createParkingSpots() {
    const totalSpots = 20;
    const parkingContainer = document.getElementById('parking-spots');
    parkingContainer.innerHTML = '';

    for (let i = 1; i <= totalSpots; i++) {
        const spot = document.createElement('div');
        spot.classList.add('parking-spot');
        spot.id = `spot-${i}`;
        spot.innerHTML = `Spot ${i}`;
        spot.addEventListener('click', () => bookSpot(i));
        parkingContainer.appendChild(spot);
    }
    updateAnalytics();
}

// Simulate booking a parking spot
function bookSpot(spotId) {
    const spotElement = document.getElementById(`spot-${spotId}`);
    if (spotElement.classList.contains('booked')) {
        alert(`Spot ${spotId} is already booked!`);
    } else {
        spotElement.classList.add('booked');
        updateAnalytics();
    }
}

// Update analytics data
function updateAnalytics() {
    const bookedSpots = document.querySelectorAll('.booked').length;
    const totalSpots = 20;
    const availableSpots = totalSpots - bookedSpots;

    document.getElementById('total-spots').innerHTML = totalSpots;
    document.getElementById('booked-spots').innerHTML = bookedSpots;
    document.getElementById('available-spots').innerHTML = availableSpots;
}

// Log out user
function logoutUser() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}
