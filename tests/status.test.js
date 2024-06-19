const request = require('supertest');
const app = require('../src/index'); // Correctly import the server instance

describe('Status Check', () => {
  it('should return status information', async () => {
    const response = await request(app).get('/v2/status');
    console.log('Response status:', response.status);
    console.log('Response body:', response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('server_info');
    expect(response.body).toHaveProperty('supported_currencies');
  });
});
