import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    profileImage: {
      type: String,
      default: null
    },
    education: {
      type: String,
      enum: [
        'high_school',
        'diploma',
        'undergraduate',
        'postgraduate',
        'self_taught'
      ]
    },
    phone: {
      type: String,
      required: false,
      unique: false,
      sparse: false,
      default: null
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    selectedDomains: [
      {
        type: String
      }
    ],
    onboarded: {
      type: Boolean,
      default: false,
      index: true
    }

  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
