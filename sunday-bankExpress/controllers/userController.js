const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper to read and write to users.json
const readUsers = () => JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const writeUsers = (data) => fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));

// Get all users
exports.getAllUsers = (req, res) => {
  const users = readUsers();
  res.json(users);
};

// Get user by ID
exports.getUserById = (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).json({ error: 'User not found' });
};

// Create or Update User
exports.createOrUpdateUser = (req, res) => {
  const users = readUsers();
  const { id, firstName, lastName, email, password } = req.body;
  let user = users.find(u => u.id === id);
  
  if (user) {
    // Update existing user
    user = { ...user, firstName, lastName, email, password };
    users[users.findIndex(u => u.id === id)] = user;
    res.json({ message: 'User updated', user });
  } else {
    // Create new user
    const newUser = { id: Date.now(), firstName, lastName, email, password, account: { balance: 0 } };
    users.push(newUser);
    res.status(201).json({ message: 'User created', newUser });
  }
  writeUsers(users);
};

// Delete User
exports.deleteUser = (req, res) => {
  const users = readUsers();
  const updatedUsers = users.filter(u => u.id !== parseInt(req.params.id));
  
  if (users.length === updatedUsers.length) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  writeUsers(updatedUsers);
  res.json({ message: 'User deleted' });
};

// Deposit Money
exports.depositMoney = (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  const users = readUsers();
  const user = users.find(u => u.id === parseInt(id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.account.balance += amount;
  writeUsers(users);
  res.json({ message: 'Deposit successful', balance: user.account.balance });
};

// Withdraw Money
exports.withdrawMoney = (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  const users = readUsers();
  const user = users.find(u => u.id === parseInt(id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (user.account.balance < amount) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }

  user.account.balance -= amount;
  writeUsers(users);
  res.json({ message: 'Withdrawal successful', balance: user.account.balance });
};

// Check Account Balance
exports.checkBalance = (req, res) => {
  const { id } = req.params;
  const users = readUsers();
  const user = users.find(u => u.id === parseInt(id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ balance: user.account.balance });
};
