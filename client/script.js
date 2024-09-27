const loginBtn = document.getElementById('login-btn');
const userInfo = document.getElementById('user-info');

loginBtn.addEventListener('click', () => {
    const clientId = 'YOUR_CLIENT_ID'; // Replace with your Discord client ID
    const redirectUri = 'https://yourapp.com/callback'; // Your redirect URI
    const scope = 'identify email';

    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}`;

    const width = 600;
    const height = 800;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);
    
    const popup = window.open(discordAuthUrl, 'Discord Login', `width=${width},height=${height},top=${top},left=${left}`);

    const checkPopupClosed = setInterval(() => {
        if (popup.closed) {
            clearInterval(checkPopupClosed);
            // Optionally refresh user info or state here
        }
    }, 1000);
});
