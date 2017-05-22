const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: { type: String },
  password: { type: String },
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  passwordField: 'password',
  usernameLowerCase: true,
  selectFields: 'name email',
});

module.exports = mongoose.model('User', userSchema);
