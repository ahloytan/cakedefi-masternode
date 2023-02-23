import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [currency, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ width: 150, margin: '0 auto', paddingTop: '20px'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          label="Currency"
          onChange={handleChange}
        >
          <MenuItem value={10}>SGD</MenuItem>
          <MenuItem value={20}>HBAR</MenuItem>
          <MenuItem value={30}>BTC</MenuItem>
          <MenuItem value={30}>USD</MenuItem>
          <MenuItem value={30}>EUR</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
