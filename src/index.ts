import express from 'express';
import morgan from 'morgan';
import { connectDB } from './config';
import { auth, post } from './routes';

const app = express();
const PORT = 5001;

app.set('port', process.env.PORT || PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api/auth/', auth);
app.use('/api/posts/', post);

connectDB();

app.listen(app.get('port'), () => {
  console.log(`Server is listening on http://localhost:${app.get('port')}`);
});
