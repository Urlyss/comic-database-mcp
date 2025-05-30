# Comic Vine Story Arc Tools

These tools allow you to interact with the Comic Vine API's story arc endpoints, providing access to information about comic book story arcs and crossover events.

## Available Tools

### get-story-arcs

Retrieves a list of comic book story arcs from the Comic Vine database.

**Parameters:**
- `params` (optional): Filter and customize the results
  - `field_list`: Specify which story arc fields to include
  - `limit`: Maximum number of story arcs to return
  - `offset`: Number of story arcs to skip (for pagination)
  - `sort`: Field to sort by (prefix with "-" for descending)
  - `filter`: Filter criteria (e.g., `{ publisher: "DC Comics" }`)

**Example Usage:**
```javascript
// Get first 10 story arcs
{
  "params": {
    "limit": 10,
    "field_list": ["name", "publisher", "first_appeared_in_issue"]
  }
}

// Search for Batman story arcs
{
  "params": {
    "filter": "name:Batman",
    "field_list": ["name", "description", "issues"]
  }
}
```

### get-story-arc

Retrieves detailed information about a specific story arc by its ID.

**Parameters:**
- `id` (required): The unique identifier of the story arc
- `params` (optional): Customize the results
  - `field_list`: Specify which story arc fields to include

**Example Usage:**
```javascript
// Get Crisis on Infinite Earths details (ID: 123)
{
  "id": 123,
  "params": {
    "field_list": [
      "name",
      "description",
      "issues",
      "publisher"
    ]
  }
}
```

## Response Format

The response will be formatted as readable markdown text, making it easy to understand and use in conversations. Example:

\```markdown
# Crisis on Infinite Earths

**Publisher:** DC Comics
**First Appearance:** Crisis on Infinite Earths #1 (April 1985)

## Overview
A 12-issue limited series that dramatically altered the DC Universe.

## Description
Crisis on Infinite Earths was a 12-issue American comic book crossover series published by DC Comics from April 1985 to March 1986...

## Issues in this Story Arc
1. Crisis on Infinite Earths #1
2. Crisis on Infinite Earths #2
3. Crisis on Infinite Earths #3
[...]

## Key Events
- The death of Supergirl
- The death of Barry Allen
- The merging of the multiverse
\```
