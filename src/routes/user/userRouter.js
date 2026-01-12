import express from 'express';
import { domains, googleAuth, googleAuthCallback, landing, onboarding, profileGet, started } from '../../controllers/user/homeController.js';
import { isAuth } from '../../middlewares/isAuth.js';

export const router = express.Router();
router.get('/', landing);
router.get('/get-started', started);
router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleAuthCallback);
router.get('/profile', profileGet);
router.post('/profile',isAuth, onboarding);
router.get('/domains', domains);
