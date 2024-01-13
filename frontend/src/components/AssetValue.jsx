import { Grid } from '@mui/material';
import { baseCurrency } from '../mixins/variables.js'

const AssetValue = (props) =>  {
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
                {props.arr.map((d) => 
                    <div key={d.address} className='flex '>
                        <Grid item xs={7} md={8} className='hideOverflow'>{d['address']}</Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={4} md={3}>
                            ${(d['lastReward']['amount']['amount'] * props.rates[props.coin][baseCurrency]).toFixed(8)}
                        </Grid>
                    </div>
                )}          
            </div>         
        </Grid>
    );
}

export default AssetValue;