const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.get('/', (req, res) => {
  res.send('Backend is running!');
});


