const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {

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
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            message: "My AI server is working!"
        }));

        return;
    }

    if (req.method === "POST" && req.url === "/chat") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", async () => {

            try {
                const { message } = JSON.parse(body);

                if (!message) {
                    res.writeHead(400, {
                        "Content-Type": "application/json"
                    });

                    res.end(JSON.stringify({
                        error: "Message is required"
                    }));

                    return;
                }

                const response = await fetch(
                    "https://openrouter.ai/api/v1/chat/completions",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                            "Authorization":
                                `Bearer ${process.env.OPENROUTER_API_KEY}`
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

                if (!response.ok) {
                    throw new Error(JSON.stringify(data));
                }

                const answer =
                    data.choices?.[0]?.message?.content ||
                    "No response.";

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    reply: answer
                }));

            } catch (error) {

                console.error(error);

                res.writeHead(500, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    error: "AI server error"
                }));
            }
        });

        return;
    }

    res.writeHead(404, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
        error: "Not found"
    }));
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`MY AI server running on port ${PORT}`);
});
