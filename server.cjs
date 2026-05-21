const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

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

// 1. Serve the sub-applications
// Note: CRA uses 'build', Vite uses 'dist'
serveApp('/solana-launchpad', '/projects/Solana-Token-Launchpad', 'dist');
serveApp('/solana-faucet', '/projects/Solana-Faucet', 'dist');
serveApp('/advice-app', '/projects/Advice-App', 'dist');
serveApp('/music-db', '/projects/music-db', 'build');
serveApp('/nba', '/projects/nba', 'build');
serveApp('/the-daily-news', '/projects/the-daily-news', 'build');
serveApp('/who-pays-the-bill', '/projects/who-pays-the-bill', 'build');

// 2. Serve the main Showcase app at the root URL
const showcasePath = path.join(__dirname, 'dist');
app.use('/', express.static(showcasePath));

// FIX: Updated global catch-all for Express v5
app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(showcasePath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Main showcase running on http://localhost:${PORT}`);
    console.log(`Apps available at http://localhost:${PORT}/[app-name]`);
});