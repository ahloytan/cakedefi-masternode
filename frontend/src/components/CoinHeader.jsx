import * as React from 'react';
import Grid from '@mui/material/Grid';

const CoinHeader = (props) =>  {

    return (
        <Grid item xs={6}>     
            <img className='mx-auto' src={props.logo} alt={props.name}/>
            <h1>{props.name}</h1>
            <h2>({props.len} active)</h2>      
        </Grid>
    );
}

export default CoinHeader;