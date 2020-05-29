
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

import {
  //  green, purple, amber, blue, blueGrey, brown, common, cyan, deepOrange, deepPurple, grey, indigo, red,
  teal, orange,
} from '@material-ui/core/colors';

var darkTheme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: orange,
    type: "dark"
  },
});
var theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: orange
  },

});
darkTheme = responsiveFontSizes(darkTheme);
theme = responsiveFontSizes(theme);

export { darkTheme, theme }