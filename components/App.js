import React from 'react';
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
        {props.children}
    </MuiThemeProvider>
);

export default App;