import { Grid } from '@mui/material';
import { memo } from 'react';

const AssetValue = ({records}) =>  {
    return (
        <Grid item xs={12} md={5}>
            <Grid item xs={12} className="flex">
                <Grid item xs={7} md={8}>
                    <h2>Address</h2>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={4} md={3}>
                    <h2>Amount</h2>
                </Grid>
            </Grid>
            <div className="assets mb-8 sm:mb-0">
                {records.map((record) => 
                    <div key={record.address} className='flex'>
                        <Grid item xs={7} md={8} className='hideOverflow'>{record['address']}</Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={4} md={3}>
                            ${record['lastReward']['amount']['amount']}
                        </Grid>
                    </div>
                )}          
            </div>         
        </Grid>
    );
}

export default memo(AssetValue);