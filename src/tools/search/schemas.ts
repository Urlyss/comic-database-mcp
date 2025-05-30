import { z } from 'zod';
import { filterParamsSchema, baseResponseSchema, baseEntitySchema } from '../common/schemas';

export const searchResourceTypes = [
    'character',
    'issue',
    'publisher',
    'story_arc',
    'volume',
    'team',
    'person',
    'concept',
    'object',
    'location'
] as const;

// Base search result that captures common fields across all resource types
export const searchResultSchema = baseEntitySchema.extend({
    resource_type: z.enum(searchResourceTypes).describe('Type of resource this result represents'),
    // Additional resource-specific fields will be included based on the resource_type
    publisher: z.object({
        id: z.number(),
        name: z.string()
    }).optional().describe('Publisher associated with this result'),
    volume: z.object({
        id: z.number(),
        name: z.string(),
        issue_number: z.string().optional()
    }).optional().describe('Volume associated with this result (for issues)'),
    start_year: z.string().optional().describe('Start year (for volumes)'),
    issue_number: z.string().optional().describe('Issue number (for issues)'),
    cover_date: z.string().optional().describe('Cover date (for issues)'),
    real_name: z.string().optional().describe('Real name (for characters)'),
    role: z.string().optional().describe('Role (for person credits)'),
    first_appeared_in_issue: z.object({
        id: z.number(),
        name: z.string(),
        issue_number: z.string()
    }).optional().describe('First appearance information')
}).describe('Generic search result that includes fields from all resource types');

export const searchSchema = z.object({
    query: z.string().describe('The search query string'),
    resources: z.array(z.enum(searchResourceTypes)).optional().describe(
        'Limit search to specific resource types'
    )
}).describe('Search parameters for querying Comic Vine content');

export const searchResponseSchema = baseResponseSchema.extend({
    results: z.array(searchResultSchema)
}).describe('Response containing search results from Comic Vine');

export const searchOptionsSchema = searchSchema.extend({
        ...filterParamsSchema.shape,
        field_list: z.array(z.string()).optional().describe(
            'List of fields to include in the response for each resource type'
        )
}).describe('Options for searching Comic Vine content');
