import { createConnection } from 'mysql';

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'testdb'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

const userInput = "someUserInput' OR '1'='1"; // Simuliert eine SQL-Injektion

// Unsicherer Code, anfällig für SQL-Injektionen
const query = `SELECT * FROM users WHERE username = '${userInput}'`;

connection.query(query, (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }
  console.log('Query results:', results);
});

connection.end();
