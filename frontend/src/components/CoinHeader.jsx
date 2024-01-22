import { Grid } from '@mui/material';
import { memo } from 'react';

const CoinHeader = ({name, logo, length}) =>  {

    return (
        <Grid item xs={6}>     
            <img className='mx-auto coins' src={logo} alt={name}/>
            <h1 className="text-base sm:text-4xl">{name}</h1>
            <h2>({length} active)</h2>      
        </Grid>
    );
}

export default memo(CoinHeader);