import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0277bd',
    },
    secondary: {
      main: '#000d34',
    },
  },
  status: {
    danger: 'orange',
  },
});

const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
