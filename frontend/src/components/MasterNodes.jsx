import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getMasterNodes, getRates } from '../utils/functions.js';
import { coins, baseCurrency, ethereum, defiChain } from '../mixins/variables.js'

import { Grid } from '@mui/material';

import CoinHeader from './CoinHeader.jsx';
import AssetValue from './AssetValue.jsx';
import CurrencyMenu from './CurrencyMenu.jsx';
import LoadingScreen from './LoadingScreen.jsx'
import Header from './Header.jsx'
import SideBar from './nav/SideBar.jsx'
import TopNav from './nav/TopNav.jsx'
import Footer from './Footer.jsx'

import ethLogo from '../assets/eth.webp';
import defiLogo from '../assets/defichain.webp';

ChartJS.register(ArcElement, Tooltip, Legend);

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
        chart: {
            labels: [ethereum, defiChain],
            datasets: [
              {
                label: 'Total Asset Value',
                data: [5, 5],
                backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
              },
            ],
        }
    });

    const setCurrency = (currency) => {
        let fiatCurrency = ['sgd', 'eur', baseCurrency];
        let totalAUMDisplay = 0;

        const isFiatCurrency = fiatCurrency.includes(currency);
        if (isFiatCurrency) {
            let usdConversion = state.rates[btc][currency] / state.rates[btc][baseCurrency];
            totalAUMDisplay = state.totalAUMBase * usdConversion;
        } else {
            totalAUMDisplay = state.totalAUMBase / state.rates[currency][baseCurrency];
        }

        setState({ ...state, totalAUMDisplay, currency });
    };

    const updateChartProperty = (newData) => {
        setState((prevState) => ({
          ...prevState,
          chart: {
            ...prevState.chart,
            datasets: [
              {
                ...prevState.chart.datasets[0],
                data: newData,
              },
            ],
          },
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            let ethAssets = [],  defiChainAssets = [];
            let ethSum = 0, defiChainSum = 0, totalAUMBase = 0, totalAUMDisplay = 0;
            const [masterNodes, rates] = await Promise.all([getMasterNodes(), getRates()]); 

            for (let node of masterNodes) {
                let {status, coin, lastReward} = node;
                let amount = lastReward?.amount?.amount ?? null;
                if (status !== 'ACTIVE') continue;
                totalAUMBase += parseFloat(amount);
            
                if (coin === defiChain) {
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
            totalAUMDisplay = totalAUMBase;

            setState({ ...state, rates, masterNodes, ethAssets, defiChainAssets, totalAUMBase, totalAUMDisplay });
            updateChartProperty([chartETHVal, chartDefiVal]);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    if (isLoading) return <LoadingScreen />;
    

    return (
        <>
            <TopNav open={() => setMobileOpen(true)}/>
            <Grid container>
                <Grid item xs={0} md={2}>
                    <SideBar open={mobileOpen} onClose={() => setMobileOpen(false)}/>
                </Grid>
                <Grid item xs={12} md={10}>
                    <Header></Header>

                    <CurrencyMenu setCurrency={setCurrency}></CurrencyMenu>
                    <div className="text-center my-6 sm:my-12">
                        <h1>Total Assets:</h1>
                        <h2 className="text-2xl sm:text-4xl">
                            ${parseFloat(state.totalAUMDisplay).toFixed(4)} {state.currency.toUpperCase()}
                        </h2>
                    </div>

                    <div className="text-center my-12">
                        <Doughnut id='donut' options={{ maintainAspectRatio: false }} data={state.chart} redraw={true}/>
                    </div>

                    <Grid container spacing={{ sm: 0, md: 2, lg: 2 }} className="text-center mb-12">
                        <CoinHeader name={ethereum} logo={ethLogo} len={state.ethAssets.length}></CoinHeader>
                        <CoinHeader name={defiChain} logo={defiLogo} len={state.defiChainAssets.length}></CoinHeader>
                    </Grid>

                    <Grid container className="px-8 mb-8">
                        <AssetValue arr={state.ethAssets} rates={state.rates} coin={eth}></AssetValue>
                        <Grid item xs={0} md={1}></Grid>
                        <AssetValue arr={state.defiChainAssets} rates={state.rates} coin={defi}></AssetValue>
                    </Grid>
                    <Footer></Footer>
                </Grid>
            </Grid>
        </>
    );
};

export default MasterNodes;
