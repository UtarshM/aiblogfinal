@echo off
echo ========================================
echo AI Marketing Platform - Starting...
echo (c) 2025 Scalezix Venture PVT LTD
echo ========================================
echo.

echo Checking dependencies...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo [1/3] Installing frontend dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Frontend dependencies installation failed
        echo Please run: npm install
        pause
        exit /b 1
    )
) else (
    echo [1/3] Frontend dependencies OK
)

echo.

REM Check if server/node_modules exists
if not exist "server\node_modules" (
    echo [2/3] Installing backend dependencies...
    cd server
    call npm install
    if errorlevel 1 (
        echo ERROR: Backend dependencies installation failed
        echo Please run: cd server && npm install
        cd ..
        pause
        exit /b 1
    )
    cd ..
) else (
    echo [2/3] Backend dependencies OK
)

echo.
echo [3/3] Starting servers...
echo.
echo ========================================
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo ========================================
echo.
echo Starting backend server...
start "AI Marketing - Backend" cmd /k "cd server && npm start"

echo Waiting for backend to initialize...
timeout /t 5 /nobreak > nul

echo Starting frontend server...
start "AI Marketing - Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo Servers are starting!
echo ========================================
echo.
echo Please wait 10-15 seconds for servers to be ready
echo Then open: http://localhost:5173
echo.
echo To stop servers: Close both terminal windows
echo.
echo For help, see: SETUP_COMPLETE.md
echo.
pause
