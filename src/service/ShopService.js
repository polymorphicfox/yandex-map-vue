import axios from 'axios';

const url = '/public-api/v3/nearestStores';

export default class ShopService {
    static getShops(params) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(url, {params: params});
                const data = response.data;
                resolve(data)
            } catch (err) {
                reject(err)
            }
        })
    }
}