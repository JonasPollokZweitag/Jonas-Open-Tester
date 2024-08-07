import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Simulierte Benutzerdatenbank
const users = {
  'user1': { password: 'password1', balance: 1000 },
  'user2': { password: 'password2', balance: 2000 }
};

// Simulierte Authentifizierung
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username].password === password) {
    res.cookie('session', username, { httpOnly: true });
    res.send('Login successful');
  } else {
    res.send('Invalid credentials');
  }
});

// Unsichere Überweisung, anfällig für CSRF
app.post('/transfer', (req, res) => {
  const { to, amount } = req.body;
  const from = req.cookies.session;

  if (users[from] && users[to]) {
    users[from].balance -= parseInt(amount);
    users[to].balance += parseInt(amount);
    res.send(`Transferred ${amount} from ${from} to ${to}`);
  } else {
    res.send('Invalid transfer');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
