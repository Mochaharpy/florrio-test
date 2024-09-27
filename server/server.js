const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const session = require('express-session');

const app = express();
dotenv.config();

app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

app.get('/callback', async (req, res) => {
    const code = req.query.code;
    const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

    try {
        const response = await axios.post('https://discord.com/api/oauth2/token', null, {
            params: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
            },
        });

        const accessToken = response.data.access_token;

        // Fetch user info
        const userInfoResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        req.session.user = userInfoResponse.data; // Save user info in session
        res.redirect('/'); // Redirect to your app's main page
    } catch (error) {
        console.error('Error during OAuth process:', error);
        res.status(500).send('Authentication failed');
    }
});

// Endpoint to retrieve user info
app.get('/user', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).send('User not logged in');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
