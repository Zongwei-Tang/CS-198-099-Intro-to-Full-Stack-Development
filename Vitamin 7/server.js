const express = require('express');
const app = express();
const mysql = require('mysql2');
const mongoose = require('mongoose');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'America0704',
    database: 'company_db'
});

function verifyMySQLConnection() {
    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting to MySQL: ' + err.stack);
            return;
        }
        console.log('MySQL connected as id ' + connection.threadId);
    });
}

mongoose.connect('mongodb://localhost:27017/companyDB');

const ProjectSchema = new mongoose.Schema({
    name: String,
    budget: Number
});

const ProjectModel = mongoose.model('projects', ProjectSchema);

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

app.get('/projects', async (req, res) => {
    try {
        const projects = await ProjectModel.find({});
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get('/employees', function (req, res) {
    connection.query('SELECT * FROM employees', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

app.listen(3000, function () {
    console.log('Server is running on port 3000!');
    verifyMySQLConnection();
});