const request = require('supertest');
const app = require('../app'); // ajuste se necessário

let token;

beforeAll(async () => {
  const loginRes = await request(app).post('/login').send({
    usuario: 'admin',
    senha: '123456'
  });

  console.log('Resposta do login:', loginRes.body); // debug
  token = loginRes.body.token;

  expect(token).toBeDefined();
  expect(typeof token).toBe('string');
});

describe(' Testes de autenticação /clientes', () => {
  it('deve retornar 401 sem token', async () => {
    const res = await request(app).get('/clientes');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('erro');
  });

  it('deve retornar 200 com token válido', async () => {
    const res = await request(app)
      .get('/clientes')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); // espera um array de clientes
  });
});
