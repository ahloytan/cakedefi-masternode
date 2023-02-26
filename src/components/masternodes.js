import React from 'react';
import Grid from '@mui/material/Grid';
import CoinHeader from './coinHeader';
import AssetValue from './assetValue';
import dashLogo from '../images/dash.png';
import CurrencyMenu from './currencyMenu';
import { Doughnut } from 'react-chartjs-2';
import defiLogo from '../images/defichain.png';
import Container from '@mui/material/Container';
import { getMasterNodes, getRates, strToFloat, removeLoader } from './functions';

const data = {
    labels: ['DASH', 'Defi'],
    datasets: [
      {
        label: 'Total Asset Value',
        data: [5, 5],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

export default class MasterNodes extends React.Component {
    state = {
        rates: {},
        currency: 'USD',
        masterNodes: [],
        dashAssets: [],
        defiChainAssets: [],
        totalAUMBase: 0,
        totalAUMDisplay: 0,
    }

    setCurrency = (currency) => {
        let nonCrypto = ['sgd', 'eur', 'usd']
        let totalAUMDisplay = 0
        if (nonCrypto.indexOf(currency) !== -1){
            let usdConversion = this.state.rates['bitcoin'][currency] /this.state.rates['bitcoin']['usd']
            totalAUMDisplay = (this.state.totalAUMBase * usdConversion)
        } else {
            totalAUMDisplay = (this.state.totalAUMBase / this.state.rates[currency]['usd'])
        }

        this.setState({totalAUMDisplay, currency});
    }

    componentDidUpdate(){
        console.log('child information loaded, removing loader screen')
        removeLoader()
    }

    async componentDidMount() {
        let dashAssets = []
        let defiChainAssets = []
        let dashSum = 0
        let defiChainSum = 0
        let totalAUMBase = 0
        let totalAUMDisplay = 0

        const responses = await Promise.all([getMasterNodes(), getRates()])
        const masterNodes = await responses[0]
        const rates = await responses[1]
        
        for (let i=0; i<masterNodes.length; i++) {
            let masterNode = masterNodes[i]
            if (masterNode['status'] !== 'ACTIVE'){
                continue
            }

            if (masterNode['coin'] === 'DeFi'){
                defiChainAssets.push(masterNode)
                defiChainSum += strToFloat(masterNode)
            } else if (masterNode['coin'] === 'Dash'){
                dashAssets.push(masterNode)
                dashSum += strToFloat(masterNode)
            }

            totalAUMBase += strToFloat(masterNode)
        }            

        let chartDashVal = dashSum * rates['dash']['usd'] 
        let chartDefiVal = defiChainSum * rates['defichain']['usd'] 
        data.datasets[0].data = [chartDashVal, chartDefiVal]
        totalAUMDisplay = totalAUMBase
        this.setState({rates, masterNodes, dashAssets, defiChainAssets, totalAUMBase, totalAUMDisplay});

    }

    render() {
        return (
            <div id='mainBox'> 
                <Container maxWidth='xl'>
                    <CurrencyMenu setCurrency={this.setCurrency}></CurrencyMenu>
                    <div>
                        <h1>Total Assets Under Management:</h1>  
                        <div className='total'>
                            ${parseFloat(this.state.totalAUMDisplay).toFixed(4)} {this.state.currency.toUpperCase()}
                        </div>
                    </div>
                    
                    <div>
                        <Doughnut id='donut' options={{ maintainAspectRatio: false }} data={data} redraw={true}/>
                    </div>

                    <Grid container spacing={{sm: 0, md: 2, lg: 4}}>
                        <CoinHeader name={'DASH'} logo={dashLogo} len={this.state.dashAssets.length}></CoinHeader>
                        <CoinHeader name={'DeFi'} logo={defiLogo} len={this.state.defiChainAssets.length}></CoinHeader>
                    </Grid>

                    <div className='assetValuesHeaderBox'>
                        <div className='assetValuesHeader'>
                            <h2>Address</h2>  
                            <h2>Amount</h2>  
                        </div>
                        <div className='assetValuesHeader'>
                            <h2>Address</h2>  
                            <h2>Amount</h2>  
                        </div>
                    </div>                  

                    <Grid container spacing={{sm: 0, md: 2, lg: 4}}>
                        <AssetValue arr={this.state.dashAssets} rates={this.state.rates} coin={'dash'}></AssetValue>
                        <AssetValue arr={this.state.defiChainAssets} rates={this.state.rates} coin={'defichain'}></AssetValue>
                    </Grid>
                </Container>
            </div>
        )
    }
}