#!/bin/bash

# PasteHub Project Stop Script
# This script stops both backend and frontend servers

echo "🛑 Stopping PasteHub Project..."
echo ""

# Check if PIDs file exists
if [ -f /tmp/pastehub-pids.txt ]; then
    PIDS=$(cat /tmp/pastehub-pids.txt)
    kill $PIDS 2>/dev/null
    rm /tmp/pastehub-pids.txt
    echo "✅ Servers stopped"
else
    echo "⚠️  No running servers found (or PIDs file missing)"
    echo "Trying to find and kill processes manually..."
    
    # Kill backend (port 5001)
    lsof -ti:5001 | xargs kill -9 2>/dev/null
    
    # Kill frontend (port 5173)
    lsof -ti:5173 | xargs kill -9 2>/dev/null
    
    echo "✅ Attempted to stop servers on ports 5001 and 5173"
fi

echo ""
echo "🧹 Cleaning up log files..."
rm -f /tmp/pastehub-backend.log /tmp/pastehub-frontend.log

echo "✅ Done!"
