import React, { useState, useEffect } from "react";
// import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";
import formatDate from "../../utility/dateFormatter";

function RepoTimeline(props) {
  const events = [];

  return (
    <>
      <center>
        <p>{props.apiLimitError != "" ? `${props.apiLimitError}` : ""}</p>
      </center>
      {props.repositories != undefined
        ? props.repositories.map((repo, i) => {
            return (
              <React.Fragment>
                <h3>
                  <a href={repo.html_url} target="_blank">
                    {repo.name}
                  </a>
                </h3>
                <h4>{repo.description}</h4>
              </React.Fragment>
            );
          })
        : ""}
    </>
  );
}

export default RepoTimeline;
