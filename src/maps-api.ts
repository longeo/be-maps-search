import axios from 'axios'
import { mapApiResponse } from './interfaces/mapApiResponse';
import { Place } from './interfaces/place';

const COUNRTY_FILTER = 'AU';

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
// 'key' param can be undefined here only to allow process.env to be passed directly in when testing this function
// Ideally I we would restrict key param to type string and check that it is defined when we first load it in getEnvVariables.ts 
export async function getPlaceAutocomplete(key: string | undefined, address: string): Promise<Place[]>  {
    
    if(!key){
        throw new Error('API key is not defined.');
    }

    try{
        const autocomplete = await axios.get(`https://api.tomtom.com/search/2/search/${address}.json'`, {
            params: {
                key,
                limit: 100,
                countrySet: COUNRTY_FILTER,
            }
        });
            
        return autocomplete.data.results.map((result: mapApiResponse) => {
            return {
                placeId: result.id,
                streetNumber: result.address.streetName,
                countryCode: result.address.countryCode,
                country: result.address.country,
                freeformAddress: result.address.freeformAddress,
                municipality: result.address.municipality
            }
        })    
    }
    catch (error) {
        // Optionally log error here for debugging/alerting and emit to metrics service
        // console.error('Error fetching autocomplete data:', error);
        
        throw error;
    }
    
}
