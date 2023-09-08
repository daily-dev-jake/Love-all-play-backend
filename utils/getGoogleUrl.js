function getGoogleOAuthURL() {
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
    // console.log({ options });
    const qs = new URLSearchParams(options);
    // console.log(qs.toString() );

    return `${rootUrl}?${qs.toString()}`;
}
exports.googleAuthURL = getGoogleOAuthURL;