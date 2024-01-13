import { Grid } from '@mui/material';

const CoinHeader = (props) =>  {

    return (
        <Grid item xs={6}>     
            <img className='mx-auto coins' src={props.logo} alt={props.name}/>
            <h1 className="text-base sm:text-4xl">{props.name}</h1>
            <h2>({props.len} active)</h2>      
        </Grid>
    );
}

export default CoinHeader;