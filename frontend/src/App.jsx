import './App.css'
import MasterNodes from './components/MasterNodes.jsx';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from './theme/index.js';
import { CssBaseline } from '@mui/material';

function App() {
  const theme = createTheme();
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MasterNodes />
      </ThemeProvider>
    </>
  )
}

export default App