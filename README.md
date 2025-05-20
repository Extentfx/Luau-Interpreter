# Roblox External Interpreter Server

This project is a simple HTTP server that receives messages from Roblox and evaluates basic Lua-like math expressions (or echoes strings). It enables you to offload interpreting logic from Roblox to an external service, perfect for building a remote Lua emulator or math evaluator.

---

## 🧑‍💻 Features

* Receives POST requests from Roblox using `HttpService`
* Evaluates safe math expressions (e.g. `2 + 3 * (4 - 1)`)
* Echoes back non-math strings
* Written in Node.js with Express
* Ready for local testing or public deployment via [ngrok](https://ngrok.com)

---

## 💠 Setup

### 1. Clone or Download

```bash
git clone https://github.com/extentfx/Lua-interpreter-inside-of-roblox/server.js
cd roblox-interpreter-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Server

```bash
node server.js
```

Server will start on `http://localhost:3000`

---

## 🌐 Expose to Roblox (optional)

Roblox can't reach localhost. Use **ngrok** to create a public URL:

```bash
npx ngrok http 3000
```

Use the generated URL in your Roblox script:

```lua
local url = "https://your-ngrok-url.ngrok.io/receive"
```

---

## 🧏🏻‍💻 Roblox Example

```lua
local HttpService = game:GetService("HttpService")

local function sendToServer(expr)
	local url = "https://your-ngrok-url.ngrok.io/receive"
	local body = HttpService:JSONEncode({ message = expr })

	local success, response = pcall(function()
		return HttpService:PostAsync(url, body, Enum.HttpContentType.ApplicationJson)
	end)

	if success then
		local decoded = HttpService:JSONDecode(response)
		print("Server replied:", decoded.reply)
	else
		warn("Request failed:", response)
	end
end

sendToServer("2 + 3 * 4")
sendToServer("Hello, server!")
```

---

## ⚠️ Security Notes

> The current version uses `eval()` to process math. This is acceptable for **controlled inputs**, but **not production-safe**. You should replace it with a custom parser or math library for safety in public environments.

---

## 📄 License

MIT License

---

## 📬 Feedback & Contributions

Issues and pull requests are welcome! Feel free to fork or extend the interpreter logic for your game needs.

Uncopylocked Game: 
