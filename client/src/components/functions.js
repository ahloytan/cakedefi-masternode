import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_NODE_ENV === 'production' ? process.env.REACT_APP_BE_URL : 'http://localhost:8888';
async function getMasterNodes(){
    var masterNodes = await axios.get(`${API_BASE_URL}/getMasterNodes`)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            console.error('Error fetching master nodes:', error);
            throw error; // Rethrow the error to propagate it further if needed
        });
    return masterNodes
}

function getRates(){
     var rates = axios.get(`${API_BASE_URL}/getRates`)
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