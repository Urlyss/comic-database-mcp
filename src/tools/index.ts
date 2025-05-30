import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ComicVineClient } from '../api/client';
import { registerCharacterTools } from './characters';
import { registerIssueTools } from './issues';
import { registerPublisherTools } from './publishers';
import { registerStoryArcTools } from './story-arcs';
import { registerVolumeTools } from './volumes';
import { registerSearchTools } from './search';

export function registerAllTools(server: McpServer, client: ComicVineClient) {
    registerCharacterTools(server, client);
    registerIssueTools(server, client);
    registerPublisherTools(server, client);
    registerStoryArcTools(server, client);
    registerVolumeTools(server, client);
    registerSearchTools(server, client);
}
