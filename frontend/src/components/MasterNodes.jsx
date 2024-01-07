import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import CoinHeader from './CoinHeader.jsx';
import AssetValue from './AssetValue.jsx';
import ethLogo from '../assets/eth.webp';
import defiLogo from '../assets/defichain.webp';
import CurrencyMenu from './CurrencyMenu.jsx';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import LoadingScreen from './LoadingScreen.jsx'
import { getMasterNodes, getRates, strToFloat } from '../utils/functions.js';
import SideBar from './SideBar.jsx'
import { coins, baseCurrency } from '../mixins/variables.js'


ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['ETH', 'Defi'],
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

const MasterNodes = () => {
    const {eth, defi, btc} = coins;
    const [isLoading, setIsLoading] = useState(true);
    const [state, setState] = useState({
        rates: {},
        currency: baseCurrency,
        masterNodes: [],
        ethAssets: [],
        defiChainAssets: [],
        totalAUMBase: 0,
        totalAUMDisplay: 0,
    });

    const setCurrency = (currency) => {
        let nonCrypto = ['sgd', 'eur', baseCurrency];
        let totalAUMDisplay = 0;

        if (nonCrypto.indexOf(currency) !== -1) {
            let usdConversion = state.rates[btc][currency] / state.rates[btc][baseCurrency];
            totalAUMDisplay = state.totalAUMBase * usdConversion;
        } else {
            totalAUMDisplay = state.totalAUMBase / state.rates[currency][baseCurrency];
        }

        setState({ ...state, totalAUMDisplay, currency });
    };

    useEffect(() => {
        const fetchData = async () => {
            let ethAssets = [];
            let defiChainAssets = [];
            let ethSum = 0;
            let defiChainSum = 0;
            let totalAUMBase = 0;
            let totalAUMDisplay = 0;

            const responses = await Promise.all([getMasterNodes(), getRates()]); 
            const masterNodes = await responses[0];
            const rates =  await responses[1];

            for (let i = 0; i < masterNodes.length; i++) {
                let masterNode = masterNodes[i];
                if (masterNode['status'] !== 'ACTIVE') continue;
                

                if (masterNode['coin'] === 'DeFiChain') {
                    defiChainAssets.push(masterNode);
                    defiChainSum += strToFloat(masterNode);
                } else if (masterNode['coin'] === 'Ether') {
                    ethAssets.push(masterNode);
                    ethSum += strToFloat(masterNode);
                }

                totalAUMBase += strToFloat(masterNode);
            }

            let chartETHVal = ethSum * rates[eth][baseCurrency];
            let chartDefiVal = defiChainSum * rates[defi][baseCurrency];
            data.datasets[0].data = [chartETHVal, chartDefiVal];
            totalAUMDisplay = totalAUMBase;

            setState({ ...state, rates, masterNodes, ethAssets, defiChainAssets, totalAUMBase, totalAUMDisplay });
            setIsLoading(false);
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <Grid container>
            <Grid item xs={2}>
                <SideBar />
            </Grid>
            <Grid item xs={10}>
                <CurrencyMenu setCurrency={setCurrency}></CurrencyMenu>
                <div className="text-center my-12">
                    <h1>Total Assets:</h1>
                    <h2>
                        ${parseFloat(state.totalAUMDisplay).toFixed(4)} {state.currency.toUpperCase()}
                    </h2>
                </div>

                <div className="text-center my-12">
                    <Doughnut id='donut' options={{ maintainAspectRatio: false }} data={data} redraw={true} />
                </div>

                <Grid container spacing={{ sm: 0, md: 2, lg: 2 }} className="text-center mb-12">
                    <CoinHeader name={'ETH'} logo={ethLogo} len={state.ethAssets.length}></CoinHeader>
                    <CoinHeader name={'DeFi'} logo={defiLogo} len={state.defiChainAssets.length}></CoinHeader>
                </Grid>

                <Grid container>
                    <AssetValue arr={state.ethAssets} rates={state.rates} coin={eth}></AssetValue>
                    <AssetValue arr={state.defiChainAssets} rates={state.rates} coin={defi}></AssetValue>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MasterNodes;
