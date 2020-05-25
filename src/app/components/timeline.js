import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

const getUserRepositories = async (username) => {
    return fetch('https://api.github.com/users/okandavut/repos')
        .then(response => response.json())
}

function Timeline(props) {
    console.log(props);
    const [repositories, setRepositories] = useState();

    getUserRepositories(props.username).then(({ repositories }) => {
        setRepositories(repositories);
    });
    return (
        <>
            <h1>Welcome timeline</h1>
        Repo : {repositories}
        </>
    );
}

export default hot(Timeline);
