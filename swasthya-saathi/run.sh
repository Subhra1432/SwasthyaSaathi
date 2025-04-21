#!/bin/bash

# Exit on error
set -e

# Define color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Display a menu for the user to choose an option
echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}      Swasthya Saathi Launcher       ${NC}"
echo -e "${BLUE}======================================${NC}"
echo ""
echo "Choose an option:"
echo ""
echo -e "  ${GREEN}1)${NC} Start Development Server (Normal)"
echo -e "  ${GREEN}2)${NC} Start Development Server (High Memory)"
echo -e "  ${GREEN}3)${NC} Build for Production (Normal)"
echo -e "  ${GREEN}4)${NC} Build for Production (High Memory)"
echo -e "  ${GREEN}5)${NC} Deploy to Firebase"
echo -e "  ${GREEN}6)${NC} Deploy to Netlify"
echo -e "  ${GREEN}7)${NC} Run Tests"
echo -e "  ${GREEN}8)${NC} Exit"
echo ""
echo -n "Enter your choice (1-8): "
read choice

case $choice in
    1)
        echo -e "${GREEN}Starting development server...${NC}"
        npm start
        ;;
    2)
        echo -e "${GREEN}Starting development server with increased memory...${NC}"
        echo -e "${YELLOW}This option allocates 8GB RAM to Node.js${NC}"
        npm run start:high-memory
        ;;
    3)
        echo -e "${GREEN}Building for production...${NC}"
        npm run build
        echo -e "${YELLOW}Build completed. Output is in the build/ directory.${NC}"
        ;;
    4)
        echo -e "${GREEN}Building for production with increased memory...${NC}"
        echo -e "${YELLOW}This option allocates 8GB RAM to Node.js${NC}"
        npm run build:high-memory
        echo -e "${YELLOW}Build completed. Output is in the build/ directory.${NC}"
        ;;
    5)
        echo -e "${GREEN}Deploying to Firebase...${NC}"
        echo -e "${YELLOW}Checking if Firebase CLI is installed...${NC}"
        if ! command -v firebase &> /dev/null; then
            echo -e "${RED}Firebase CLI not found. Installing...${NC}"
            npm install -g firebase-tools
        fi
        
        echo -e "${YELLOW}Please log in to Firebase (if not already logged in):${NC}"
        firebase login
        
        echo -e "${GREEN}Deploying...${NC}"
        npm run deploy
        ;;
    6)
        echo -e "${GREEN}Deploying to Netlify...${NC}"
        echo -e "${YELLOW}Checking if Netlify CLI is installed...${NC}"
        if ! command -v netlify &> /dev/null; then
            echo -e "${RED}Netlify CLI not found. Installing...${NC}"
            npm install -g netlify-cli
        fi
        
        echo -e "${YELLOW}Please log in to Netlify (if not already logged in):${NC}"
        netlify login
        
        echo -e "${GREEN}Deploying...${NC}"
        npm run deploy:netlify
        ;;
    7)
        echo -e "${GREEN}Running tests...${NC}"
        npm test
        ;;
    8)
        echo -e "${BLUE}Goodbye!${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}Invalid choice. Please run the script again.${NC}"
        exit 1
        ;;
esac

echo -e "${GREEN}Done!${NC}" 