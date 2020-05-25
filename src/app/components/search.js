import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import TimelineComp from './timeline';
import styled from 'styled-components';
import { InputGroup, FormControl, Container, Row, Col,Grid } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Search() {
  const [value, setValue] = useState("");
  const [refresh, setRefresh] = useState("");
  const styledinput = <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Username"
      aria-label="Username"
      aria-describedby="basic-addon1"
      onChange={e => setValue(e.target.value)}
      value={value}
    />
  </InputGroup>;
  console.log(value);
  return (
    <>
      <Container style={{marginTop:"80px"}}>
        <Row>
          <Col><h3>Github Repository Timeline</h3></Col>
        </Row>
        <Row>
          <Col>
          <p><a target="_blank" href="https://github.com/okandavut/git-repositories-timeline">Check on Github</a></p>
          </Col>
        </Row>
        <Row >
          <Col>{styledinput}</Col>
        </Row>
      </Container>

      <TimelineComp username={value} />
    </>
  );
}

export default hot(Search);
