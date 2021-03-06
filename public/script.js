const search = document.getElementById("search");
const users = document.getElementById("users");
search.focus();

let leaderboard;

async function main() {
	const response = await fetch("/api/v1/leaderboard");
	leaderboard = await response.json();
	users.innerHTML = renderUsers(leaderboard);

	search.addEventListener("keyup", filterUsers);
}

function renderUsers(users) {
	return users.reduce((html, { username, rank, place }) => {
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
	console.time("search");

	const worker = new Worker("./filter.js");
	worker.postMessage({
		query: search.value,
		leaderboard,
	});

	worker.onmessage = ({ data: filtered }) => {
		users.innerHTML =
			filtered.length == 0
				? "<p>Looks like nothing matched your search...</p>"
				: `<p id="resultsAmount">${filtered.length} results</p>` +
				  renderUsers(filtered);

		console.timeEnd("search");
	};
}

main();
