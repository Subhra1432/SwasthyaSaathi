# Swasthya Saathi

A comprehensive health management system designed to support rural health workers and community health initiatives.

## Features

- Multi-language support (English, Hindi, Assamese, Manipuri)
- Dashboard with key metrics and activities
- User authentication and role-based access
- Patient management
- Inventory tracking
- Event scheduling

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd swasthya-saathi
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

The application will be available at http://localhost:3000.

## Deployment

### Option 1: Firebase Hosting

1. Install Firebase CLI (if not already installed)
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase
   ```bash
   firebase login
   ```

3. Initialize Firebase (if not already initialized)
   ```bash
   firebase init
   ```
   - Select "Hosting"
   - Select your Firebase project
   - Set "build" as your public directory
   - Configure as a single-page app

4. Deploy
   ```bash
   npm run deploy
   ```

### Option 2: Netlify

1. Install Netlify CLI (if not already installed)
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify
   ```bash
   netlify login
   ```

3. Deploy
   ```bash
   npm run deploy:netlify
   ```

### Option 3: Manual Deployment

1. Build the application
   ```bash
   npm run build
   ```

2. The build output will be in the `build` directory. Upload these files to your web server or hosting service.

## Automated Deployment with GitHub Actions

This project is configured with GitHub Actions for automated deployment. When you push changes to the main branch, the application will be automatically built and deployed to your chosen platform.

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
REACT_APP_API_URL=your_api_url
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
