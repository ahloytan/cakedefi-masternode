import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getMasterNodes, getRates } from '../utils/functions.js';
import { coins, baseCurrency } from '../mixins/variables.js'

import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import CoinHeader from './CoinHeader.jsx';
import AssetValue from './AssetValue.jsx';
import CurrencyMenu from './CurrencyMenu.jsx';
import LoadingScreen from './LoadingScreen.jsx'
import SideBar from './SideBar.jsx'

import ethLogo from '../assets/eth.webp';
import defiLogo from '../assets/defichain.webp';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['ETH', 'DeFi'],
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
    const [mobileOpen, setMobileOpen] = useState(false);
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

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    useEffect(() => {
        const fetchData = async () => {
            let ethAssets = [],  defiChainAssets = [];
            let ethSum = 0, defiChainSum = 0, totalAUMBase = 0, totalAUMDisplay = 0;
            const [masterNodes, rates] = await Promise.all([getMasterNodes(), getRates()]); 

            for (let node of masterNodes) {
                let {status, coin, lastReward: {amount: {amount}}} = node;
                if (status !== 'ACTIVE') continue;
                totalAUMBase += parseFloat(amount);
            
                if (coin === 'DeFiChain') {
                    defiChainAssets.push(node);
                    defiChainSum += parseFloat(amount);
                    continue;
                } 
                
                if (coin === 'Ether') {
                    ethAssets.push(node);
                    ethSum += parseFloat(amount);
                    continue;
                }
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

    if (isLoading) return <LoadingScreen />;
    

    return (
        <>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            </Toolbar>
            <Grid container>
                <Grid item xs={0} md={2}>
                    <SideBar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
                </Grid>
                <Grid item xs={12} md={10}>
                    <CurrencyMenu setCurrency={setCurrency}></CurrencyMenu>
                    <div className="text-center my-6 sm:my-12">
                        <h1>Total Assets:</h1>
                        <h2 className="text-2xl sm:text-4xl">
                            ${parseFloat(state.totalAUMDisplay).toFixed(4)} {state.currency.toUpperCase()}
                        </h2>
                    </div>

                    <div className="text-center my-12">
                        <Doughnut id='donut' options={{ maintainAspectRatio: false }} data={data} redraw={true} />
                    </div>

                    <Grid container spacing={{ sm: 0, md: 2, lg: 2 }} className="text-center mb-12">
                        <CoinHeader name={'Ethereum'} logo={ethLogo} len={state.ethAssets.length}></CoinHeader>
                        <CoinHeader name={'DeFiChain'} logo={defiLogo} len={state.defiChainAssets.length}></CoinHeader>
                    </Grid>

                    <Grid container className="px-8 mb-8 sm:mb-16">
                        <AssetValue arr={state.ethAssets} rates={state.rates} coin={eth}></AssetValue>
                        <AssetValue arr={state.defiChainAssets} rates={state.rates} coin={defi}></AssetValue>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default MasterNodes;
