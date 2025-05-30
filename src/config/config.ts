export interface ComicVineConfig {
    apiKey: string;
    baseUrl: string;
}

export const config: ComicVineConfig = {
    apiKey: process.env.COMIC_VINE_API_KEY || '',
    baseUrl: 'https://comicvine.gamespot.com/api'
};
