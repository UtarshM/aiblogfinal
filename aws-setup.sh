#!/bin/bash
# AWS EC2 Quick Setup Script
# Run this on your EC2 instance after SSH connection

echo "=========================================="
echo "AI Marketing Platform - AWS Setup Script"
echo "=========================================="

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 22
echo "📦 Installing Node.js 22..."
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node.js
echo "✅ Node.js version: $(node --version)"
echo "✅ NPM version: $(npm --version)"

# Install Git
echo "📦 Installing Git..."
sudo apt install -y git

# Install PM2
echo "📦 Installing PM2..."
sudo npm install -g pm2

# Install Nginx
echo "📦 Installing Nginx..."
sudo apt install -y nginx

# Clone repository
echo "📦 Cloning repository..."
cd ~
git clone https://github.com/harshkuhikar/Ai-Automation.git
cd Ai-Automation/server

# Install dependencies
echo "📦 Installing server dependencies..."
npm install

echo ""
echo "=========================================="
echo "✅ Setup Complete!"
echo "=========================================="
echo ""
echo "NEXT STEPS:"
echo "1. Create .env file: nano .env"
echo "2. Paste your environment variables (from server/.env.aws)"
echo "3. Replace YOUR_EC2_IP with your actual EC2 public IP"
echo "4. Start server: pm2 start server.js --name ai-marketing-api"
echo "5. Save PM2: pm2 save && pm2 startup"
echo ""
echo "Your EC2 Public IP: $(curl -s http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null || echo 'Run: curl http://169.254.169.254/latest/meta-data/public-ipv4')"
echo ""
