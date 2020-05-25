export const getUserRepositories = async (username) => {
    return fetch(`https://api.github.com/users/okandavutcom/repos`)
        .then((response) => response.json())
        .catch((error) => alert(error));
}