#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process for Swasthya Saathi..."

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js and try again."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run tests
echo "🧪 Running tests..."
npm test -- --watchAll=false

# Build the application
echo "🔨 Building the application..."
npm run build

echo "✅ Build completed successfully!"
echo "The build output is located in the 'build' directory."
echo ""
echo "Deployment options:"
echo "1. For Netlify: netlify deploy"
echo "2. For Vercel: vercel"
echo "3. For GitHub Pages: add 'homepage' to package.json and deploy with 'gh-pages'"
echo "4. For Firebase: firebase deploy"
echo ""
echo "Choose a deployment platform and run the appropriate command." 