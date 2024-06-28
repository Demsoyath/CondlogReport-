const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const dbConfig = {
    host: 'localhost',
    user: 'demsoyath',
    password: 'teste123',
    database: 'condlogreport'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        throw err;
    }
    console.log('Conectado ao MySQL com sucesso!');
});

app.post('/register', (req, res) => {
    const { name, phone, apartment, block, email, password } = req.body;
    const sql = 'INSERT INTO users (name, phone, apartment, block, email, password) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [name, phone, apartment, block, email, password];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao inserir usuário:', err);
            return res.status(500).json({ message: 'Erro ao criar usuário' });
        }
        console.log('Usuário criado com sucesso!');
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    });
});

app.post('/login', (req, res) => {
    console.log('Received login request:', req.body);

    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const values = [email, password];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Erro ao consultar usuário:', err);
            return res.status(500).json({ message: 'Erro ao realizar login' });
        }
        if (results.length > 0) {
            const user = results[0];
            console.log('Login bem-sucedido!');
            res.status(200).json({ 
                message: 'Login bem-sucedido!', 
                user: {
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                    apartment: user.apartment,
                    block: user.block,
                    email: user.email,
                    password: user.password
                } 
            });
        } else {
            console.log('Email ou senha incorretos!');
            res.status(400).json({ message: 'Email ou senha incorretos!' });
        }
    });
});

app.post('/ocorrencia', (req, res) => {
    const { user_id, assunto } = req.body;
    const sql = 'INSERT INTO ocorrencias (user_id, assunto) VALUES (?, ?)';
    const values = [user_id, assunto];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao inserir ocorrência:', err);
            return res.status(500).json({ success: false, message: 'Erro ao criar ocorrência' });
        }
        console.log('Ocorrência criada com sucesso!');
        res.status(201).json({ success: true, message: 'Ocorrência criada com sucesso!' });
    });
});

app.get('/occurrences', (req, res) => {
    const sql = `
        SELECT o.id, u.name, u.apartment, u.block, o.assunto, o.status 
        FROM ocorrencias o
        JOIN users u ON o.user_id = u.id
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar ocorrências:', err);
            return res.status(500).json({ message: 'Erro ao buscar ocorrências' });
        }
        res.status(200).json(results);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
