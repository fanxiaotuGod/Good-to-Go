// test-apis.js
const axios = require('axios');

const BASE_URL = 'http://localhost:5001/api';

// Test: Normal Signup
// Test: Normal Signup
async function testSignup() {
    try {
        const response = await axios.post(`${BASE_URL}/signup`, {
            email: 'testuser@example.com',
            password: 'password123'
        });
        console.log('Signup Response:', response.data);
    } catch (error) {
        // Log the entire error object for debugging
        console.error('Signup Error:', error);
    }
}


// Test: Signup with an email that already exists
async function testSignupEmailAlreadyExist() {
    try {
        const response = await axios.post(`${BASE_URL}/signup`, {
            email: 'testuser@example.com', // same email as before
            password: 'password123'
        });
        console.log('Signup (Email Already Exist) Response:', response.data);
    } catch (error) {
        console.error('Signup (Email Already Exist) Error:', error.response ? error.response.data : error.message);
    }
}

// Test: Normal Login
async function testLogin() {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            email: 'testuser@example.com',
            password: 'password123'
        });
        console.log('Login Response:', response.data);
    } catch (error) {
        console.error('Login Error:', error.response ? error.response.data : error.message);
    }
}

// Test: Login with an email that does not exist
async function testLoginEmailNotExist() {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            email: 'nonexistent@example.com',
            password: 'password123'
        });
        console.log('Login (Email Not Exist) Response:', response.data);
    } catch (error) {
        console.error('Login (Email Not Exist) Error:', error.response ? error.response.data : error.message);
    }
}

// Test: Login with correct email but wrong password
async function testLoginPasswordWrong() {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            email: 'testuser@example.com',
            password: 'wrongpassword'
        });
        console.log('Login (Wrong Password) Response:', response.data);
    } catch (error) {
        console.error('Login (Wrong Password) Error:', error.response ? error.response.data : error.message);
    }
}

// Test: Delete test volunteer
async function testDeleteVolunteer() {
    try {
        const response = await axios.delete(`${BASE_URL}/volunteer/testuser@example.com`);
        console.log('Delete Volunteer Response:', response.data);
    } catch (error) {
        console.error('Delete Volunteer Error:', error.response ? error.response.data : error.message);
    }
}

// Test: Insert or update volunteer availability
async function testVolunteerAvailabilityUpsert() {
    try {
        const response = await axios.post(`${BASE_URL}/volunteer/availability`, {
            email: 'testuser@example.com',
            password: 'password123',
            vehicle_size: 'medium',
            delivery_radius_km: 10,
            available_date: '2025-04-07'
        });
        console.log('Volunteer Availability Upsert Response:', response.data);
    } catch (error) {
        console.error('Volunteer Availability Upsert Error:', error.response?.data || error.message);
    }
}

// Test: Fetch volunteer info by email
async function testGetVolunteerByEmail() {
    try {
        const response = await axios.get(`${BASE_URL}/volunteer/testuser@example.com`);
        console.log('Get Volunteer Response:', response.data);
    } catch (error) {
        console.error('Get Volunteer Error:', error.response?.data || error.message);
    }
}


async function runTests() {
    console.log('--- Testing Signup ---');
    await testSignup();

    console.log('\n--- Testing Signup with Email Already Exist ---');
    await testSignupEmailAlreadyExist();

    console.log('\n--- Testing Login ---');
    await testLogin();

    console.log('\n--- Testing Login with Email Not Exist ---');
    await testLoginEmailNotExist();

    console.log('\n--- Testing Login with Wrong Password ---');
    await testLoginPasswordWrong();

    console.log('\n--- Deleting Test Volunteer ---');
    await testDeleteVolunteer();

    // console.log('\n--- Testing Volunteer Availability Insert/Update ---');
    // await testVolunteerAvailabilityUpsert();
    //
    // console.log('\n--- Testing Get Volunteer by Email ---');
    // await testGetVolunteerByEmail();

}

runTests();
