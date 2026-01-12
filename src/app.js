import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import { connectDB } from './config/db.js';
import { router } from './routes/user/userRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
import './config/passport.js';
connectDB();

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
app.set('views', [
  path.join(__dirname, 'views/user')
//   path.join(__dirname, "views/admin"),
]);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);
// app.use("/admin", adminRouter);

export default app;
