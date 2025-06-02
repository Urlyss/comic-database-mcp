# Comic Vine MCP Server

A Model Context Protocol (MCP) server that provides structured access to the Comic Vine API, allowing AI assistants to easily query and retrieve comic book information in a conversational format.

## Features

- Rich, markdown-formatted responses for easy reading and display
- Comprehensive coverage of Comic Vine resources:
  - Characters
  - Issues
  - Volumes/Series
  - Publishers
  - Story Arcs
- Unified search across all content types
- Detailed information with images and relationships
- Support for filtering, pagination, and sorting
- Type-safe API with Zod schema validation

## Available Tools

### Character Tools
- `get-characters`: List comic book characters with filtering and pagination
- `get-character`: Get detailed information about a specific character

  [View Character Tools Documentation](src/tools/characters/documentation.md)

### Issue Tools
- `get-issues`: List comic book issues with filtering and pagination
- `get-issue`: Get detailed information about a specific issue

  [View Issue Tools Documentation](src/tools/issues/documentation.md)

### Volume Tools
- `get-volumes`: List comic book volumes/series with filtering and pagination
- `get-volume`: Get detailed information about a specific volume

  [View Volume Tools Documentation](src/tools/volumes/documentation.md)

### Publisher Tools
- `get-publishers`: List comic book publishers with filtering and pagination
- `get-publisher`: Get detailed information about a specific publisher

  [View Publisher Tools Documentation](src/tools/publishers/documentation.md)

### Story Arc Tools
- `get-story-arcs`: List comic book story arcs with filtering and pagination
- `get-story-arc`: Get detailed information about a specific story arc
  
  [View Story Arc Tools Documentation](src/tools/story-arcs/documentation.md)

### Search Tool
- `search`: Unified search across all Comic Vine content types
  
  [View Search Tool Documentation](src/tools/search/documentation.md)

Each tool supports:
- Field selection to customize response content
- Pagination for large result sets
- Sorting options
- Filtering by various criteria
- Rich markdown formatting with images
- Display of relationships between resources

## Setup

### Prerequisites
- Node.js 16 or higher
- npm or yarn
- A Comic Vine API key

### Getting a Comic Vine API Key

1. Visit [Comic Vine](https://comicvine.gamespot.com/)
2. Sign up for an account if you don't have one
3. Go to your account settings
4. Request an API key
5. Copy your API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/urlyss/comic-database-mcp.git
```
```bash
cd comic-database-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

### Running the Server for the HTTP Transport

Development mode with hot reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

### Running the Server for the STDIO Transport

Development mode with hot reload:
```bash
npm run stdio-dev
```

Production mode:
```bash
npm stdio-start
```

### Testing with HTTP Transport

After building and running the server, you can test it.

Using the MCP Inspector:
```bash
# Start the MCP Inspector
npx @modelcontextprotocol/inspector 
```

- Visit the MCP Inspector URL shown in the console in your browser
- Change `Transport Type` to `Streamable HTTP`
- Change the `URL` to `http://localhost/mcp` (or whatever url you use to run the server)
- In the `Authentication` section, enter your API key in the `Bearer Token`
- Select `Connect`. Select `List Tools` to see the available tools

### Testing with stdio Transport
After building and running the server, you can test it.

The server supports stdio transport for direct integration with AI assistants:

You can test the stdio transport using the MCP Inspector:

```bash
# Start the MCP Inspector
npx @modelcontextprotocol/inspector
```

- Visit the MCP Inspector URL shown in the console
- Change `Transport Type` to `stdio`
- In the `Process Path` field, enter: `node path/to/the/server/dist/api/stdio-index.js`
- In the `Environment Variables` section, add:
  - Name: `COMIC_VINE_API_KEY`
  - Value: Your Comic Vine API key
- Select `Connect`. 
- Select `List Tools` to see the available tools

The stdio transport is particularly useful for:
- Direct integration with AI assistants
- Automated testing and scripting
- Environments where HTTP transport isn't suitable

## Response Format

All responses are formatted in markdown for easy reading, including:
- Resource IDs for precise reference
- Properly formatted images using markdown syntax
- Structured sections for different types of information
- Links to related resources
- Clean formatting for lists and details


### Troubleshooting

#### Common Issues

1. API Key Issues
```
Error: Invalid API Key
```
- Verify your Comic Vine API key is correct
- Check that the API key is properly set in your authentication headers
- For stdio transport, ensure the API key is passed in the environment variables when starting the process

2. Connection Issues
```
Error: ECONNREFUSED
```
- For HTTP transport: Verify the server is running and the port (80) is not in use
- For stdio transport: Make sure the process path in MCP Inspector points to the correct file

3. Format Issues
```
Error: Invalid format specified
```
- Check that your request includes the correct field names
- Verify the field values match the expected types
- For image fields, ensure you're handling the URL format correctly

4. Rate Limiting
```
Error: Too Many Requests
```
- Comic Vine API has rate limits
- Implement request caching in your application
- Add delays between requests in testing scenarios

#### Getting Help
File an issue on GitHub with:
  - Transport type (HTTP or stdio)
  - Steps to reproduce
  - Expected vs actual behavior
