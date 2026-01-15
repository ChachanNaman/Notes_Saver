#!/bin/bash

# PasteHub Project Startup Script
# This script starts both backend and frontend servers

echo "🚀 Starting PasteHub Project..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the project directory
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/paste-app"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Node.js is installed
if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo -e "${BLUE}📦 Starting Backend Server...${NC}"
cd "$BACKEND_DIR"

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  Warning: .env file not found in backend directory${NC}"
    echo "Please create .env file with MONGODB_URI, JWT_SECRET, and PORT"
    exit 1
fi

# Start backend in background
npm start > /tmp/pastehub-backend.log 2>&1 &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Check if backend started successfully
if ps -p $BACKEND_PID > /dev/null; then
    echo -e "${GREEN}✅ Backend server started (PID: $BACKEND_PID)${NC}"
    echo "   Logs: tail -f /tmp/pastehub-backend.log"
else
    echo -e "${YELLOW}⚠️  Backend might have failed to start. Check logs:${NC}"
    cat /tmp/pastehub-backend.log
    exit 1
fi

echo ""
echo -e "${BLUE}🎨 Starting Frontend Server...${NC}"
cd "$FRONTEND_DIR"

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  Warning: .env file not found in paste-app directory${NC}"
    echo "Creating .env file..."
    echo "VITE_API_URL=http://localhost:5001/api" > .env
fi

# Start frontend in background
npm run dev > /tmp/pastehub-frontend.log 2>&1 &
FRONTEND_PID=$!

# Wait a moment for frontend to start
sleep 5

# Check if frontend started successfully
if ps -p $FRONTEND_PID > /dev/null; then
    echo -e "${GREEN}✅ Frontend server started (PID: $FRONTEND_PID)${NC}"
    echo "   Logs: tail -f /tmp/pastehub-frontend.log"
else
    echo -e "${YELLOW}⚠️  Frontend might have failed to start. Check logs:${NC}"
    cat /tmp/pastehub-frontend.log
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 Both servers are running!${NC}"
echo ""
echo "📝 Server Information:"
echo "   Backend:  http://localhost:5001"
echo "   Frontend: http://localhost:5173"
echo ""
echo "📋 Process IDs (to stop servers later):"
echo "   Backend PID:  $BACKEND_PID"
echo "   Frontend PID: $FRONTEND_PID"
echo ""
echo "🛑 To stop servers, run:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "📊 To view logs:"
echo "   Backend:  tail -f /tmp/pastehub-backend.log"
echo "   Frontend: tail -f /tmp/pastehub-frontend.log"
echo ""
echo "🌐 Open your browser to: http://localhost:5173"
echo ""

# Save PIDs to file for easy stopping
echo "$BACKEND_PID $FRONTEND_PID" > /tmp/pastehub-pids.txt
