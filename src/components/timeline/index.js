import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import formatDate from "../../utility/dateFormatter";
import CodeIcon from "@material-ui/icons/Code";
import CallSplitIcon from "@material-ui/icons/CallSplit";

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
                  key={i}
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
                    background: repo.fork ? "#810ED0" : "#10CC52",
                    color: "#fff",
                  }}
                  icon={repo.fork ? <CallSplitIcon /> : <CodeIcon />}
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
