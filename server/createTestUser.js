/**
 * Create Test User Script
 * Run this to create a test account
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User } from './authModels.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'your-mongodb-uri';

async function createTestUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Test user credentials
        const testEmail = 'test@example.com';
        const testPassword = 'Test123456';
        const testName = 'Test User';

        // Check if user already exists
        const existing = await User.findOne({ email: testEmail });
        if (existing) {
            console.log('⚠️  Test user already exists');
            console.log('\n📧 Login Credentials:');
            console.log('Email:', testEmail);
            console.log('Password:', testPassword);
            await mongoose.disconnect();
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(testPassword, 10);

        // Create user
        const user = new User({
            name: testName,
            email: testEmail,
            password: hashedPassword,
            isVerified: true, // Skip email verification for test user
            createdAt: new Date()
        });

        await user.save();

        console.log('✅ Test user created successfully!');
        console.log('\n📧 Login Credentials:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Email:    ', testEmail);
        console.log('Password: ', testPassword);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\n🌐 Login at: http://localhost:5173/login');

        await mongoose.disconnect();
        console.log('\n✅ Done!');
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

createTestUser();
