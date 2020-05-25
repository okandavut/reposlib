import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
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
            if (username != "") {
                let response = await fetch(`https://api.github.com/users/${username}/repos?sort=created&direction=desc`,
                {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                  })
                response = await response.json()
                console.log(response.message);
                if (response.message != "Not Found") {
                    setRepositories(response)
                }
                else {
                    console.log("No repo found!");
                }
            }
            setRepositories(undefined);
        }
        getUserRepositories(props.username);
    }, [props.username]);

    return (
        <>
            <Timeline lineColor={repositories != undefined ? '#ddd' : 'white'}  >
                {repositories != undefined ? repositories.map((repo, i) => {
                    return (<TimelineItem
                        key={i}
                        dateText={formatDate(repo.created_at)}
                        style={{ color: '#e86971' }}>
                        <h3><a href={repo.html_url} target="_blank">{repo.name}</a></h3>
                        <h4>{repo.description}</h4>
                    </TimelineItem>)
                }) : ""}
            </Timeline>
        </>
    );
}

export default hot(TimelineComp);
