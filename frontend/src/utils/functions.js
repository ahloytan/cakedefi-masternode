import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_BE_URL : 'http://localhost:8888';
async function getMasterNodes(){
    try {
        const { data } = await axios.get(`${API_BASE_URL}/get_master_nodes`);
        return data
    } catch (error) {
        console.error('Error fetching master nodes:', error);
        throw error; 
    }
}

async function getRates(){
    try {
        const { data } = await axios.get(`${API_BASE_URL}/get_rates`);
        return data
    } catch (error) {
        console.error('Error fetching rates:', error);
        throw error;
    }
    // return {"bitcoin":{"sgd":57470.1779,"eur":39331.56,"usd":43123.1169},"dash":{"sgd":38.7347,"eur":26.5093,"usd":29.0648},"defichain":{"sgd":0.1926,"eur":0.1318,"usd":0.1445},"ethereum":{"sgd":3397.683,"eur":2325.3134,"usd":2549.4733}}
}

export {getMasterNodes, getRates};