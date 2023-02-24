import * as React from 'react';
import Grid from '@mui/material/Grid';

const AssetValue = (props) =>  {

    return (
        <Grid container item xs={6}>
            <Grid item xs={6}>
                <h2>Address</h2> 
                {props.arr.map(d => <div className='values' key={d.id}>{d['address']}</div>)}
            </Grid>
            <Grid item xs={6}>     
                <h2>Amount</h2>                  
                {
                props.arr.map(d => 
                <div className='values' key={d.id}>
                    ${d['lastReward']['amount']['amount'] * props.rates1[props.coin]['usd']}
                </div>)
                }           
            </Grid>
        </Grid>
    );
}

export default AssetValue;