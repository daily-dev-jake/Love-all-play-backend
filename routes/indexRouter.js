const router = require('express').Router();

function generateHTML() {
    
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Server Page</title>
    </head>
    <body>
        <h1>Welcome to the Server Page</h1>
        
    </body>
    </html>
  `;
}


router.get("/", function(req, res, next) {
  const htmlContent = generateHTML();
  res.send(htmlContent);
});

module.exports = router;