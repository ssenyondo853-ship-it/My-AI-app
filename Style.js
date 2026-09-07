* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #0b0d12;
    color: white;
    min-height: 100vh;
}

header {
    height: 65px;
    padding: 0 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #292d36;
    background: #12151c;
}

.logo {
    font-size: 22px;
    font-weight: bold;
}

.status {
    color: #8f96a3;
    font-size: 13px;
}

main {
    width: 100%;
    max-width: 850px;
    margin: auto;
    padding: 20px;
}

#chat-box {
    height: 50vh;
    min-height: 350px;
    background: #151821;
    border: 1px solid #252936;
    border-radius: 16px;
    padding: 20px;
    overflow-y: auto;
}

.welcome {
    text-align: center;
    margin-top: 80px;
    color: #b7bdc9;
}

.ai-icon {
    width: 55px;
    height: 55px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #252936;
    color: #ffd600;
    font-size: 28px;
}

.welcome h2 {
    color: white;
    margin-bottom: 8px;
}

.input-area {
    display: flex;
    gap: 10px;
    margin-top: 15px;
}

#user-input {
    flex: 1;
    padding: 15px;
    border-radius: 12px;
    border: 1px solid #303542;
    background: #151821;
    color: white;
    font-size: 16px;
    outline: none;
}

#user-input:focus {
    border-color: #ffd600;
}

#send-btn {
    width: 55px;
    border: none;
    border-radius: 12px;
    background: #ffd600;
    color: #111;
    font-size: 22px;
    cursor: pointer;
}

.topics {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 15px;
}

.topics button {
    padding: 10px 14px;
    border: 1px solid #303542;
    border-radius: 20px;
    background: #151821;
    color: #dce0e8;
    cursor: pointer;
}

.topics button:hover {
    border-color: #ffd600;
    color: #ffd600;
}

.user {
    text-align: right;
    color: white;
    background: #252936;
    padding: 10px 14px;
    border-radius: 14px;
    margin: 10px 0;
}

.bot {
    color: #ffd600;
    background: #1d2029;
    padding: 10px 14px;
    border-radius: 14px;
    margin: 10px 0;
}

footer {
    text-align: center;
    color: #6f7684;
    font-size: 11px;
    padding: 15px;
}
.logo {
    display: flex;
    align-items: center;
    gap: 10px;
}

.logo img {
    width: 70px;
    height: 70px;
    border-radius: 69%;
    object-fit: cover;
}
