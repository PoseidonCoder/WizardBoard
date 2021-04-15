const search = document.getElementById("search");
const users = document.getElementById("users");
let leaderboard;

async function main() {
	const response = await fetch("/api/v1/leaderboard");
	leaderboard = await response.json();
	users.innerHTML = renderUsers(leaderboard);

	search.addEventListener("input", filterUsers);
}

function renderUsers(users) {
	let place = 0;
	return users.reduce((html, { username, rank }) => {
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
}

function filterUsers() {
	console.log("searching...");
	const regex = new RegExp(search.value, "gi");
	const filtered = leaderboard.filter((user) => regex.test(user.username));

	let html;
	if (filtered.length == 0) {
		html = "<p>Looks like nothing matched your search...</p>";
	} else {
		html = renderUsers(filtered);
	}

	users.innerHTML = html;
}

main();
