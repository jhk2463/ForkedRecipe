# ForkedRecipe
A website to create, share, and search for recipes. Connected to the spoonacular API for recipes. Connected to a backend for user-created recipes. 
<br>
Link: https://forkedrecipe.netlify.app/ (May take up to a minute for backend server to load up)
<br>
Use test account if you wish:
<br>
Email: test@gmail.com
<br>
Password: test123

## Major Takeaways
- Implemented authentication using an access token and refresh token. Refresh token is sent to client as an http-only cookie for slightly more security. Refresh token can be used to replace an expired access token.
- Implemented google sign in with OAuth 2.0.
- Used axios interceptors to attach access tokens to request headers.
