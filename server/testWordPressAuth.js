/**
 * Test WordPress Authentication
 * Run this to test your WordPress credentials directly
 */

import axios from 'axios';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function testWordPressAuth() {
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('  WordPress Authentication Tester');
    console.log('═══════════════════════════════════════════════════════════\n');

    const siteUrl = await question('WordPress URL: ');
    const username = await question('Username: ');
    const password = await question('Application Password: ');

    console.log('\n📝 Testing with:');
    console.log('  URL:', siteUrl);
    console.log('  Username:', username);
    console.log('  Password length:', password.length);
    console.log('  Password has spaces:', password.includes(' '));

    try {
        console.log('\n🔍 Step 1: Checking if WordPress REST API is accessible...');
        const apiCheck = await axios.get(`${siteUrl}/wp-json/`, { timeout: 10000 });
        console.log('✅ REST API is accessible!');
        console.log('   Site name:', apiCheck.data.name);
        console.log('   Description:', apiCheck.data.description);

        console.log('\n🔍 Step 2: Testing authentication...');
        const auth = Buffer.from(`${username}:${password}`).toString('base64');
        console.log('   Auth header (first 30 chars):', auth.substring(0, 30) + '...');

        const authCheck = await axios.get(`${siteUrl}/wp-json/wp/v2/users/me`, {
            headers: {
                'Authorization': `Basic ${auth}`
            },
            timeout: 10000
        });

        console.log('\n✅ ✅ ✅ AUTHENTICATION SUCCESSFUL! ✅ ✅ ✅');
        console.log('\n👤 Logged in as:');
        console.log('   Name:', authCheck.data.name);
        console.log('   Username:', authCheck.data.slug);
        console.log('   Email:', authCheck.data.email);
        console.log('   Role:', authCheck.data.roles?.join(', '));
        console.log('\n🎉 Your credentials are CORRECT!');
        console.log('   You can use these in the app.');

    } catch (error) {
        console.log('\n❌ ❌ ❌ AUTHENTICATION FAILED! ❌ ❌ ❌');
        
        if (error.code === 'ENOTFOUND') {
            console.log('\n🔴 Error: Site not found');
            console.log('   The URL is incorrect or the site is offline.');
            console.log('   Check: Is the URL correct?');
        } else if (error.code === 'ETIMEDOUT') {
            console.log('\n🔴 Error: Connection timeout');
            console.log('   The site is not responding.');
            console.log('   Check: Is the site online?');
        } else if (error.response) {
            console.log('\n🔴 HTTP Error:', error.response.status, error.response.statusText);
            console.log('   Message:', error.response.data?.message || 'No message');
            
            if (error.response.status === 401) {
                console.log('\n💡 This means:');
                console.log('   ❌ Username is wrong');
                console.log('   ❌ Application password is wrong');
                console.log('   ❌ Application password is expired');
                console.log('\n📝 What to do:');
                console.log('   1. Check username is correct (not email!)');
                console.log('   2. Generate NEW application password');
                console.log('   3. Copy password with ALL spaces');
                console.log('   4. Try again');
            } else if (error.response.status === 403) {
                console.log('\n💡 This means:');
                console.log('   ❌ You don\'t have permission');
                console.log('   ❌ Application passwords might be disabled');
                console.log('\n📝 What to do:');
                console.log('   1. Check if you\'re an Administrator');
                console.log('   2. Check if Application Passwords are enabled');
                console.log('   3. Contact hosting provider');
            }
        } else {
            console.log('\n🔴 Error:', error.message);
        }
    }

    rl.close();
}

testWordPressAuth();
