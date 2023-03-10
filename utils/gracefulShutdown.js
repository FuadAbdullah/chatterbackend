module.exports = function (server) {
    console.log('Shutting down gracefully...');
    server.close(() => {
        console.log('Server has been closed.');
        process.exit(0);
    });

    // Shuts down the server after 10 seconds by force
    setTimeout(() => {
        console.error('Force closing server after 10 seconds.');
        process.exit(1);
    }, 10000);
}

