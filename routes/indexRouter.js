const router = require('express').Router();
// const googleAuthURL = require('../utils/getGoogleUrl');



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
          
          <button id="executeFunction">Execute Function</button>
  
          <script>
              
              function executeFunction() {
                const rootUrl = "http://accounts.google.com/o/auth2/v2/auth";
            
                const options = {
                    redirect_url: process.env.GOOGLE_CLIENT_REDIRECTURL,
                    client_id: process.env.GOOGLE_CLIENT_ID,
                    access_type: "offline",
                    response_type: "code",
                    prompt: "consent",
                    scope: [
                        "https://www.googleapis.com/auth/userinfo.profile",
                        "https://www.googleapis.com/auth/userinfo.email",
                    ].join(" "),
                };
                const qs = new URLSearchParams(options);
                console.log(qs.toString());
                return \`\${rootUrl}?\${qs.toString()}\`;
              };
  
              document.getElementById('executeFunction').addEventListener('click', getGoogleOAuthURL);
          </script>
      </body>
      </html>
    `;
  }


router.get("/", function(req, res, next) {
    const htmlContent = generateHTML();
    res.send(htmlContent);
});

module.exports = router;
