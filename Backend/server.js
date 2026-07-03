const express = require('express');
const cors = require('cors');

const app = express();


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Diary API Running');
});

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const diaryRoutes = require('./routes/diary');
app.use('/diary', diaryRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

