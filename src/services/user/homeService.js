import passport from 'passport';
import User from '../../models/userSchema.js';

export const loadLanding = async (req, res) => {
  try {
    res.render('landing');
  } catch (error) {
    res.status(500).send(error);
    res.render('notFound');
  }
};

export const getStarted = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      if (req.user.onboarded) {
        return res.redirect('/domains');
      }
      return res.redirect('/profile');
    }

    return res.render('login');

  } catch (error) {
    res.status(500).send(error);
    return res.render('notFound');
  }
};

export const authGoogle = async (req, res) => {
  passport.authenticate('google', { failureRedirect: '/get-started' })(
    req,
    res,
    () => {
      req.session.user = { _id: req.user._id };
      res.redirect('/profile');
    }
  );
};

export const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect('/get-started');
    }

    if (req.user.onboarded) {
      return res.redirect('/domains');
    }

    return res.render('profile', { user: req.user });
  } catch (error) {
    res.status(500).send(error);
    return res.render('notFound');
  }
};

export const submitOnboarding = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect('/get-started');
    }

    const { name, phone, education } = req.body;

    if (!name || name.trim().length < 3) {
      return res.status(400).render('profile', {
        error: 'Invalid name',
        user: req.user
      });
    }

    const phoneRegex = /^[+]?[\d\s()-]{8,15}$/;
    if (!phone || !phoneRegex.test(phone)) {
      return res.status(400).render('profile', {
        error: 'Invalid phone number',
        user: req.user
      });
    }

    if (!education) {
      return res.status(400).render('profile', {
        error: 'Education is required',
        user: req.user
      });
    }

    await User.findByIdAndUpdate(req.user._id, {
      name,
      phone,
      education,
      onboarded: true
    });

    return res.redirect('/domains');
  } catch (err) {
    res.send(err);
    return res.status(500).render('profile', {
      error: 'Something went wrong. Please try again.',
      user: req.user
    });
  }
};

export const getDomains = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect('/get-started');
    }

    if (!req.user.onboarded) {
      return res.redirect('/profile');
    }

    return res.render('domains', {
      user: req.user
    });
  } catch (error) {
    res.send(error);
    return res.status(500).render('notFound');
  }
};
