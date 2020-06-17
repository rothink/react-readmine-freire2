import { createMuiTheme } from 'material-ui/styles';

export default createMuiTheme({
    palette: {
        primary: { // works
          main: '#165788',
          contrastText: '#fff',
        },
        success: { // works
          main: '#69BE28',
          contrastText: '#fff',
        },
        blue: {
            backgroundColor: '#65CFE9',
            color: '#fff',
        },
        red: { 
            backgroundColor: '#E44D69',
            color: '#000',
        },
        purple: { 
            backgroundColor: '#FFFFFF', 
            color: '#000',
        },
    },
});