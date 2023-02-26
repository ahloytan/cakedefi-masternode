import * as React from 'react';
import Grid from '@mui/material/Grid';

const AssetValue = (props) =>  {
    return (
        <Grid item xs={12} md={6}>
            {props.arr.map((d) => 
                <div key={d.address} className='assetValues'>
                    <div className='values'>{d['address']}</div>
                    <div className='values'>
                        ${(d['lastReward']['amount']['amount'] * props.rates[props.coin]['usd']).toFixed(10)}
                    </div>
                </div>
            )}                   
        </Grid>
    );
}

export default AssetValue;