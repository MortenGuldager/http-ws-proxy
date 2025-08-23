# http-ws-proxy

A lightweight Node.js proxy that receives **HTTP POST requests** and forwards payloads to connected **WebSocket clients**.  
Designed for scenarios where you want to push data *into* a protected network without opening inbound ports – the client behind the firewall keeps an outbound WebSocket connection open.

---

## Features

- Accepts `POST /push` with JSON payload
- Secret-based routing: only clients with the correct secret receive data
- Secret passed in HTTP header (`authorization`)
- Supports multiple concurrent WebSocket clients
- Very small codebase (~50 lines of Node.js)
- Ready for Docker + Traefik/Let's Encrypt for TLS

---

## Test

listen:
```
websocat ws://px.example.com:8081/ws?secret=abc123
```

send:
```
curl -X POST https://px.example.com/push   \
  -H "Content-Type: application/json"    \
  -H "authorization: abc123"   \
  -d '{"msg":"HELL-O from curl"}'

```

## Author
**Morten Guldager**

## License
This project is licensed under the [WTFPL v2](http://www.wtfpl.net/) – see the [LICENSE](./LICENSE) file for details.


 