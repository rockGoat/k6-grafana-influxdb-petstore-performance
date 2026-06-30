import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '5s', target: 10 }, // Ramp-up to 10 users over 1 minute
    { duration: '10s', target: 10 }, // Stay at 10 users for 3 minutes
    { duration: '5s', target: 0 },  // Ramp-down to 0 users over 1 minute
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
  },
};

const BASE_URL = 'https://petstore.swagger.io/v2'; // Replace with your API base URL
const INFLUXDB_URL = 'http://localhost:8086/YouTubeDemo';

export default function () {
  // Create a user
  let createUserPayload = JSON.stringify({
    id: Math.floor(Math.random() * 1000),
    username: `user${Math.floor(Math.random() * 1000)}`,
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    password: 'password123',
    phone: '1234567890',
    userStatus: 1,
  });

  let createUserHeaders = { 'Content-Type': 'application/json' };

  let createUserRes = http.post(`${BASE_URL}/user`, createUserPayload, { headers: createUserHeaders });
  check(createUserRes, {
    'create user status is 200': (r) => r.status === 200,
  });

  sleep(2); // Simulate user think time

  // Get user by username
  let username = JSON.parse(createUserPayload).username;
  let getUserRes = http.get(`${BASE_URL}/user/${username}`);
  check(getUserRes, {
    'get user status is 200': (r) => r.status === 200,
    'retrieved username matches': (r) => r.json().username === username,
  });

  sleep(1); // Simulate user think time
}
