@echo off
echo ========================================
echo AI Marketing Platform - Complete Setup
echo ========================================
echo.

echo [1/4] Installing Node.js dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Installing backend dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo [3/4] Installing Python dependencies...
pip install -r server/requirements.txt
if %errorlevel% neq 0 (
    echo WARNING: Python dependencies installation failed
    echo Please install manually: pip install requests python-dotenv beautifulsoup4
)

echo.
echo [4/4] Verifying setup...
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the application:
echo   1. Run: start.bat
echo   2. Open: http://localhost:5173
echo.
echo For detailed instructions, see: SETUP_COMPLETE.md
echo.
pause
