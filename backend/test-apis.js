// test-apis.js
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

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

async function runTests() {
    console.log('Testing Signup...');
    await testSignup();
    console.log('Testing Login...');
    await testLogin();
}

runTests();
