require('dotenv').config()
const express = require('express')
const mysql = require('mysql2')


const app = express()
const port = 3000

// Middleware pour parser le JSON dans les requêtes POST
app.use(express.json())

// Connexion à la base de données MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return;
    }
    console.log('Connecté à la base de donnée MySQL');
})

// Route GET /items - Récupère tous les objets
app.get('/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message})
        }
        res.json(results)
    })
})

app.post('/items', (req, res) => {
    const { name, price } = req.body

    if (!name || !price) {
        return res.status(400).json({ error: 'Le nom et le prix sont requis'})
    }

    db.query('INSERT INTO items (name, price) VALUES (?, ?)', [name, price], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.json({ message: 'Objet ajouté', id: result.insertID })
    })
})

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
    
})