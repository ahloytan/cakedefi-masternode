import './App.css'
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from './theme/index.js';
import MasterNodes from './components/MasterNodes.jsx';

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