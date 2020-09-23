async function getUserRepositories(username) {
  let response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=created&direction=desc`
  );
  response = await response.json();
  return response;
}

export default getUserRepositories;
