import './App.css';
import Home from './home/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
  // <ThemeProvider theme={darkTheme}>
    // <CssBaseline />
    <div className="App">
      <Home />
    </div>
  // </ThemeProvider>
  );
}

export default App;
