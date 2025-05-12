const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Use your MongoDB URL
const MONGO_URL = 'mongodb+srv://abinbabu:D3H3Ky3acSNPoYAJ@cluster0.imkyxia.mongodb.net/LeaveManagement?retryWrites=true&w=majority';

// Define enums
const UserRole = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
};

const Gender = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
};

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  role: { type: String, enum: Object.values(UserRole), required: true },
  gender: { type: String, enum: Object.values(Gender), required: true },
  otp: { type: String },
  otpExpiry: { type: Date },
  isApproved: { type: Boolean, default: false },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

async function seedAdmin() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('✅ Connected to MongoDB');

    const existing = await User.findOne({ email: 'atomica@gmail.com' });
    if (existing) {
      console.log('⚠️ Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('Secure@123', 10);

    const adminUser = new User({
      name: 'Admin Atomica',
      email: 'atomica@gmail.com',
      passwordHash: hashedPassword,
      role: UserRole.ADMIN,
      gender: Gender.OTHER,
      isApproved: true,
    });

    await adminUser.save();
    console.log('🎉 Admin seeded successfully');
  } catch (err) {
    console.error('❌ Error seeding admin:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
  }
}

seedAdmin();
