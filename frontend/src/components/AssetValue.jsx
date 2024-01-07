import * as React from 'react';
import Grid from '@mui/material/Grid';
import { baseCurrency } from '../mixins/variables.js'


const AssetValue = (props) =>  {
    return (
        <Grid item xs={12} md={6}>
            <Grid item xs={12} className="flex">
                <Grid item xs={6}>
                    <h2>Address</h2>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={5}>
                    <h2>Amount</h2>
                </Grid>
            </Grid>
            {props.arr.map((d) => 
                <div key={d.address} className='flex'>
                    <Grid item xs={6} className='hideOverflow'>{d['address']}</Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={5}>
                        ${(d['lastReward']['amount']['amount'] * props.rates[props.coin][baseCurrency]).toFixed(8)}
                    </Grid>
                </div>
            )}                   
        </Grid>
    );
}

export default AssetValue;