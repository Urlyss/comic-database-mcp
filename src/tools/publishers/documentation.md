# Comic Vine Publisher Tools

These tools allow you to interact with the Comic Vine API's publisher endpoints, providing access to information about comic book publishers.

## Available Tools

### get-publishers

Retrieves a list of comic book publishers from the Comic Vine database.

**Parameters:**
- `params` (optional): Filter and customize the results
  - `field_list`: Specify which publisher fields to include
  - `limit`: Maximum number of publishers to return
  - `offset`: Number of publishers to skip (for pagination)
  - `sort`: Field to sort by (prefix with "-" for descending)
  - `filter`: Filter criteria (e.g., `{ location_state: "New York" }`)

**Example Usage:**
```javascript
// Get first 10 publishers
{
  "params": {
    "limit": 10,
    "field_list": ["name", "location_city", "location_state"]
  }
}

// Search for publishers in New York
{
  "params": {
    "filter": "location_state:New York",
    "field_list": ["name", "description", "location_address"]
  }
}
```

### get-publisher

Retrieves detailed information about a specific publisher by its ID.

**Parameters:**
- `id` (required): The unique identifier of the publisher
- `params` (optional): Customize the results
  - `field_list`: Specify which publisher fields to include

**Example Usage:**
```javascript
// Get DC Comics' full details (ID: 10)
{
  "id": 10,
  "params": {
    "field_list": [
      "name",
      "description",
      "characters",
      "volumes"
    ]
  }
}
```

## Response Format

The response will be formatted as readable markdown text, making it easy to understand and use in conversations. Example:

\```markdown
# DC Comics

**Location:** 2900 West Alameda Avenue, Burbank, California

## Overview
One of the largest and oldest American comic book publishers.

## Description
DC Comics, Inc. is an American comic book publisher and the flagship unit of DC Entertainment, a subsidiary of Warner Bros. Discovery...

## Notable Series
- Action Comics
- Detective Comics
- Wonder Woman
- The Flash

## Key Characters
- Superman
- Batman
- Wonder Woman
- The Flash
\```
