const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

mongoose.connection.once('open', () => {
    try {
        console.log('Database connected')
    } catch (error) {
        console.log(error.message);
    }
});

