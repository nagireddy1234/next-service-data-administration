import React from 'react';
import Home from './home';
import { Helmet } from 'react-helmet';

function App() {
    return (
        <>
            <Helmet>
                <title>Next service data administration</title>
            </Helmet>
            <Home />
        </>
    );
}

export default App;
