import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F6AE2D',
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
