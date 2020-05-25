import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import Timeline from 'react-time-line';
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function TimelineComp(props) {
    const [repositories, setRepositories] = useState();
    const events = [];
    useEffect(() => {
        async function getUserRepositories(username) {
            let response = await fetch('https://api.github.com/users/okandavut/repos?sort=created&direction=desc')
            response = await response.json()
            if (response.message != "Not Found") {
                setRepositories(response)
            }
            else {
                alert("No repo found!");
            }
        }
        getUserRepositories(props.username);
    }, []);

    return (
        <>
            <h1>Welcome timeline</h1>
            {repositories != undefined ? repositories.map((repo, i) => {
                events.push({ "ts": repo.created_at, "text": repo.name });
                // return (<p key={i}>{`Repo adı : ${repo.name} ve Repo oluşturulma tarihi :  ${formatDate(repo.created_at)}`} </p>)
            }) : "No repo found!"}
            {repositories != undefined ? <Timeline items={events} /> : ""}
        </>
    );
}

export default hot(TimelineComp);
