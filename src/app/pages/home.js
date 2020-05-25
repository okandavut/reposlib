import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import SearchBox from '../components/search';
function Home() {

    return (
        <>
            <h1>Welcome to home page</h1>
            <SearchBox />
        </>
    );
}

export default hot(Home);

