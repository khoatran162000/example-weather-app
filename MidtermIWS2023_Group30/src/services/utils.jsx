import axios from 'axios';

const API_KEY = "G8KJyLByWoBhHwtTA31DXAdr63B1bosc";
export const getAxios = async (uri, params = {}) => {
    try {
        console.log(API_KEY, 'API_KEY')
        const result = await axios.get(uri, {
            params: {
                ...params,
                apikey: API_KEY,
            },
        });

        return result;
    } catch (error) {
        return error;
    }
};

export const getLocationKey = async () => {
    try {
        const url = "http://dataservice.accuweather.com/locations/v1/cities/ipaddress";
        const result = await axios.get(url, {
            params: {
                q: "118.70.170.88", // ip address
                apikey: API_KEY,
            },
        });
        return result;
    } catch (error) {
        return error;
    }
}
export const getLocationKeyBySearch = async (search) => {
    try {
        const url = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
        const result = await axios.get(url, {
            params: {
                q: search, // search
                apikey: API_KEY,
            },
        });
        return result;
    } catch (error) {
        return error;
    }
}
export const getFiveDaysForecasts = async (locationKey) => {
    try {
        const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`;
        const result = await axios.get(url, {
            params: {
                apikey: API_KEY,
                details: true,
            },
        });
        return result;
    } catch (error) {
        return error;
    }
}
export const getDailyForecasts = async (locationKey) => {
    try {
        const url = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}`;
        const result = await axios.get(url, {
            params: {
                apikey: API_KEY,
                details: true,
            },
        });
        return result;
    } catch (error) {
        return error;
    }
}

export const convertToF = (min, max = 0) => {
    try {
        return Math.round((+min + +max) / 2 * 1.8 + 32, 0);
    } catch (error) {
        return error;
    }
}

export const convertToCelsius = (min, max = 0) => {
    try {
        return Math.round(((+min + +max) / 2 - 32) / 1.8, 0);
    } catch (error) {
        return error;
    }
}