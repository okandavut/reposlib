import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import TimelineComp from './timeline';


function Search() {
  
  return (
    <TimelineComp username="okandavut"/>
  );
}

export default hot(Search);
