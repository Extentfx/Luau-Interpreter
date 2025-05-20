const express = require('express');
const { lua, lauxlib, lualib } = require('fengari');
const { to_luastring } = require('fengari/src/fengaricore');

const app = express();
app.use(express.json());

app.post('/receive', (req, res) => {
	const code = req.body.code;

	if (typeof code !== "string") {
		return res.status(400).send("❌ Invalid input: expected string");
	}

	console.log("🔁 Running Lua code:", code);

	const L = lauxlib.luaL_newstate();
	lualib.luaL_openlibs(L);

	const status = lauxlib.luaL_dostring(L, to_luastring(code));

	if (status === lua.LUA_OK) {
		const result = lua.lua_tojsstring(L, -1);
		console.log("✅ Result:", result);
		res.send(result ?? "[no result]");
	} else {
		const err = lua.lua_tojsstring(L, -1);
		console.error("❌ Lua error:", err);
		res.status(500).send("❌ Lua error: " + err);
	}
});

app.listen(3000, () => {
	console.log("✅ Lua interpreter server listening on port 3000");
});
