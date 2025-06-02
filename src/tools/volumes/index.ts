import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ComicVineClient } from '../../client';
import { volumeOptionsSchema } from './schemas';

export function registerVolumeTools(server: McpServer, client: ComicVineClient) {
    server.tool(
        'get-volumes',
        'Get a list of comic book volumes',
        volumeOptionsSchema.shape.params.unwrap().shape,
        async (params) => {
            const response = await client.getVolumes(params);
            return {
                content: [{ 
                    type: 'text',
                    text: formatVolumesResponse(response)
                }]
            };
        }
    );

    server.tool(
        'get-volume',
        'Get information about a specific volume',
        { 
            id: volumeOptionsSchema.shape.id,
            ...volumeOptionsSchema.shape.params.unwrap().shape
        },
        async ({ id, ...params }) => {
            const response = await client.getVolume(id, params);
            return {
                content: [{ 
                    type: 'text',
                    text: formatVolumeResponse(response)
                }]
            };
        }
    );
}

function formatVolumesResponse(response: any): string {
    const { results, number_of_total_results, limit, offset } = response;
    
    let markdown = `# Comic Book Volumes\n\n`;
    markdown += `Found ${number_of_total_results} volumes (showing ${limit} results, starting from ${offset})\n\n`;

    results.forEach((volume: any) => {
        markdown += formatVolumeBrief(volume);
    });

    return markdown;
}

function formatVolumeResponse(response: any): string {
    const volume = response.results;
    return formatVolumeDetailed(volume);
}

function formatVolumeBrief(volume: any): string {
    let markdown = `## ${volume.name} (ID: ${volume.id})\n\n`;
    
    if (volume.image?.small_url) {
        markdown += `[![${volume.name}](${volume.image.small_url})](${volume.image.small_url})\n\n`;
    }
    
    if (volume.publisher?.name) {
        markdown += `**Publisher:** ${volume.publisher.name} (ID: ${volume.publisher.id})\n`;
    }
    
    if (volume.start_year) {
        markdown += `**Started:** ${volume.start_year}\n`;
    }

    if (volume.count_of_issues) {
        markdown += `**Issues:** ${volume.count_of_issues}\n`;
    }
    
    if (volume.deck) {
        markdown += `\n${volume.deck}\n`;
    }
    
    markdown += '\n---\n\n';
    return markdown;
}

function formatVolumeDetailed(volume: any): string {
    let markdown = `# ${volume.name} (ID: ${volume.id})\n\n`;

    if (volume.image?.medium_url) {
        markdown += `[![${volume.name}](${volume.image.medium_url})](${volume.image.medium_url})\n\n`;
    }

    if (volume.publisher?.name) {
        markdown += `**Publisher:** ${volume.publisher.name} (ID: ${volume.publisher.id})\n`;
    }

    if (volume.start_year) {
        markdown += `**Started:** ${volume.start_year}\n`;
    }

    if (volume.count_of_issues) {
        markdown += `**Issues:** ${volume.count_of_issues}\n`;
    }

    if (volume.deck) {
        markdown += `\n## Overview\n${volume.deck}\n`;
    }

    if (volume.description) {
        markdown += `\n## Description\n${volume.description}\n`;
    }

    if (volume.first_issue || volume.last_issue) {
        markdown += '\n## Publication Details\n';
        if (volume.first_issue) {
            markdown += `- First Issue: ${volume.first_issue.name} (#${volume.first_issue.issue_number}, ID: ${volume.first_issue.id})\n`;
        }
        if (volume.last_issue) {
            markdown += `- Latest Issue: ${volume.last_issue.name} (#${volume.last_issue.issue_number}, ID: ${volume.last_issue.id})\n`;
        }
    }

    if (volume.characters?.length > 0) {
        markdown += '\n## Notable Characters\n';
        volume.characters.slice(0, 10).forEach((char: any) => {
            markdown += `- ${char.name} (ID: ${char.id})\n`;
        });
    }

    if (volume.concepts?.length > 0) {
        markdown += '\n## Concepts\n';
        volume.concepts.forEach((concept: any) => {
            markdown += `- ${concept.name} (ID: ${concept.id})\n`;
        });
    }

    if (volume.people?.length > 0) {
        markdown += '\n## Creators\n';
        volume.people.forEach((person: any) => {
            markdown += `- ${person.name}${person.role ? ` (${person.role})` : ''} (ID: ${person.id})\n`;
        });
    }

    if (volume.story_arcs?.length > 0) {
        markdown += '\n## Story Arcs\n';
        volume.story_arcs.forEach((arc: any) => {
            markdown += `- ${arc.name} (ID: ${arc.id})\n`;
        });
    }

    return markdown;
}
