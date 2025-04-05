// test-apis.js
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Test: Normal Signup
async function testSignup() {
    try {
        const response = await axios.post(`${BASE_URL}/signup`, {
            email: 'testuser@example.com',
            password: 'password123'
        });
        console.log('Signup Response:', response.data);
    } catch (error) {
        console.error('Signup Error:', error.response ? error.response.data : error.message);
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
}


runTests();
