const request = require('supertest');
const app = require('../app'); // ajuste o caminho conforme sua estrutura

describe(' Testes de validação de campos', () => {
  it('deve falhar se o nome for muito curto', async () => {
    const res = await request(app).post('/clientes').send({
      nome: 'Jo',
      sobrenome: 'Silva',
      email: 'joao@teste.com',
      idade: 30,
      produto: 'Óleo',
      descricao: 'Lub',
      preco: 49.9,
      atualizado: '2024-05-10'
    });
    expect(res.statusCode).toBe(400);
  });

  it('deve falhar se o email for inválido', async () => {
    const res = await request(app).post('/clientes').send({
      nome: 'Joao',
      sobrenome: 'Silva',
      email: 'joao_email.com',
      idade: 30,
      produto: 'Óleo',
      descricao: 'Lubrificante automotivo',
      preco: 49.9,
      atualizado: '2024-05-10'
    });
    expect(res.statusCode).toBe(400);
  });

  it('deve falhar se a idade for negativa ou muito alta', async () => {
    const res = await request(app).post('/clientes').send({
      nome: 'Joao',
      sobrenome: 'Silva',
      email: 'joao@teste.com',
      idade: 130,
      produto: 'Óleo',
      descricao: 'Lubrificante automotivo',
      preco: 49.9,
      atualizado: '2024-05-10'
    });
    expect(res.statusCode).toBe(400);
  });

  it('deve falhar se o preço for negativo', async () => {
    const res = await request(app).post('/clientes').send({
      nome: 'Joao',
      sobrenome: 'Silva',
      email: 'joao@teste.com',
      idade: 35,
      produto: 'Óleo',
      descricao: 'Lubrificante automotivo',
      preco: -10,
      atualizado: '2024-05-10'
    });
    expect(res.statusCode).toBe(400);
  });

  it('deve falhar se a data estiver fora do intervalo permitido', async () => {
    const res = await request(app).post('/clientes').send({
      nome: 'Joao',
      sobrenome: 'Silva',
      email: 'joao@teste.com',
      idade: 35,
      produto: 'Óleo',
      descricao: 'Lubrificante automotivo',
      preco: 40,
      atualizado: '1999-12-31'
    });
    expect(res.statusCode).toBe(400);
  });

  it('deve criar cliente com dados válidos', async () => {
    const res = await request(app).post('/clientes').send({
      nome: 'Joao',
      sobrenome: 'Silva',
      email: 'joao@teste.com',
      idade: 35,
      produto: 'Óleo',
      descricao: 'Lubrificante automotivo completo',
      preco: 59.9,
      atualizado: '2024-06-20'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message');
  });
});
