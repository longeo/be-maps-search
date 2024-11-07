import { getPlaceAutocomplete } from './maps-api'
import { getAPIKey } from './utils/getEnvVariables';
import { Place } from './interfaces/place';


export async function getAutoCompleteDetails(address: string): Promise<Place[]> {
    const apiKey = getAPIKey(); 

    return getPlaceAutocomplete(apiKey, address);
}
