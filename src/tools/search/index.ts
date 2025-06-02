import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ComicVineClient } from '../../client';
import { searchOptionsSchema } from './schemas';


export function registerSearchTools(server: McpServer, client: ComicVineClient) {
    server.tool(
        'search',
        'Search across all Comic Vine content types',
        searchOptionsSchema.shape,
        async (params) => {
            const response = await client.search(params.query, {
                resources: params.resources,
                field_list: params.field_list,
                limit: params.limit,
                offset: params.offset,
                sort: params.sort
            });
            return {
                content: [{ 
                    type: 'text',
                    text: formatSearchResponse(response, params)
                }]
            };
        }
    );
}

function formatSearchResponse(response: any, params: any): string {
    const { results, number_of_total_results, limit, offset } = response;
    
    let markdown = `# Search Results for "${params.query}"\n\n`;
    markdown += `Found ${number_of_total_results} total matches`;
    
    if (params.resources?.length) {
        markdown += ` in ${params.resources.join(', ')}`;
    } else {
        markdown += ' across all content types';
    }
    
    markdown += ` (showing ${results.length} results, starting from ${offset})\n\n`;

    // Group results by resource type
    const groupedResults = results.reduce((acc: any, item: any) => {
        const type = item.resource_type;
        if (!acc[type]) {
            acc[type] = [];
        }
        acc[type].push(item);
        return acc;
    }, {});

    // Format each group
    Object.entries(groupedResults).forEach(([type, items]: [string, any]) => {
        markdown += formatResultGroup(type, items);
    });

    return markdown;
}

function formatResultGroup(type: string, items: any[]): string {
    let markdown = `## ${capitalizeType(type)} (${items.length} results)\n\n`;

    items.forEach((item: any) => {
        switch (type) {
            case 'character':
                markdown += formatCharacterResult(item);
                break;
            case 'issue':
                markdown += formatIssueResult(item);
                break;
            case 'volume':
                markdown += formatVolumeResult(item);
                break;
            case 'story_arc':
                markdown += formatStoryArcResult(item);
                break;
            case 'publisher':
                markdown += formatPublisherResult(item);
                break;
            default:
                markdown += formatGenericResult(item);
        }
    });

    return markdown + '\n';
}

function formatCharacterResult(character: any): string {
    let result = `### ${character.name}`;
    if (character.real_name) {
        result += ` (${character.real_name})`;
    }
    result += '\n';
    
    if (character.publisher?.name) {
        result += `**Publisher:** ${character.publisher.name}\n`;
    }
    if (character.deck) {
        result += `${character.deck}\n`;
    }
    
    result += '\n';
    return result;
}

function formatIssueResult(issue: any): string {
    let result = `### ${issue.name || `Issue #${issue.issue_number}`}\n`;
    
    if (issue.volume?.name) {
        result += `**Series:** ${issue.volume.name}\n`;
    }
    if (issue.cover_date) {
        result += `**Cover Date:** ${issue.cover_date}\n`;
    }
    if (issue.deck) {
        result += `${issue.deck}\n`;
    }
    
    result += '\n';
    return result;
}

function formatVolumeResult(volume: any): string {
    let result = `### ${volume.name}\n`;
    
    if (volume.publisher?.name) {
        result += `**Publisher:** ${volume.publisher.name}\n`;
    }
    if (volume.start_year) {
        result += `**Started:** ${volume.start_year}\n`;
    }
    if (volume.count_of_issues) {
        result += `**Issues:** ${volume.count_of_issues}\n`;
    }
    if (volume.deck) {
        result += `${volume.deck}\n`;
    }
    
    result += '\n';
    return result;
}

function formatStoryArcResult(arc: any): string {
    let result = `### ${arc.name}\n`;
    
    if (arc.publisher?.name) {
        result += `**Publisher:** ${arc.publisher.name}\n`;
    }
    if (arc.first_appeared_in_issue?.name) {
        result += `**First Appearance:** ${arc.first_appeared_in_issue.name}\n`;
    }
    if (arc.deck) {
        result += `${arc.deck}\n`;
    }
    
    result += '\n';
    return result;
}

function formatPublisherResult(publisher: any): string {
    let result = `### ${publisher.name}\n`;
    
    if (publisher.location_city && publisher.location_state) {
        result += `**Location:** ${publisher.location_city}, ${publisher.location_state}\n`;
    }
    if (publisher.deck) {
        result += `${publisher.deck}\n`;
    }
    
    result += '\n';
    return result;
}

function formatGenericResult(item: any): string {
    let result = `### ${item.name}\n`;
    if (item.deck) {
        result += `${item.deck}\n`;
    }
    result += '\n';
    return result;
}

function capitalizeType(type: string): string {
    return type
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
