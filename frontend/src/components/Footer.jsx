import { Typography } from '@mui/material';

const Footer = () => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{"marginBottom": "20px"}}>
        {'Coded in Singapore | ©'}{new Date().getFullYear()}{' Aloysius Tan | All Rights Reserved'}
        </Typography>
    )
}

export default Footer;