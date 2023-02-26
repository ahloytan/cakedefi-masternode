import axios from 'axios';

function getMasterNodes(){
    var masterNodes = axios.get(`https://api.cakedefi.com/nodes?order=status&orderBy=DESC`)
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