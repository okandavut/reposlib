import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { Icon } from "semantic-ui-react";
import formatDate from "../../utility/dateFormatter";

function RepoTimeline(props) {
  const events = [];
  const error = props.apiLimitError != "" ? `${props.apiLimitError}` : "";
  return (
    <>
      <center>
        <p>{error}</p>
      </center>
      <VerticalTimeline>
        {props.repositories
          ? props.repositories.map((repo, i) => {
              return (
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{
                    background: "rgb(33, 150, 243)",
                    color: "black",
                  }}
                  contentArrowStyle={{
                    borderRight: "7px solid  rgb(33, 150, 243)",
                  }}
                  date={formatDate(repo.created_at)}
                  iconStyle={{
                    background: "#10CC52",
                    color: "#fff",
                    padding: "16px 0px 0px 12px",
                  }}
                  icon={<Icon name="code" size="big" />}
                >
                  <h3 className="vertical-timeline-element-title">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      className="repo-text"
                    >
                      {repo.name}
                    </a>
                  </h3>
                  <h4 className="vertical-timeline-element-subtitle"></h4>
                  <p className="repo-text">{repo.description}</p>
                </VerticalTimelineElement>
              );
            })
          : ""}
      </VerticalTimeline>
    </>
  );
}

export default RepoTimeline;
