import axios from 'axios';

export const getVehicalDetails = async (number: string) => {
    const result = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${number}?format=json`);
    return result;
};
