// Login endpoint
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    // No JWT, just return user info
    res.json({ message: 'Login successful', name: user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
}); 