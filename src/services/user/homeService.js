import User from '../../models/userSchema.js';

export const canLoadLanding = () => {
  return true;
};

export const getStartRedirect = (user) => {
  if (!user) return 'LOGIN';

  if (user.onboarded) return 'DOMAINS';

  return 'PROFILE';
};

export const canAccessProfile = (user) => {
  if (!user) return 'LOGIN';
  if (user.onboarded) return 'DOMAINS';
  return 'PROFILE';
};

export const validateOnboarding = ({ name, phone, education }) => {
  if (!name || name.trim().length < 3) {
    throw new Error('Invalid name');
  }

  const phoneRegex = /^[+]?[\d\s()-]{8,15}$/;
  if (!phone || !phoneRegex.test(phone)) {
    throw new Error('Invalid phone number');
  }

  if (!education) {
    throw new Error('Education is required');
  }
};

export const completeOnboarding = async (userId, data) => {
  return User.findByIdAndUpdate(userId, {
    ...data,
    onboarded: true
  });
};

export const canAccessDomains = (user) => {
  if (!user) return 'LOGIN';
  if (!user.onboarded) return 'PROFILE';
  return 'DOMAINS';
};
