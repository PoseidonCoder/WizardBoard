const search = document.getElementById("search");
const users = document.getElementById("users");
let leaderboard;

async function main() {
	const response = await fetch("/api/v1/leaderboard");
	leaderboard = await response.json();

	search.addEventListener("input", filterUsers);
}

function filterUsers() {
	console.log("searching...");
	const regex = new RegExp(search.value, "gi");
	const filtered = leaderboard.filter((user) => regex.test(user.username));

	let place = 0;
	const html = filtered.reduce((html, { username, rank }) => {
		place++;

		return (
			html +
			`
			<div class="user">
				<p class="username">${username}#${place}</p>
				
				<div class="info">
					<p>Rank: ${rank}</p>
				</div>
			</div>
			`
		);
	}, "");

	users.innerHTML = html;
}

main();
