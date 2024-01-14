import { Typography } from '@mui/material';

const Header = () => {

    return (
        <div>
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom className="pt-0 md:pt-8">
                MasterNodes
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph fontStyle="italic" className="px-16">
                A simple web application that reflect the master nodes from Ethereum & DeFiChain. 
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph fontStyle="italic" className="px-12">
                Built with ReactJS & NodeJS. Hosted on Vercel
            </Typography>
        </div>
    )

}


export default Header