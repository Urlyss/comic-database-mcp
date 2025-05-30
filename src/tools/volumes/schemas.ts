import { z } from 'zod';
import { filterParamsSchema, baseResponseSchema, baseEntitySchema } from '../common/schemas';

export const volumeFields = [
    'aliases', 'api_detail_url', 'characters', 'concepts', 'count_of_issues',
    'date_added', 'date_last_updated', 'deck', 'description', 'first_issue',
    'id', 'image', 'last_issue', 'location_credits', 'name', 'publisher',
    'site_detail_url', 'start_year', 'objects', 'people', 'story_arcs', 'teams'
] as const;

// Reference schemas for related entities
const entityRefSchema = z.object({
    id: z.number(),
    name: z.string(),
    api_detail_url: z.string().optional()
}).describe('Basic reference to another entity');

const issueRefSchema = entityRefSchema.extend({
    issue_number: z.string(),
    site_detail_url: z.string().optional()
}).describe('Reference to an issue');

export const volumeSchema = baseEntitySchema.extend({
    count_of_issues: z.number().optional().describe('Total number of issues in this volume'),
    start_year: z.string().optional().describe('Year the volume started publication'),
    publisher: entityRefSchema.optional().describe('Publisher of this volume'),
    first_issue: issueRefSchema.optional().describe('First issue in this volume'),
    last_issue: issueRefSchema.optional().describe('Most recent issue in this volume'),
    characters: z.array(entityRefSchema).optional().describe('Characters that appear in this volume'),
    concepts: z.array(entityRefSchema).optional().describe('Concepts featured in this volume'),
    location_credits: z.array(entityRefSchema).optional().describe('Locations featured in this volume'),
    objects: z.array(entityRefSchema).optional().describe('Notable objects in this volume'),
    people: z.array(z.object({
        id: z.number(),
        name: z.string(),
        role: z.string().optional(),
        api_detail_url: z.string().optional()
    })).optional().describe('People who worked on this volume'),
    story_arcs: z.array(entityRefSchema).optional().describe('Story arcs that appear in this volume'),
    teams: z.array(entityRefSchema).optional().describe('Teams that appear in this volume')
}).describe('Detailed information about a comic book volume/series');

export const volumeResponseSchema = baseResponseSchema.extend({
    results: z.array(volumeSchema)
}).describe('Response containing a list of comic book volumes');

export const volumeOptionsSchema = z.object({
    id: z.number().describe(
        'Unique identifier for a specific volume. Required when fetching a single volume.'
    ),
    params: filterParamsSchema.extend({
        field_list: z.array(z.enum(volumeFields)).optional().describe(
            'List of specific volume fields to include in the response'
        )
    }).optional()
}).describe('Options for retrieving volume information from Comic Vine');
