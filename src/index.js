import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import cors from 'cors';

import { user,  course, student} from './routes';
import HttpError from './utils/http-error';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/user', user);
app.use('/api/student', student);
app.use('/api/course', course);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});


if (process.env.NODE_ENV != 'test') {
    app.listen(PORT, () => console.log(`Running on localhost:${PORT}`));
}


module.exports = app;
