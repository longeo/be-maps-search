export interface mapApiResponse {
    id: string; 
    address: Address;
  }

interface Address {
  streetName: string;
  countryCode: string;
  country: string;
  freeformAddress: string;
  municipality: string;
}
