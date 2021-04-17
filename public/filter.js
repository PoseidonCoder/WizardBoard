onmessage = ({ data: { leaderboard, query } }) => {
	const regex = new RegExp(query, "gi");
	const filtered = leaderboard.filter((user) => regex.test(user.username));
	postMessage(filtered);
};
