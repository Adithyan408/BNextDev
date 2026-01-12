import passport from 'passport';
import { authGoogle, getDomains, getProfile, getStarted, loadLanding, submitOnboarding } from '../../services/user/homeService.js';

export const landing = async(req, res) => {
  await loadLanding(req, res);
};

export const started = async(req, res) => {
  await getStarted(req, res);
};

export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});

export const googleAuthCallback = async (req, res) => {
  await authGoogle(req, res);
};

export const profileGet = async(req, res) => {
  await getProfile(req, res);
};

export const onboarding = async(req, res) => {
  await submitOnboarding(req, res);
};

export const domains = async(req, res) => {
  await getDomains(req, res);
};
