import axios from 'axios';
const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/'; //https://github.com/Rob--W/cors-anywhere/issues/301
function getMasterNodes(){
    var masterNodes = axios.get(`${corsProxyUrl}https://api.cakedefi.com/nodes?order=status&orderBy=DESC`)
        .then(res => {
            return res.data;
        })
    return masterNodes
}

function getRates(){
     var rates = axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,defichain,dash&vs_currencies=sgd,eur,usd&precision=4`)
        .then(res => {
            return res.data
        })
    return rates
}

function strToFloat(node){
    return parseFloat(node['lastReward']['amount']['amount'])
}

function removeLoader(){
    document.getElementsByClassName('loading')[0].style.display = 'None'
}

export {getMasterNodes, getRates, strToFloat, removeLoader};