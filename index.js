const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json()); // Permite procesar datos en formato JSON

// 1. Conexión Segura a MySQL (XAMPP)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Vacío por defecto en XAMPP
    database: 'clase_semana9' // <-- Asegúrate de que coincida con el nombre de tu BD
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a MySQL:', err);
        return;
    }
    console.log('Conectado exitosamente a la Base de Datos en XAMPP');
});

// 2. OPERACIONES CRUD (Consultas preparadas con "?" para prevenir Inyección SQL)

// [POST] - CREAR CLIENTE
app.post('/clientes', (req, res) => {
    const { nombre, email, telefono } = req.body;
    const query = 'INSERT INTO cliente (nombre, email, telefono, created_at) VALUES (?, ?, ?, NOW())';

    db.query(query, [nombre, email, telefono], (err, result) => {
        if (err) {
            // Manejo específico del error 409 Conflict (Email duplicado)
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Conflict: El correo electrónico ya existe.' });
            }
            return res.status(500).json({ error: 'Error interno en el servidor.' });
        }
        res.status(201).json({ message: 'Cliente registrado con éxito', id: result.insertId });
    });
});

// [GET] - OBTENER TODOS LOS CLIENTES
app.get('/clientes', (req, res) => {
    const query = 'SELECT * FROM cliente';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener los clientes.' });
        res.status(200).json(results);
    });
});

// [GET BY ID] - OBTENER UN CLIENTE ESPECÍFICO
app.get('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM cliente WHERE id_cliente = ?';

    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en el servidor.' });
        if (results.length === 0) return res.status(404).json({ error: 'Cliente no encontrado.' });
        res.status(200).json(results[0]);
    });
});

// [PUT] - ACTUALIZAR CLIENTE
app.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, email, telefono } = req.body;
    const query = 'UPDATE cliente SET nombre = ?, email = ?, telefono = ? WHERE id_cliente = ?';

    db.query(query, [nombre, email, telefono, id], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Conflict: El correo ya pertenece a otro cliente.' });
            }
            return res.status(500).json({ error: 'Error al actualizar.' });
        }
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Cliente no encontrado.' });
        res.status(200).json({ message: 'Cliente actualizado correctamente.' });
    });
});

// [DELETE] - ELIMINAR CLIENTE
app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM cliente WHERE id_cliente = ?';

    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar cliente.' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Cliente no encontrado.' });
        res.status(200).json({ message: 'Cliente eliminado con éxito.' });
    });
});

// Inicializar Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});