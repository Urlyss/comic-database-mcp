import { z } from 'zod';
import { filterParamsSchema, baseResponseSchema, baseEntitySchema, dateSchema } from '../common/schemas';

export const issueFields = [
    'aliases', 'api_detail_url', 'character_credits', 'concept_credits',
    'cover_date', 'date_added', 'date_last_updated', 'deck', 'description',
    'first_appearance_characters', 'first_appearance_concepts',
    'first_appearance_locations', 'first_appearance_objects',
    'first_appearance_storyarcs', 'first_appearance_teams', 'has_staff_review',
    'id', 'image', 'issue_number', 'location_credits', 'name', 'object_credits',
    'person_credits', 'site_detail_url', 'store_date', 'story_arc_credits',
    'team_credits', 'team_disbanded_in', 'volume'
] as const;

// Reference schemas for credits
const creditRefSchema = z.object({
    id: z.number(),
    name: z.string(),
    api_detail_url: z.string().optional()
}).describe('Basic reference to another entity');

const personCreditSchema = creditRefSchema.extend({
    role: z.string().describe('Role of the person (e.g., writer, artist)')
}).describe('Credit for a person who worked on the issue');

export const issueSchema = baseEntitySchema.extend({
    issue_number: z.string().describe('The number/identifier of this issue within its volume'),
    cover_date: dateSchema.optional().describe('Cover date of the issue'),
    store_date: dateSchema.optional().describe('Store release date of the issue'),
    character_credits: z.array(creditRefSchema).optional().describe('Characters appearing in this issue'),
    concept_credits: z.array(creditRefSchema).optional().describe('Concepts featured in this issue'),
    location_credits: z.array(creditRefSchema).optional().describe('Locations featured in this issue'),
    story_arc_credits: z.array(creditRefSchema).optional().describe('Story arcs this issue is part of'),
    team_credits: z.array(creditRefSchema).optional().describe('Teams appearing in this issue'),
    person_credits: z.array(personCreditSchema).optional().describe('People who worked on this issue'),
    first_appearance_characters: z.array(creditRefSchema).optional().describe('Characters that first appeared in this issue'),
    first_appearance_concepts: z.array(creditRefSchema).optional().describe('Concepts that first appeared in this issue'),
    first_appearance_locations: z.array(creditRefSchema).optional().describe('Locations that first appeared in this issue'),
    first_appearance_objects: z.array(creditRefSchema).optional().describe('Objects that first appeared in this issue'),
    first_appearance_storyarcs: z.array(creditRefSchema).optional().describe('Story arcs that began in this issue'),
    first_appearance_teams: z.array(creditRefSchema).optional().describe('Teams that first appeared in this issue'),
    volume: z.object({
        id: z.number(),
        name: z.string(),
        api_detail_url: z.string().optional()
    }).describe('The volume this issue belongs to'),
    has_staff_review: z.boolean().optional().describe('Whether this issue has been reviewed by Comic Vine staff'),
    team_disbanded_in: z.array(creditRefSchema).optional().describe('Teams that disbanded in this issue')
}).describe('Detailed information about a comic book issue');

export const issueResponseSchema = baseResponseSchema.extend({
    results: z.array(issueSchema)
}).describe('Response containing a list of comic book issues');

export const issueOptionsSchema = z.object({
    id: z.number().describe(
        'Unique identifier for a specific issue. Required when fetching a single issue.'
    ),
    params: filterParamsSchema.extend({
        field_list: z.array(z.enum(issueFields)).optional().describe(
            'List of specific issue fields to include in the response'
        )
    }).optional()
}).describe('Options for retrieving issue information from Comic Vine');
