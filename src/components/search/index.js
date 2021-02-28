import React, { useState, useEffect } from "react";
import RepoTimeline from "../timeline/";
import styled from "styled-components";
import {
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { TwitterShareButton, TwitterIcon } from "react-share";

import getUserRepositories from "../../api/";
import Link from "next/link";

function Search() {
  const title = "Checkout my Github repository timeline";

  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState();
  const [apiLimitError, setApiLimitError] = useState("");
  const [shareUrl, setShareUrl] = useState("");

  const enterPressed = (event) => {
    setApiLimitError("");

    let code = event.keyCode || event.which;

    if (code === 13 || event.button == 0) {
      if (username) {
        async function getRepositories() {
          let repositoriesResponse = await getUserRepositories(username);

          !repositoriesResponse.message
            ? setRepositories(repositoriesResponse)
            : setApiLimitError(repositoriesResponse.message);
        }
        getRepositories();
      } else setRepositories(undefined);
    }
  };

  useEffect(() => {
    setShareUrl("https://reposlib.vercel.app/" + username);
  }, [username]);

  const styledInput = (
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder="Username"
        aria-label="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        onKeyPress={enterPressed.bind(this)}
      />
      <Button
        type="button"
        onClick={enterPressed.bind(this)}
        className="search-button"
      >
        Search
      </Button>
    </InputGroup>
  );

  return (
    <>
      <Container style={{ marginTop: "80px" }}>
        <Row>
          <Col>
            <h2>Github Repository Timeline</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              <a
                target="_blank"
                href="https://github.com/okandavut/git-repositories-timeline"
              >
                Check on Github
              </a>
            </p>
            <br />
          </Col>
        </Row>
        <Row>
          <Col>{styledInput}</Col>
        </Row>
        <Row style={{ display: repositories ? "block" : "none" , marginLeft:"0px"}}>
          <Col>
          <Row>
            <TwitterShareButton
              url={shareUrl}
              title={title}
              hashtags={[
                "GithubRepositoryTimeline",
                "Github",
                "RepositoryLink",
                "Timeline",
              ]}
              className="Demo__some-network__share-button"
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <Link href={"/" + username} >
              <a target="_blank" style={{marginLeft:"15px", marginTop:"5px"}}>Get your personal Link</a>
            </Link>
            </Row>
          </Col>
        </Row>
      </Container>

      <RepoTimeline repositories={repositories} apiLimitError={apiLimitError} />
    </>
  );
}

export default Search;
