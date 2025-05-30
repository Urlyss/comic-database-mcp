import axios from 'axios';
import { config } from '../config/config';

export interface FilterParams {
    field_list?: string[];
    limit?: number;
    offset?: number;
    sort?: string;
    filter?: string | Record<string, any>;
    resources?: string[];
}

export class ComicVineClient {
    private readonly baseURL: string;
    private apiKey: string;

    constructor(apiKey:string) {
        this.baseURL = config.baseUrl;
        this.apiKey = apiKey;
    }


    private async makeRequest<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
        try {
            const response = await axios.get(`${this.baseURL}${endpoint}`, {
                params: {
                    api_key: this.apiKey,
                    format: 'json',
                    ...params,
                    filter: typeof params.filter === 'object' ? 
                        Object.entries(params.filter)
                            .map(([key, value]) => `${key}:${value}`)
                            .join(',') : 
                        params.filter,
                    field_list: Array.isArray(params.field_list) ? 
                        params.field_list.join(',') : 
                        params.field_list
                }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Comic Vine API Error: ${error.response?.data?.error || error.message || error.cause}`);
            }
            throw error;
        }
    }

    // Characters
    async getCharacters(params: FilterParams = {}) {
        return this.makeRequest('/characters', params);
    }

    async getCharacter(id: number, params: Omit<FilterParams, 'limit' | 'offset' | 'sort'> = {}) {
        return this.makeRequest(`/character/4005-${id}`, params);
    }

    // Issues
    async getIssues(params: FilterParams = {}) {
        return this.makeRequest('/issues', params);
    }

    async getIssue(id: number, params: Omit<FilterParams, 'limit' | 'offset' | 'sort'> = {}) {
        return this.makeRequest(`/issue/4000-${id}`, params);
    }

    // Publishers
    async getPublishers(params: FilterParams = {}) {
        return this.makeRequest('/publishers', params);
    }

    async getPublisher(id: number, params: Omit<FilterParams, 'limit' | 'offset' | 'sort'> = {}) {
        return this.makeRequest(`/publisher/4010-${id}`, params);
    }

    // Story Arcs
    async getStoryArcs(params: FilterParams = {}) {
        return this.makeRequest('/story_arcs', params);
    }

    async getStoryArc(id: number, params: Omit<FilterParams, 'limit' | 'offset' | 'sort'> = {}) {
        return this.makeRequest(`/story_arc/4045-${id}`, params);
    }

    // Volumes
    async getVolumes(params: FilterParams = {}) {
        return this.makeRequest('/volumes', params);
    }

    async getVolume(id: number, params: Omit<FilterParams, 'limit' | 'offset' | 'sort'> = {}) {
        return this.makeRequest(`/volume/4050-${id}`, params);
    }

    // Search
    async search(query: string, params: Omit<FilterParams, 'filter'> = {}) {
        return this.makeRequest('/search', {
            query,
            ...params
        });
    }
}
