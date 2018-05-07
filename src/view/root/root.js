import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuAppBar from './menuAppBar'
import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3F51B5',
        },
        secondary: {
            main: '#673AB7',
        },
    },
});

const Root = (props) => (
    <MuiThemeProvider theme={theme}>
        <MenuAppBar />
        <div>
            {props.children}
        </div>
    </MuiThemeProvider>
);

export default Root;
