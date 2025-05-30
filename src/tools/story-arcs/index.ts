import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import fs from 'fs';
import path from 'path';
import { ComicVineClient } from '../../api/client';
import { storyArcOptionsSchema } from './schemas';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const documentation = fs.readFileSync(
    path.join(__dirname, 'documentation.md'),
    'utf-8'
);

export function registerStoryArcTools(server: McpServer, client: ComicVineClient) {
    server.tool(
        'get-story-arcs',
        'Get a list of comic book story arcs',
        storyArcOptionsSchema.shape.params.unwrap().shape,
        async (params) => {
            const response = await client.getStoryArcs(params);
            return {
                content: [{ 
                    type: 'text',
                    text: formatStoryArcsResponse(response)
                }]
            };
        }
    );

    server.tool(
        'get-story-arc',
        'Get information about a specific story arc',
        { 
            id: storyArcOptionsSchema.shape.id,
            ...storyArcOptionsSchema.shape.params.unwrap().shape
        },
        async ({ id, ...params }) => {
            const response = await client.getStoryArc(id, params);
            return {
                content: [{ 
                    type: 'text',
                    text: formatStoryArcResponse(response)
                }]
            };
        }
    );
}

function formatStoryArcsResponse(response: any): string {
    const { results, number_of_total_results, limit, offset } = response;
    
    let markdown = `# Comic Book Story Arcs\n\n`;
    markdown += `Found ${number_of_total_results} story arcs (showing ${limit} results, starting from ${offset})\n\n`;

    results.forEach((arc: any) => {
        markdown += formatStoryArcBrief(arc);
    });

    return markdown;
}

function formatStoryArcResponse(response: any): string {
    const arc = response.results;
    return formatStoryArcDetailed(arc);
}

function formatStoryArcBrief(arc: any): string {
    let markdown = `## ${arc.name} (ID: ${arc.id})\n\n`;
    
    if (arc.image?.small_url) {
        markdown += `[![${arc.name}](${arc.image.small_url})](${arc.image.small_url})\n\n`;
    }
    
    if (arc.publisher?.name) {
        markdown += `**Publisher:** ${arc.publisher.name} (ID: ${arc.publisher.id})\n`;
    }
    
    if (arc.first_appeared_in_issue?.name) {
        markdown += `**First Appearance:** ${arc.first_appeared_in_issue.name} (#${arc.first_appeared_in_issue.issue_number}, ID: ${arc.first_appeared_in_issue.id})\n`;
    }
    
    if (arc.deck) {
        markdown += `\n${arc.deck}\n`;
    }
    
    markdown += '\n---\n\n';
    return markdown;
}

function formatStoryArcDetailed(arc: any): string {
    let markdown = `# ${arc.name} (ID: ${arc.id})\n\n`;

    if (arc.image?.medium_url) {
        markdown += `[![${arc.name}](${arc.image.medium_url})](${arc.image.medium_url})\n\n`;
    }

    if (arc.publisher?.name) {
        markdown += `**Publisher:** ${arc.publisher.name} (ID: ${arc.publisher.id})\n`;
    }

    if (arc.first_appeared_in_issue?.name) {
        markdown += `**First Appearance:** ${arc.first_appeared_in_issue.name} (#${arc.first_appeared_in_issue.issue_number}, ID: ${arc.first_appeared_in_issue.id})\n`;
    }

    if (arc.count_of_issue_appearances) {
        markdown += `**Number of Issues:** ${arc.count_of_issue_appearances}\n`;
    }

    if (arc.deck) {
        markdown += `\n## Overview\n${arc.deck}\n\n`;
    }

    if (arc.description) {
        markdown += `## Description\n${arc.description}\n\n`;
    }

    if (arc.issues?.length > 0) {
        markdown += '## Issues in this Story Arc\n';
        arc.issues
            .sort((a: any, b: any) => a.issue_number.localeCompare(b.issue_number, undefined, { numeric: true }))
            .forEach((issue: any) => {
                markdown += `${issue.issue_number}. ${issue.name} (ID: ${issue.id})\n`;
            });
        markdown += '\n';
    }

    if (arc.movies?.length > 0) {
        markdown += '## Related Movies\n';
        arc.movies.forEach((movie: any) => {
            markdown += `- ${movie.name} (ID: ${movie.id})\n`;
        });
        markdown += '\n';
    }

    return markdown;
}
