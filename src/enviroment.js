import address from 'address';

export const enviroment = {
    baseUrl: process.env.PROD ? 'http://192.168.0.107:2345' : `http://localhost:2345`
}
