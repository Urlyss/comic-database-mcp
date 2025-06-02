import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerAllTools } from '../src/tools';
import { ComicVineClient } from '../src/client';


// Create MCP server instance
const server = new McpServer({
    name: 'comic-vine-mcp-server',
    version: '1.0.0'
});

async function main() {
    const transport = new StdioServerTransport();
    if(!process.env.COMIC_VINE_API_KEY){
        throw('No API key provided');
    }
    const client = new ComicVineClient(process.env.COMIC_VINE_API_KEY);
    registerAllTools(server, client);
    await server.connect(transport);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});