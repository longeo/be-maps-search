const TOMTOM_API_KEY = 'TOMTOM_API_KEY';

export function getAPIKey(): string | undefined {
    const apiKey = process.env[TOMTOM_API_KEY];

    return apiKey;
}