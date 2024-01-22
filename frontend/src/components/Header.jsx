import { Typography } from '@mui/material';

const Header = () => {

    return (
        <div>
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom className="pt-4 md:pt-8">
                Masternodes
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" paragraph fontStyle="italic" className="px-16">
                A simple web application that reflect the master nodes from Ethereum &amp; DeFiChain. 
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" paragraph fontStyle="italic" className="px-12">
                Built with ReactJS &amp; NodeJS. Hosted on Vercel
            </Typography>
        </div>
    )

}


export default Header