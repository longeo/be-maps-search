import { config } from 'dotenv'
import { describe } from '@jest/globals'
import { getPlaceAutocomplete } from '../src/maps-api'
import { getAutoCompleteDetails } from '../src'
import { getAPIKey } from '../src/utils/getEnvVariables';

config();

// These are end-to-end tests and need an api key
describe('Tomtom Places E2E Tests', () => {
    describe('getAutoCompleteDetails', () => {
        it ('returns a promise', () => {
            const res = getAutoCompleteDetails('Charlotte Street')
            expect(res).toBeInstanceOf(Promise)
        })

        it('can fetch from the autocomplete api', async () => {
            const res = await getAutoCompleteDetails('Charlotte Street')
            const firstRes = res[0];
            console.log(res)
            expect(firstRes).toHaveProperty('placeId')
            expect(firstRes).toHaveProperty('streetNumber')
            expect(firstRes).toHaveProperty('countryCode')
            expect(firstRes).toHaveProperty('country')
            expect(firstRes).toHaveProperty('freeformAddress')
            expect(firstRes).toHaveProperty('municipality')
        })

        it('only fetches AUS addresses', async () => {
            const res = await getAutoCompleteDetails('Charlotte Street')
            const allCountryCodesAreAUS = res.every(result => result.country === 'Australia');
            expect(allCountryCodesAreAUS).toBe(true);
        })
    })

    describe('getPlaceAutocomplete', () => {
        it ('returns a promise', () => {
            const res = getAutoCompleteDetails('Charlotte Street')
            expect(res).toBeInstanceOf(Promise)
        })

        it('handles no results', async () => {
            const res = await getPlaceAutocomplete(process.env.TOMTOM_API_KEY, 'asfasffasfasafsafs');
            expect(res).toStrictEqual([])
        })

        it('handles error', async () => {
            expect(getPlaceAutocomplete(process.env.TOMTOM_API_KEY, '')).rejects.toThrow()
        })

        it('throws error when api key is undefined', async () => {
            expect(getPlaceAutocomplete('', 'Charlotte Street')).rejects.toThrow()
        })
    })

    describe('utils', () => {
        it ('returns a string', () => {
            const res = getAPIKey()
            expect(typeof res).toBe('string')
        })
    })

})
