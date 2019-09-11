import axios from 'axios';

const url = '/public-api/v3/nearestStoresClustered';

export default class ShopService {
    static getShops(params) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(url, {params: params});
                const data = response.data;
                // const data = {
                //     shops: [
                //         {
                //             id: 'id1',
                //             coordinates: {lat: 55.66878585425815, lon: 37.58400133225791}
                //         },
                //         {
                //             id: 'id2',
                //             coordinates: {lat: 55.78041468963338, lon: 37.590987885700144}
                //         }
                //     ]
                // };
                resolve(data)
            } catch (err) {
                reject(err)
            }
        })
    }
}