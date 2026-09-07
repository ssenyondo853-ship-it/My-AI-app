const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatBox = document.getElementById("chat-box");

function addMessage(text, type) {
    const message = document.createElement("div");
    message.className = "message " + type;
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    addMessage("Thinking...", "bot");

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        const messages = document.querySelectorAll(".bot");
        const lastBot = messages[messages.length - 1];

        if (data.reply) {
            lastBot.textContent = data.reply;
        } else if (data.message) {
            lastBot.textContent = data.message;
        } else {
            lastBot.textContent = "Sorry, I could not get a response.";
        }

    } catch (error) {
        const messages = document.querySelectorAll(".bot");
        const lastBot = messages[messages.length - 1];

        lastBot.textContent =
            "Connection error. Check whether your AI backend/server is running.";
        
        console.error(error);
    }
}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
