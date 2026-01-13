import passport from 'passport';
import {
  canLoadLanding,
  getStartRedirect,
  canAccessProfile,
  validateOnboarding,
  completeOnboarding,
  canAccessDomains
} from '../../services/user/homeService.js';

export const landing = async (req, res) => {
  try {
    if (canLoadLanding()) {
      return res.render('landing');
    }
  } catch {
    return res.status(500).render('notFound');
  }
};

export const started = async (req, res) => {
  try {
    const result = getStartRedirect(req.user);

    if (result === 'DOMAINS') return res.redirect('/domains');
    if (result === 'PROFILE') return res.redirect('/profile');

    return res.render('login');
  } catch {
    return res.status(500).render('notFound');
  }
};

export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email']
});

export const authGoogle = passport.authenticate('google', {
  failureRedirect: '/get-started'
});

export const authGoogleSuccess = (req, res) => {
  req.session.user = { _id: req.user._id };
  res.redirect('/profile');
};

export const profileGet = async (req, res) => {
  try {
    const result = canAccessProfile(req.user);

    if (result === 'LOGIN') return res.redirect('/get-started');
    if (result === 'DOMAINS') return res.redirect('/domains');

    return res.render('profile', { user: req.user });
  } catch {
    return res.status(500).render('notFound');
  }
};

export const onboarding = async (req, res) => {
  try {
    if (!req.user) return res.redirect('/get-started');

    try {
      validateOnboarding(req.body);
    } catch (err) {
      return res.status(400).render('profile', {
        error: err.message,
        user: req.user
      });
    }

    await completeOnboarding(req.user._id, req.body);
    return res.redirect('/domains');
  } catch {
    return res.status(500).render('profile', {
      error: 'Something went wrong',
      user: req.user
    });
  }
};

export const domains = async (req, res) => {
  try {
    const result = canAccessDomains(req.user);

    if (result === 'LOGIN') return res.redirect('/get-started');
    if (result === 'PROFILE') return res.redirect('/profile');

    return res.render('domains', { user: req.user });
  } catch {
    return res.status(500).render('notFound');
  }
};
