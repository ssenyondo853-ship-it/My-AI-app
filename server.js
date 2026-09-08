const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });
        res.end("MY AI server is working");
        return;
    }

    if (req.method === "POST" && req.url === "/api/chat") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", async () => {
            try {
                const { message } = JSON.parse(body);

                console.log("User message:", message);

                const response = await fetch(
                    "https://openrouter.ai/api/v1/chat/completions",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
                        },
                        body: JSON.stringify({
                            model: "openai/gpt-4o-mini",
                            messages: [
                                {
                                    role: "user",
                                    content: message
                                }
                            ]
                        })
                    }
                );

                const data = await response.json();

                console.log("OpenRouter status:", response.status);
                console.log("OpenRouter response:", data);

                if (!response.ok) {
                    res.writeHead(500, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        reply: "OpenRouter error: " +
                            (data.error?.message || "Unknown error")
                    }));

                    return;
                }

                const reply = data.choices[0].message.content;

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    reply: reply
                }));

            } catch (error) {
                console.log("SERVER ERROR:", error);

                res.writeHead(500, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    reply: "Server error: " + error.message
                }));
            }
        });

        return;
    }

    res.writeHead(404, {
        "Content-Type": "text/plain"
    });

    res.end("Not found");
});

server.listen(PORT, () => {
    console.log("MY AI server running on port " + PORT);
});
