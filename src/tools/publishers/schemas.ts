import { z } from 'zod';
import { filterParamsSchema, baseResponseSchema, baseEntitySchema } from '../common/schemas';

export const publisherFields = [
    'aliases', 'api_detail_url', 'characters', 'date_added', 'date_last_updated',
    'deck', 'description', 'id', 'image', 'location_address', 'location_city',
    'location_state', 'location_country', 'name', 'site_detail_url', 'story_arcs',
    'teams', 'volumes', 'email', 'phone'
] as const;

// Reference schemas for related entities
const entityRefSchema = z.object({
    id: z.number(),
    name: z.string(),
    api_detail_url: z.string().optional()
}).describe('Basic reference to another entity');

export const publisherSchema = baseEntitySchema.extend({
    location_address: z.string().optional().describe('Street address of the publisher'),
    location_city: z.string().optional().describe('City where the publisher is located'),
    location_state: z.string().optional().describe('State/province where the publisher is located'),
    location_country: z.string().optional().describe('Country where the publisher is located'),
    email: z.string().optional().describe('Contact email for the publisher'),
    phone: z.string().optional().describe('Contact phone number for the publisher'),
    characters: z.array(entityRefSchema).optional().describe('Characters owned by this publisher'),
    teams: z.array(entityRefSchema).optional().describe('Teams owned by this publisher'),
    volumes: z.array(entityRefSchema).optional().describe('Volumes published by this publisher'),
    story_arcs: z.array(entityRefSchema).optional().describe('Story arcs published by this publisher')
}).describe('Detailed information about a comic book publisher');

export const publisherResponseSchema = baseResponseSchema.extend({
    results: z.array(publisherSchema)
}).describe('Response containing a list of comic book publishers');

export const publisherOptionsSchema = z.object({
    id: z.number().describe(
        'Unique identifier for a specific publisher. Required when fetching a single publisher.'
    ),
    params: filterParamsSchema.extend({
        field_list: z.array(z.enum(publisherFields)).optional().describe(
            'List of specific publisher fields to include in the response'
        )
    }).optional()
}).describe('Options for retrieving publisher information from Comic Vine');
