const express = require('express');
const path = require('path');
const jsonServer = require('json-server'); // <-- Import json-server

const app = express();
const PORT = process.env.PORT || 8080;

// ==========================================
// 1. JSON Server API Routes
// ==========================================
// Apply default middlewares (logger, CORS, etc.)
app.use(jsonServer.defaults());

// Mount each project's db.json onto a dedicated API path
app.use('/api/music-db', jsonServer.router(path.join(__dirname, 'projects/music-db/db.json')));
app.use('/api/nba', jsonServer.router(path.join(__dirname, 'projects/nba/db.json')));
app.use('/api/the-daily-news', jsonServer.router(path.join(__dirname, 'projects/the-daily-news/db.json')));

// ==========================================
// 2. React Apps Static File Serving
// ==========================================
// Helper function to serve static directories
const serveApp = (route, folderPath, buildFolder = 'dist') => {
    const fullPath = path.join(__dirname, folderPath, buildFolder);
    app.use(route, express.static(fullPath));
    
    // Fallback for client-side routing (React Router) inside the sub-apps
    // FIX: Updated for Express v5 wildcard syntax
    app.get(`${route}/*splat`, (req, res) => {
        res.sendFile(path.join(fullPath, 'index.html'));
    });
};

// Serve the sub-applications
serveApp('/solana-launchpad', '/projects/Solana-Token-Launchpad', 'dist');
serveApp('/solana-faucet', '/projects/Solana-Faucet', 'dist');
serveApp('/advice-app', '/projects/Advice-App', 'dist');
serveApp('/music-db', '/projects/music-db', 'build');
serveApp('/nba', '/projects/nba', 'build');
serveApp('/the-daily-news', '/projects/the-daily-news', 'build');
serveApp('/who-pays-the-bill', '/projects/who-pays-the-bill', 'build');

// Serve the main Showcase app at the root URL
const showcasePath = path.join(__dirname, 'dist');
app.use('/', express.static(showcasePath));

// FIX: Updated global catch-all for Express v5
app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(showcasePath, 'index.html'));
});

// ==========================================
// 3. Start Server
// ==========================================
app.listen(PORT, () => {
    console.log(`Main showcase running on http://localhost:${PORT}`);
    console.log(`Apps available at http://localhost:${PORT}/[app-name]`);
    console.log(`-------------------------------------------------`);
    console.log(`APIs running at:`);
    console.log(` - http://localhost:${PORT}/api/music-db`);
    console.log(` - http://localhost:${PORT}/api/nba`);
    console.log(` - http://localhost:${PORT}/api/the-daily-news`);
});