# Comic Vine Character Tools

These tools allow you to interact with the Comic Vine API's character endpoints, providing access to a vast database of comic book characters.

## Available Tools

### get-characters

Retrieves a list of comic book characters from the Comic Vine database.

**Parameters:**
- `params` (optional): Filter and customize the results
  - `field_list`: Specify which character fields to include
  - `limit`: Maximum number of characters to return
  - `offset`: Number of characters to skip (for pagination)
  - `sort`: Field to sort by (prefix with "-" for descending)
  - `filter`: Filter criteria (e.g., `{ publisher: "DC Comics" }`)

**Example Usage:**
```javascript
// Get first 10 Marvel characters
{
  "params": {
    "limit": 10,
    "filter": { "publisher": "Marvel" },
    "field_list": ["name", "real_name", "publisher"]
  }
}

// Search for characters with "Batman" in their name
{
  "params": {
    "filter": "name:Batman",
    "field_list": ["name", "description", "first_appeared_in_issue"]
  }
}
```

### get-character

Retrieves detailed information about a specific character by their ID.

**Parameters:**
- `id` (required): The unique identifier of the character
- `params` (optional): Customize the results
  - `field_list`: Specify which character fields to include

**Example Usage:**
```javascript
// Get Batman's full details (ID: 1699)
{
  "id": 1699,
  "params": {
    "field_list": ["name", "real_name", "description", "powers", "teams"]
  }
}
```

## Response Format

The response will be formatted as readable markdown text, making it easy to understand and use in conversations. Example:

\```markdown
# Character: Batman

**Real Name:** Bruce Wayne
**First Appearance:** Detective Comics #27 (May 1939)
**Publisher:** DC Comics

## Description
Batman is a superhero appearing in American comic books published by DC Comics. The character was created by artist Bob Kane and writer Bill Finger...

## Powers and Abilities
- Peak Human Physical Condition
- Expert Detective
- Master Martial Artist
- Genius-level Intellect
- Advanced Technology and Equipment

## Notable Teams
- Justice League
- Batman Family
- Batman Incorporated
\```
