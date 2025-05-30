import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ComicVineClient } from '../../api/client';
import { publisherOptionsSchema } from './schemas';

export function registerPublisherTools(server: McpServer, client: ComicVineClient) {
    server.tool(
        'get-publishers',
        'Get a list of comic book publishers',
        publisherOptionsSchema.shape.params.unwrap().shape,
        async (params) => {
            const response = await client.getPublishers(params);
            return {
                content: [{ 
                    type: 'text',
                    text: formatPublishersResponse(response)
                }]
            };
        }
    );

    server.tool(
        'get-publisher',
        'Get information about a specific publisher',
        { 
            id: publisherOptionsSchema.shape.id,
            ...publisherOptionsSchema.shape.params.unwrap().shape
        },
        async ({ id, ...params }) => {
            const response = await client.getPublisher(id, params);
            return {
                content: [{ 
                    type: 'text',
                    text: formatPublisherResponse(response)
                }]
            };
        }
    );
}

function formatPublishersResponse(response: any): string {
    const { results, number_of_total_results, limit, offset } = response;
    
    let markdown = `# Comic Book Publishers\n\n`;
    markdown += `Found ${number_of_total_results} publishers (showing ${limit} results, starting from ${offset})\n\n`;

    results.forEach((publisher: any) => {
        markdown += formatPublisherBrief(publisher);
    });

    return markdown;
}

function formatPublisherResponse(response: any): string {
    const publisher = response.results;
    return formatPublisherDetailed(publisher);
}

function formatPublisherBrief(publisher: any): string {
    let markdown = `## ${publisher.name} (ID: ${publisher.id})\n\n`;
    
    if (publisher.image?.small_url) {
        markdown += `[![${publisher.name}](${publisher.image.small_url})](${publisher.image.small_url})\n\n`;
    }
    
    const location = [
        publisher.location_city,
        publisher.location_state,
        publisher.location_country
    ].filter(Boolean).join(', ');
    
    if (location) {
        markdown += `**Location:** ${location}\n`;
    }
    
    if (publisher.deck) {
        markdown += `\n${publisher.deck}\n`;
    }
    
    markdown += '\n---\n\n';
    return markdown;
}

function formatPublisherDetailed(publisher: any): string {
    let markdown = `# ${publisher.name} (ID: ${publisher.id})\n\n`;

    if (publisher.image?.medium_url) {
        markdown += `[![${publisher.name}](${publisher.image.medium_url})](${publisher.image.medium_url})\n\n`;
    }

    const location = [
        publisher.location_address,
        publisher.location_city,
        publisher.location_state,
        publisher.location_country
    ].filter(Boolean).join(', ');

    if (location) {
        markdown += `**Location:** ${location}\n`;
    }

    if (publisher.email) {
        markdown += `**Email:** ${publisher.email}\n`;
    }

    if (publisher.phone) {
        markdown += `**Phone:** ${publisher.phone}\n`;
    }

    markdown += '\n';

    if (publisher.deck) {
        markdown += `## Overview\n${publisher.deck}\n\n`;
    }

    if (publisher.description) {
        markdown += `## Description\n${publisher.description}\n\n`;
    }

    if (publisher.volumes?.length > 0) {
        markdown += '## Notable Series\n';
        publisher.volumes.slice(0, 10).forEach((volume: any) => {
            markdown += `- ${volume.name} (ID: ${volume.id})\n`;
        });
        markdown += '\n';
    }

    if (publisher.characters?.length > 0) {
        markdown += '## Key Characters\n';
        publisher.characters.slice(0, 10).forEach((character: any) => {
            markdown += `- ${character.name} (ID: ${character.id})\n`;
        });
        markdown += '\n';
    }

    if (publisher.teams?.length > 0) {
        markdown += '## Teams\n';
        publisher.teams.forEach((team: any) => {
            markdown += `- ${team.name} (ID: ${team.id})\n`;
        });
        markdown += '\n';
    }

    if (publisher.story_arcs?.length > 0) {
        markdown += '## Story Arcs\n';
        publisher.story_arcs.forEach((arc: any) => {
            markdown += `- ${arc.name} (ID: ${arc.id})\n`;
        });
        markdown += '\n';
    }

    return markdown;
}
