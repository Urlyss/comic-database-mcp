import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import fs from 'fs';
import path from 'path';
import { ComicVineClient } from '../../api/client';
import { issueOptionsSchema } from './schemas';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const documentation = fs.readFileSync(
    path.join(__dirname, 'documentation.md'),
    'utf-8'
);

export function registerIssueTools(server: McpServer, client: ComicVineClient) {
    server.tool(
        'get-issues',
        'Get a list of comic book issues',
        issueOptionsSchema.shape.params.unwrap().shape,
        async (params) => {
            const response = await client.getIssues(params);
            return {
                content: [{ 
                    type: 'text',
                    text: formatIssuesResponse(response)
                }]
            };
        }
    );

    server.tool(
        'get-issue',
        'Get information about a specific issue',
        { 
            id: issueOptionsSchema.shape.id,
            ...issueOptionsSchema.shape.params.unwrap().shape
        },
        async ({ id, ...params }) => {
            const response = await client.getIssue(id, params);
            return {
                content: [{ 
                    type: 'text',
                    text: formatIssueResponse(response)
                }]
            };
        }
    );
}

function formatIssuesResponse(response: any): string {
    const { results, number_of_total_results, limit, offset } = response;
    
    let markdown = `# Comic Book Issues\n\n`;
    markdown += `Found ${number_of_total_results} issues (showing ${limit} results, starting from ${offset})\n\n`;

    results.forEach((issue: any) => {
        markdown += formatIssueBrief(issue);
    });

    return markdown;
}

function formatIssueResponse(response: any): string {
    const issue = response.results;
    return formatIssueDetailed(issue);
}

function formatIssueBrief(issue: any): string {
    let markdown = `## ${issue.name || `Issue #${issue.issue_number}`} (ID: ${issue.id})\n\n`;
    
    if (issue.image?.small_url) {
        markdown += `[![${issue.name || `Issue Cover`}](${issue.image.small_url})](${issue.image.small_url})\n\n`;
    }
    
    if (issue.volume?.name) {
        markdown += `**Volume:** ${issue.volume.name} (ID: ${issue.volume.id})\n`;
    }
    
    if (issue.cover_date) {
        markdown += `**Cover Date:** ${issue.cover_date}\n`;
    }

    if (issue.store_date) {
        markdown += `**Store Date:** ${issue.store_date}\n`;
    }
    
    if (issue.deck) {
        markdown += `\n${issue.deck}\n`;
    }
    
    markdown += '\n---\n\n';
    return markdown;
}

function formatIssueDetailed(issue: any): string {
    let markdown = `# ${issue.name || `Issue #${issue.issue_number}`} (ID: ${issue.id})\n\n`;

    if (issue.image?.medium_url) {
        markdown += `[![${issue.name || 'Issue Cover'}](${issue.image.medium_url})](${issue.image.medium_url})\n\n`;
    }

    if (issue.volume?.name) {
        markdown += `**Volume:** ${issue.volume.name} (ID: ${issue.volume.id})\n`;
    }

    if (issue.cover_date) {
        markdown += `**Cover Date:** ${issue.cover_date}\n`;
    }

    if (issue.store_date) {
        markdown += `**Store Date:** ${issue.store_date}\n`;
    }

    if (issue.deck) {
        markdown += `\n## Overview\n${issue.deck}\n`;
    }

    if (issue.description) {
        markdown += `\n## Description\n${issue.description}\n`;
    }

    if (issue.character_credits?.length > 0) {
        markdown += '\n## Featured Characters\n';
        issue.character_credits.forEach((char: any) => {
            markdown += `- ${char.name} (ID: ${char.id})\n`;
        });
    }

    if (issue.team_credits?.length > 0) {
        markdown += '\n## Teams\n';
        issue.team_credits.forEach((team: any) => {
            markdown += `- ${team.name} (ID: ${team.id})\n`;
        });
    }

    if (issue.person_credits?.length > 0) {
        markdown += '\n## Credits\n';
        const creditsByRole: Record<string, string[]> = {};
        issue.person_credits.forEach((person: any) => {
            if (!creditsByRole[person.role]) {
                creditsByRole[person.role] = [];
            }
            creditsByRole[person.role].push(`${person.name} (ID: ${person.id})`);
        });

        Object.entries(creditsByRole).forEach(([role, names]) => {
            markdown += `- ${role}: ${names.join(', ')}\n`;
        });
    }

    if (issue.first_appearance_characters?.length > 0) {
        markdown += '\n## First Appearances - Characters\n';
        issue.first_appearance_characters.forEach((char: any) => {
            markdown += `- ${char.name} (ID: ${char.id})\n`;
        });
    }

    if (issue.first_appearance_teams?.length > 0) {
        markdown += '\n## First Appearances - Teams\n';
        issue.first_appearance_teams.forEach((team: any) => {
            markdown += `- ${team.name} (ID: ${team.id})\n`;
        });
    }

    if (issue.story_arc_credits?.length > 0) {
        markdown += '\n## Story Arcs\n';
        issue.story_arc_credits.forEach((arc: any) => {
            markdown += `- ${arc.name} (ID: ${arc.id})\n`;
        });
    }

    return markdown;
}
