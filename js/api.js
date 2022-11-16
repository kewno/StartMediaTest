async function getUserData(url = '') {
	const response = await fetch(url);
	return response.json();
}