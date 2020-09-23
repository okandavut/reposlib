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
import getUserRepositories from "../../api/";

function Search() {
  const [username, setUsername] = useState("");
  const [refresh, setRefresh] = useState("");
  const [repositories, setRepositories] = useState();
  const [apiLimitError, setApiLimitError] = useState("");

  const enterPressed = (event) => {
    setApiLimitError("");
    var code = event.keyCode || event.which;
    if (code === 13 || event.button == 0) {
      if (username) {
        async function getRepositories() {
          let response = await getUserRepositories(username);
          if (!response.message) {
            setRepositories(response);
          } else {
            setApiLimitError(
              response.message ? response.message : "No Repo Found"
            );
          }
        }
        getRepositories();
      } else setRepositories(undefined);
    }
  };

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
      <Button type="button" onClick={enterPressed.bind(this)}>
        Search
      </Button>
    </InputGroup>
  );

  return (
    <>
      <Container style={{ marginTop: "80px" }}>
        <Row>
          <Col>
            <h3>Github Repository Timeline</h3>
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
            <p>Press Enter when you enter Github Username</p>
          </Col>
        </Row>
        <Row>
          <Col>{styledInput}</Col>
        </Row>
      </Container>

      <RepoTimeline repositories={repositories} apiLimitError={apiLimitError} />
    </>
  );
}

export default Search;
