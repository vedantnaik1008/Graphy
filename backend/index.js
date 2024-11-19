const express = require('express');
const ZoomRoutes = require('./routes/zoomRoutes.js');
const app = express();

const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const port = 30010;
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.use('/api/zoom', ZoomRoutes);

app.use((req, res, next) => {
    res.send('Welcome to Express');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
