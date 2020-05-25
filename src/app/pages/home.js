import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import SearchBox from '../components/search';
function Home() {

    return (
        <>
            <SearchBox />
        </>
    );
}

export default hot(Home);

