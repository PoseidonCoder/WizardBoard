const fetch = require("node-fetch");
const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

let leaderboard;

async function leaderboardCache() {
	console.log("updating leaderboard cache...");

	const response = await fetch(
		"https://challenge.codewizardshq.com/api/v1/questions/leaderboard?per=99999"
	);

	leaderboard = (await response.json()).items;
}

leaderboardCache();
setInterval(leaderboardCache, 100000);

app.get("/", async (req, res) => {
	console.log("someone visited!");

	let search;
	if (req.query.q) {
		const regex = new RegExp(req.query.q, "gi");
		search = leaderboard.filter(({ username }) => regex.test(username));
		console.log(search);
	}

	res.render("index", {
		leaderboard: typeof search == "undefined" ? leaderboard : search,
	});
});

app.listen(8080);
