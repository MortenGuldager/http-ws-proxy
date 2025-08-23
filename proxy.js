import express from "express";
import { WebSocketServer } from "ws";

const app = express();
app.use(express.json());

// store mapping between secrets and ws clients
const clients = new Map();

// WebSocket server
const wss = new WebSocketServer({ port: 8081 });

wss.on("connection", (ws, req) => {
    const params = new URLSearchParams(req.url.split("?")[1]);
    const secret = params.get("secret");

    if (!secret) {
        console.log("WS connection rejected: no secret");
        ws.close();
        return;
    }

    clients.set(secret, ws);

    ws.on("close", () => {
        clients.delete(secret);
        console.log("WS disconnected:", secret);
    });
});

// HTTP POST endpoint
app.post("/push", (req, res) => {
    const secret = req.headers["authorization"];
    const data = req.body;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const ws = clients.get(secret);

    if (ws && ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify(data));
        res.json({ ok: true });
    } else {
        res.status(404).json({ error: "No active WS for secret" });
    }
});

app.listen(8080, () => {
    console.log("HTTP listening on 8080, WS on 8081");
});
