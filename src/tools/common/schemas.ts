import { z } from 'zod';

// Common type for date fields
export const dateSchema = z.string().describe('Date in YYYY-MM-DD format');

// Common type for image fields
export const imageSchema = z.object({
    icon_url: z.string().describe('URL of the icon-sized image'),
    medium_url: z.string().describe('URL of the medium-sized image'),
    screen_url: z.string().describe('URL of the screen-sized image'),
    small_url: z.string().describe('URL of the small-sized image'),
    super_url: z.string().describe('URL of the super-sized image'),
    thumb_url: z.string().describe('URL of the thumbnail image'),
    tiny_url: z.string().describe('URL of the tiny-sized image'),
    original_url: z.string().describe('URL of the original image')
}).describe('Image URLs in various sizes');

// Common type for API metadata
export const apiMetadataSchema = z.object({
    api_detail_url: z.string().describe('URL pointing to the full API response for this resource'),
    site_detail_url: z.string().describe('URL pointing to the resource page on Comic Vine')
}).describe('API and site URLs for the resource');

// Common base schema for all entities
export const baseEntitySchema = z.object({
    id: z.number().describe('Unique identifier for this resource'),
    name: z.string().describe('Name of the resource'),
    aliases: z.array(z.string()).optional().describe('Alternative names'),
    date_added: dateSchema.optional().describe('Date this resource was added to Comic Vine'),
    date_last_updated: dateSchema.optional().describe('Date this resource was last updated'),
    deck: z.string().optional().describe('Brief summary'),
    description: z.string().optional().describe('Full HTML description'),
    image: imageSchema.optional().describe('Associated images'),
    ...apiMetadataSchema.shape
}).describe('Base fields common to all Comic Vine resources');

export const filterParamsSchema = z.object({
    field_list: z.array(z.string()).optional().describe(
        'List of field names to include in the response. This allows you to customize which fields you want returned.'
    ),
    limit: z.number().optional().describe(
        'Maximum number of results to return. Default is 100.'
    ),
    offset: z.number().optional().describe(
        'Number of results to skip. Use this for pagination.'
    ),
    sort: z.string().optional().describe(
        'Field to sort results by. Prefix with "-" for descending order.'
    ),
    filter: z.union([
        z.string(),
        z.record(z.string(), z.string())
    ]).optional().describe(
        'Filter criteria to apply. Can be a string in Comic Vine filter format or an object with field-value pairs.'
    ),
}).describe(
    'Common parameters for filtering, sorting, and paginating results from the Comic Vine API.'
);

export const baseResponseSchema = z.object({
    error: z.string().optional(),
    limit: z.number(),
    offset: z.number(),
    number_of_page_results: z.number(),
    number_of_total_results: z.number(),
    status_code: z.number(),
    results: z.array(z.unknown())
}).describe(
    'Base response format from the Comic Vine API, including pagination information and results.'
);
