import React from 'react';
import Head from 'next/head';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import deepPurple from 'material-ui/colors/deepPurple';
import blue from 'material-ui/colors/blue';
import Button from 'material-ui/Button';

const theme = createMuiTheme({
    palette: createPalette({
        primary: deepPurple,
        accent: blue
    })
});

const App = (props) => (
    <MuiThemeProvider theme={theme}>
        <div>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
            </Head>
            {props.children}
        </div>
    </MuiThemeProvider>
);

export default App;