import React from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import dashLogo from '../images/dash.png';
import defiLogo from '../images/defichain.png';
import CurrencyMenu from './currencyMenu';
import CoinHeader from './coinHeader';
import AssetValue from './assetValue';
import { Doughnut } from 'react-chartjs-2';

const data = {
    labels: ['Defi', 'DASH'],
    datasets: [
      {
        label: 'Total Asset Value',
        data: [5, 5],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

async function getMasterNodes(){
    var masterNodes = await axios.get(`https://api.cakedefi.com/nodes?order=status&orderBy=DESC`)
        .then(res => {
            return res.data;
        })
    return masterNodes
}

async function getRates(){
    var rates = await axios.get(`https://api.exchangerate.host/latest?base=USD`)
        .then(res => {
            return res.data
        })
    return rates
}

async function getRates1(){
     var rates1 = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=dash,defichain&vs_currencies=usd`)
        .then(res => {
            return res.data
        })
    return rates1
}

function computeChartJs(arr, rates1, coin){
    return arr
        .map(d => parseFloat(d['lastReward']['amount']['amount']) * rates1[coin]['usd'])
        .reduce((a, b) => a + b);
}

export default class MasterNodes extends React.Component {
    state = {
        masterNodes: [],
        dashAssets: [],
        defiChainAssets: [],
        totalAUMBase: 0,
        totalAUMDisplay: 0,
        rates: {}, //For select menu
        rates1: {}, //Only stores rates for DASH & DeFiChain
        currency: "USD",
    }

    setCurrency = (currency) => {
        let totalAUMDisplay = (this.state.totalAUMBase * this.state.rates['rates'][currency]).toFixed(4);
        this.setState({totalAUMDisplay, currency});
    }
    
    async componentDidMount() {
        var dashAssets = []
        var defiChainAssets = []
        var totalAUMBase = 0
        var totalAUMDisplay = 0

        var masterNodes = await getMasterNodes()
        var rates = await getRates()
        var rates1 = await getRates1()

        for (let i=0; i<masterNodes.length; i++) {
            let masterNode = masterNodes[i]
            if (masterNode['coin'] === 'Dash' && masterNode['status'] === 'ACTIVE'){
                dashAssets.push(masterNode)
            } else if (masterNode['coin'] === 'DeFi' && masterNode['status'] === 'ACTIVE'){
                defiChainAssets.push(masterNode)
            }

            if (masterNode['lastReward'] !== null){
                totalAUMBase += parseFloat(masterNode['lastReward']['amount']['amount'])
            }
        }            

        let chartDashVal = computeChartJs(dashAssets, rates1, 'dash')
        let chartDefiVal = computeChartJs(defiChainAssets, rates1, 'defichain')
        console.log(chartDashVal, chartDefiVal)
        data.datasets[0].data = [chartDashVal, chartDefiVal]

        totalAUMDisplay = totalAUMBase.toFixed(0)
        this.setState({rates, rates1, masterNodes, dashAssets, defiChainAssets, totalAUMBase, totalAUMDisplay});
    }

    render() {

        return (
            <div id='mainBox'> 
                <Container maxWidth="lg ">
                    <CurrencyMenu setCurrency={this.setCurrency}></CurrencyMenu>
                    <div>
                        <h1>Total Assets Under Management:</h1>  
                        <div className='total'>${this.state.totalAUMDisplay} {this.state.currency}</div>
                    </div>
                    
                    <div>
                        <Doughnut options={{ maintainAspectRatio: false }} width={500} height={500} id="donut" data={data} redraw={true}/>
                    </div>


                    <Grid container spacing={0.5}>
                        <CoinHeader name={"DASH"} logo={dashLogo} len={this.state.dashAssets.length}></CoinHeader>
                        <CoinHeader name={"DeFi"} logo={defiLogo} len={this.state.defiChainAssets.length}></CoinHeader>
                    </Grid>

                    <Grid container spacing={0.5}>
                        <AssetValue arr={this.state.dashAssets} rates1={this.state.rates1} coin={"dash"}></AssetValue>
                        <AssetValue arr={this.state.defiChainAssets} rates1={this.state.rates1} coin={"defichain"}></AssetValue>
                    </Grid>
                </Container>
            </div>
        )
    }
}