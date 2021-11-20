import React from 'react';
import Routes from './routes';
import { StyledEngineProvider } from '@mui/material/styles';

const App = (): JSX.Element => {
    return (
        <StyledEngineProvider injectFirst>
            <Routes />
        </StyledEngineProvider>
    );
};

export default App;
