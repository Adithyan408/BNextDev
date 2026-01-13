import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import session from 'express-session';
import { router } from './routes/index.js';
import passport from './config/passport.js';
import { connectDB } from './config/db.js';

export const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (!process.env.SESSION_SECRET) {
  throw new Error('Missing SESSION_SECRET environment variable');
}

await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/user'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);
