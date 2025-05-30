import { z } from 'zod';
import { filterParamsSchema, baseResponseSchema, baseEntitySchema } from '../common/schemas';

export const characterFields = [
    'aliases', 'api_detail_url', 'birth', 'character_enemies', 'character_friends',
    'count_of_issue_appearances', 'creators', 'date_added', 'date_last_updated',
    'deck', 'description', 'first_appeared_in_issue', 'gender', 'id', 'image',
    'issues_died_in', 'movies', 'name', 'origin', 'powers', 'publisher', 'real_name',
    'team_enemies', 'team_friends', 'teams', 'volume_credits'
] as const;

export const characterRefSchema = z.object({
    id: z.number(),
    name: z.string(),
    api_detail_url: z.string().optional()
}).describe('Reference to another character');

export const characterSchema = baseEntitySchema.extend({
    birth: z.string().optional().describe('Birthday or creation date of the character'),
    character_enemies: z.array(characterRefSchema).optional().describe('Characters who are enemies of this character'),
    character_friends: z.array(characterRefSchema).optional().describe('Characters who are friends of this character'),
    count_of_issue_appearances: z.number().optional().describe('Number of issues this character appears in'),
    creators: z.array(z.object({
        id: z.number(),
        name: z.string()
    })).optional().describe('Creators who worked on this character'),
    gender: z.number().optional().describe('Gender of the character (0: Other, 1: Male, 2: Female)'),
    issue_credits: z.array(z.object({
        id: z.number(),
        name: z.string(),
        issue_number: z.string()
    })).optional().describe('Issues this character appears in'),
    issues_died_in: z.array(z.object({
        id: z.number(),
        name: z.string(),
        issue_number: z.string()
    })).optional().describe('Issues where this character died'),
    origin: z.object({
        id: z.number(),
        name: z.string()
    }).optional().describe('Origin of the character'),
    powers: z.array(z.object({
        id: z.number(),
        name: z.string()
    })).optional().describe('Powers this character possesses'),
    publisher: z.object({
        id: z.number(),
        name: z.string()
    }).optional().describe('The publisher of the character'),
    real_name: z.string().optional().describe('The real/civilian name of the character'),
    teams: z.array(z.object({
        id: z.number(),
        name: z.string()
    })).optional().describe('Teams this character is a member of'),
    team_enemies: z.array(z.object({
        id: z.number(),
        name: z.string()
    })).optional().describe('Teams that are enemies of this character'),
    team_friends: z.array(z.object({
        id: z.number(),
        name: z.string()
    })).optional().describe('Teams that are allies of this character')
}).describe('Detailed information about a comic book character');

export const characterResponseSchema = baseResponseSchema.extend({
    results: z.array(characterSchema)
}).describe('Response containing a list of comic book characters');

export const characterOptionsSchema = z.object({
    id: z.number().describe(
        'Unique identifier for a specific character. Required when fetching a single character.'
    ),
    params: filterParamsSchema.extend({
        field_list: z.array(z.enum(characterFields)).optional().describe(
            'List of specific character fields to include in the response'
        )
    }).optional()
}).describe('Options for retrieving character information from Comic Vine');
