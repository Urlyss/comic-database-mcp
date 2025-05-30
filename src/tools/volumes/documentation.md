# Comic Vine Volume Tools

These tools allow you to interact with the Comic Vine API's volume endpoints, providing access to information about comic book series and their collected editions.

## Available Tools

### get-volumes

Retrieves a list of comic book volumes from the Comic Vine database.

**Parameters:**
- `params` (optional): Filter and customize the results
  - `field_list`: Specify which volume fields to include
  - `limit`: Maximum number of volumes to return
  - `offset`: Number of volumes to skip (for pagination)
  - `sort`: Field to sort by (prefix with "-" for descending)
  - `filter`: Filter criteria (e.g., `{ publisher: "Marvel" }`)

**Example Usage:**
```javascript
// Get first 10 Batman volumes
{
  "params": {
    "limit": 10,
    "filter": "name:Batman",
    "field_list": ["name", "start_year", "publisher", "count_of_issues"]
  }
}

// Search for volumes from 2024
{
  "params": {
    "filter": "start_year:2024",
    "field_list": ["name", "publisher", "description"]
  }
}
```

### get-volume

Retrieves detailed information about a specific volume by its ID.

**Parameters:**
- `id` (required): The unique identifier of the volume
- `params` (optional): Customize the results
  - `field_list`: Specify which volume fields to include

**Example Usage:**
```javascript
// Get Batman (2016) series details
{
  "id": 93340,
  "params": {
    "field_list": [
      "name",
      "description",
      "start_year",
      "count_of_issues",
      "first_issue",
      "last_issue",
      "characters"
    ]
  }
}
```

## Response Format

The response will be formatted as readable markdown text, making it easy to understand and use in conversations. Example:

\```markdown
# Batman (2016)

**Publisher:** DC Comics
**Started:** 2016
**Status:** Ongoing
**Issues:** 129

## Overview
Following the events of DC Rebirth, this series follows Batman's continued adventures in Gotham City.

## Description
Batman is an ongoing American comic book series featuring the DC Comics superhero Batman as its main protagonist...

## Publication Details
- First Issue: Batman #1 (June 2016)
- Latest Issue: Batman #129 (December 2022)

## Notable Characters
- Bruce Wayne/Batman
- Catwoman
- Joker
- Penguin

## Story Arcs
- I Am Gotham
- I Am Suicide
- The War of Jokes and Riddles
- City of Bane
\```
