import {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CurrencyMenu = (props) =>  {
  const [currency, setCurrency] = useState('');

  const handleChange = (event) => {
    setCurrency(event.target.value);
    props.setCurrency(event.target.value);
  };

  return (
    <Box sx={{width: 150, margin: '0 auto', paddingTop: '20px'}}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Currency</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={currency}
          label='Currency'
          onChange={handleChange}
        >
          <MenuItem value={'sgd'}>SGD</MenuItem>
          <MenuItem value={'bitcoin'}>BTC</MenuItem>
          <MenuItem value={'usd'}>USD</MenuItem>
          <MenuItem value={'eur'}>EUR</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default CurrencyMenu;