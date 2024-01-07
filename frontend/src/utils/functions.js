import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_BE_URL : 'http://localhost:8888';
async function getMasterNodes(){
    var masterNodes = await axios.get(`${API_BASE_URL}/get_master_nodes`)
        .then(res => {
            return res.data;
        })
        .catch(error => {
            console.error('Error fetching master nodes:', error);
            throw error;
        });
    return masterNodes
}

function getRates(){
     var rates = axios.get(`${API_BASE_URL}/get_rates`)
        .then(res => {
            return res.data
        })

    return rates
}

function strToFloat(node){
    return parseFloat(node['lastReward']['amount']['amount'])
}

export {getMasterNodes, getRates, strToFloat};