async function getUserRepositories(username) {
  let response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=created&direction=desc&per_page=300`
  );
  response = await response.json();
  return response;
}

export default getUserRepositories;
