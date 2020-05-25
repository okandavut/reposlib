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
    const [apiLimitError, setApiLimitError] = useState("");
    const events = [];
    useEffect(() => {
        if (props.username != "") {
            async function getUserRepositories(username) {
                let response = await fetch(`https://api.github.com/users/${username}/repos?sort=created&direction=desc`,
                    {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        mode: 'cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: {
                            'Content-Type': 'application/json'

                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        redirect: 'follow', // manual, *follow, error
                        referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    });
                response = await response.json()
                console.log(response);
                if (response.message != "Not Found" && response.message != "API rate limit exceeded for 46.197.236.247. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)") {
                    setRepositories(response)
                }
                else {
                    setApiLimitError(response.message);
                    console.log("No repo found!");
                }
            }
            getUserRepositories(props.username);
        }
        else setRepositories(undefined);
    }, [props.username]);

    return (
        <>
        <center><p>{apiLimitError != "" ? `${apiLimitError}(Try again 1 hour later)` : ""} </p></center>
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
