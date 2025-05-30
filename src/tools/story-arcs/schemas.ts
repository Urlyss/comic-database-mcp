import { z } from 'zod';
import { filterParamsSchema, baseResponseSchema, baseEntitySchema } from '../common/schemas';

export const storyArcFields = [
    'aliases', 'api_detail_url', 'count_of_issue_appearances',
    'date_added', 'date_last_updated', 'deck', 'description',
    'first_appeared_in_issue', 'id', 'image', 'issues', 'movies',
    'name', 'publisher', 'site_detail_url'
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

export const storyArcSchema = baseEntitySchema.extend({
    count_of_issue_appearances: z.number().optional().describe('Number of issues in this story arc'),
    first_appeared_in_issue: issueRefSchema.optional().describe('Issue where this story arc first appeared'),
    publisher: entityRefSchema.optional().describe('Publisher of this story arc'),
    issues: z.array(issueRefSchema).optional().describe('Issues that are part of this story arc'),
    movies: z.array(entityRefSchema).optional().describe('Movies that adapt this story arc')
}).describe('Detailed information about a comic book story arc');

export const storyArcResponseSchema = baseResponseSchema.extend({
    results: z.array(storyArcSchema)
}).describe('Response containing a list of comic book story arcs');

export const storyArcOptionsSchema = z.object({
    id: z.number().describe(
        'Unique identifier for a specific story arc. Required when fetching a single story arc.'
    ),
    params: filterParamsSchema.extend({
        field_list: z.array(z.enum(storyArcFields)).optional().describe(
            'List of specific story arc fields to include in the response'
        )
    }).optional()
}).describe('Options for retrieving story arc information from Comic Vine');
