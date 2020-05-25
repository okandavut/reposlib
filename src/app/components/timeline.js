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
            let response = await fetch(`https://api.github.com/users/${username}/repos?sort=created&direction=desc`)
            response = await response.json()
            if (response.message != "Not Found") {
                setRepositories(response)
            }
            else {
                console.log("No repo found!");
            }
        }
        getUserRepositories(props.username);
    }, [props.username]);

    return (
        <>
            <Timeline lineColor={repositories!= undefined ? '#ddd' : 'white'}  >
                {repositories != undefined ? repositories.map((repo, i) => {
                    return (<TimelineItem
                        key={i}
                        dateText={formatDate(repo.created_at)}
                        style={{ color: '#e86971' }}>
                        <h3>{repo.name}</h3>
                        <h4>{repo.description}</h4>
                    </TimelineItem>)
                }) : ""}
            </Timeline>
        </>
    );
}

export default hot(TimelineComp);
