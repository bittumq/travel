import axios from "axios";


export const getPlacesData = async (type, sw, ne) => {
    // console.log(type, "jdhfgjdshfghjg"); restaurants
    const URL = ` https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`

    const options = {
        params: {
            bl_latitude: '11.847676',
            tr_latitude: '12.838442',
            bl_longitude: '109.095887',
            tr_longitude: '109.149359',
        },
        headers: {
            'X-RapidAPI-Key': 'ac43c9a4e8mshda0ec2790bd1b88p18749ejsn28a01bf1160a',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
    };
    try {

        const { data: { data } } = await axios.get(URL, { ...options, params: { ...options.params, bl_latitude: sw.lat, tr_latitude: ne.lat, bl_longitude: sw.lng, tr_longitude: ne.lng } });

        return data;
    } catch (error) {
        console.log(error);
    }
}
