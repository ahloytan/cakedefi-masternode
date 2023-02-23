import React from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import dashLogo from '../images/dash.png';
import defiLogo from '../images/defichain.png';
import BasicSelect from './selectMenu';

export default class MasterNodes extends React.Component {
  state = {
    masterNodes: [],
    dashAssets: [],
    defiChainAssets: [],
    totalAUM: 0
  }

  componentDidMount() {
    axios.get(`https://api.cakedefi.com/nodes?order=status&orderBy=DESC`)
        .then(res => {
            const masterNodes = res.data;

            var dashAssets = []
            var defiChainAssets = []
            var totalAUM = 0
            for (let i=0; i<masterNodes.length; i++) {
                let masterNode = masterNodes[i]
                if (masterNode['coin'] === 'Dash' && masterNode['status'] === 'ACTIVE'){
                    dashAssets.push(masterNode)
                } else if (masterNode['coin'] === 'DeFi' && masterNode['status'] === 'ACTIVE'){
                    defiChainAssets.push(masterNode)
                }
        
                if (masterNode['lastReward'] !== null){
                    totalAUM += parseInt(masterNode['lastReward']['amount']['amount'])
                }
            }            

            this.setState({ masterNodes, dashAssets, defiChainAssets, totalAUM });
        })

        // axios.get(`https://api.exchangerate.host/latest?base=USD`)
        //     .then(res => {
        //         console.log(res.data)
        //     })
  }

  render() {
    return (
        <div className='mainBox'> 
            <Container maxWidth="md">
                <BasicSelect></BasicSelect>
                <div>
                    <h1>Total Assets Under Management (USD):</h1>  
                    <div className='total'>${this.state.totalAUM}</div>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <img className='dashDeFiLogo' src={dashLogo} alt='DASH'/>
                        <h1>DASH</h1>
                        <h2>({this.state.dashAssets.length} active)</h2>
                        {     
                        this.state.dashAssets.map(d =>
                            <div className='values' key={d.id}>{d.lastReward.amount.amount}</div>
                            )
                        }
                    </Grid>
                    <Grid item xs={6}>
                        <img className='dashDeFiLogo' src={defiLogo} alt='DeFi'/>
                        <h1>DeFi</h1>
                        <h2>({this.state.defiChainAssets.length} active)</h2>
                        {       
                        this.state.defiChainAssets.map(d =>
                            <div className='values' key={d.id}>{d.lastReward.amount.amount}</div>
                            )
                        }
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
  }
}