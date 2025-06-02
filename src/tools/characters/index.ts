import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ComicVineClient } from '../../client';
import { characterOptionsSchema } from './schemas';
import TurndownService from 'turndown'

var turndownService = new TurndownService()


export function registerCharacterTools(server: McpServer, client: ComicVineClient) {
    server.tool(
        'get-characters',
        'Get a list of comic book characters',
        characterOptionsSchema.shape.params.unwrap().shape,
        async (params) => {
            const response = await client.getCharacters(params);
            return {
                content: [{ 
                    type: 'text',
                    text: formatCharactersResponse(response)
                }]
            };
        }
    );

    server.tool(
        'get-character',
        'Get information about a specific character',
        { 
            id: characterOptionsSchema.shape.id,
            ...characterOptionsSchema.shape.params.unwrap().shape
        },
        async ({ id, ...params }) => {
            const response = await client.getCharacter(id, params);
            return {
                content: [{ 
                    type: 'text',
                    text: formatCharacterResponse(response)
                }]
            };
        }
    );
}

function formatCharactersResponse(response: any): string {
    const { results, number_of_total_results, limit, offset } = response;
    
    let markdown = `# Comic Book Characters\n\n`;
    markdown += `Found ${number_of_total_results} characters (showing ${limit} results, starting from ${offset})\n\n`;

    results.forEach((character: any) => {
        markdown += formatCharacterBrief(character);
    });

    return markdown;
}

function formatCharacterResponse(response: any): string {
    const character = response.results;
    return formatCharacterDetailed(character);
}

function formatCharacterBrief(character: any): string {
    let markdown = `## ${character.name} (ID: ${character.id})\n\n`;
    
    if (character.image?.medium_url) {
        markdown += `[![${character.name}](${character.image.medium_url})](${character.image.medium_url})\n\n`;
    }
    
    if (character.real_name) {
        markdown += `**Real Name:** ${character.real_name}\n`;
    }
    
    if (character.publisher?.name) {
        markdown += `**Publisher:** ${character.publisher.name}\n`;
    }
    
    if (character.deck) {
        markdown += `\n${character.deck}\n`;
    }
    
    markdown += '\n---\n\n';
    return markdown;
}

function formatCharacterDetailed(character: any): string {
    let markdown = `# Character: ${character.name} (ID: ${character.id})\n\n`;

    if (character.image?.medium_url) {
        markdown += `[![${character.name}](${character.image.medium_url})](${character.image.medium_url})\n\n`;
    }

    if (character.real_name) {
        markdown += `**Real Name:** ${character.real_name}\n`;
    }

    if (character.publisher?.name) {
        markdown += `**Publisher:** ${character.publisher.name}\n`;
    }

    if (character.gender) {
        markdown += `**Gender:** ${character.gender === 1 ? 'Male' : character.gender === 2 ? 'Female' : 'Other'}\n`;
    }

    if (character.birth) {
        markdown += `**Birth:** ${character.birth}\n`;
    }

    if (character.deck) {
        markdown += `\n## Overview\n${character.deck}\n`;
    }

    if (character.description) {
        markdown += `\n## Description\n${turndownService.turndown(character.description)}\n`;
    }

    if (character.powers && character.powers.length > 0) {
        markdown += '\n## Powers\n';
        character.powers.forEach((power: any) => {
            markdown += `- ${power.name} (ID: ${power.id})\n`;
        });
    }

    if (character.teams && character.teams.length > 0) {
        markdown += '\n## Teams\n';
        character.teams.forEach((team: any) => {
            markdown += `- ${team.name} (ID: ${team.id})\n`;
        });
    }

    if (character.character_enemies && character.character_enemies.length > 0) {
        markdown += '\n## Enemies\n';
        character.character_enemies.forEach((enemy: any) => {
            markdown += `- ${enemy.name} (ID: ${enemy.id})\n`;
        });
    }

    if (character.character_friends && character.character_friends.length > 0) {
        markdown += '\n## Allies\n';
        character.character_friends.forEach((friend: any) => {
            markdown += `- ${friend.name} (ID: ${friend.id})\n`;
        });
    }

    return markdown;
}
