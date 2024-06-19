const request = require('supertest');
const app = require('../src/index'); // Correctly import the server instance

describe('Health Check', () => {
  it('should return health status', async () => {
    const response = await request(app).get('/v2/health');
    console.log('Response status:', response.status);
    console.log('Response body:', response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('chain');
    expect(response.body).toHaveProperty('code');
  });
});
