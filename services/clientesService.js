const db = require('../configs/db'); // importa o pool

//  Buscar todos os clientes
async function getClientes() {
    const [rows] = await db.execute('SELECT * FROM clientes');
    return rows;
}

//  Buscar um cliente por ID
async function getClienteById(id) {
    const [rows] = await db.execute('SELECT * FROM clientes WHERE id = ?', [id]);
    return rows[0];
}

//  Adicionar um novo cliente
async function addCliente({ nome, email, telefone }) {
    const [result] = await db.execute(
        'INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)',
        [nome, email, telefone]
    );
    return result.insertId;
}

//  Atualizar cliente por ID
async function updateCliente(id, { nome, email, telefone }) {
    const [result] = await db.execute(
        'UPDATE clientes SET nome = ?, email = ?, telefone = ? WHERE id = ?',
        [nome, email, telefone, id]
    );
    return result.affectedRows;
}

//  Deletar cliente por ID
async function deleteCliente(id) {
    const [result] = await db.execute('DELETE FROM clientes WHERE id = ?', [id]);
    return result.affectedRows;
}

module.exports = {
    getClientes,
    getClienteById,
    addCliente,
    updateCliente,
    deleteCliente
};
