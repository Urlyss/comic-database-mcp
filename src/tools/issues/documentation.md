# Comic Vine Issue Tools

These tools allow you to interact with the Comic Vine API's issue endpoints, providing access to detailed information about comic book issues.

## Available Tools

### get-issues

Retrieves a list of comic book issues from the Comic Vine database.

**Parameters:**
- `params` (optional): Filter and customize the results
  - `field_list`: Specify which issue fields to include
  - `limit`: Maximum number of issues to return
  - `offset`: Number of issues to skip (for pagination)
  - `sort`: Field to sort by (prefix with "-" for descending)
  - `filter`: Filter criteria (e.g., `{ volume: "Batman" }`)

**Example Usage:**
```javascript
// Get latest 10 issues of Batman
{
  "params": {
    "limit": 10,
    "filter": { "volume": "Batman" },
    "field_list": ["name", "issue_number", "cover_date", "description"]
  }
}

// Search for issues released in 2024
{
  "params": {
    "filter": "cover_date:2024",
    "field_list": ["name", "issue_number", "store_date", "volume"]
  }
}
```

### get-issue

Retrieves detailed information about a specific issue by its ID.

**Parameters:**
- `id` (required): The unique identifier of the issue
- `params` (optional): Customize the results
  - `field_list`: Specify which issue fields to include

**Example Usage:**
```javascript
// Get full details of Batman #1
{
  "id": 6012,
  "params": {
    "field_list": [
      "name",
      "issue_number",
      "description",
      "character_credits",
      "team_credits"
    ]
  }
}
```

## Response Format

The response will be formatted as readable markdown text, making it easy to understand and use in conversations. Example:

\```markdown
# Batman #1

**Volume:** Batman (2020)
**Cover Date:** March 2020
**Store Date:** January 15, 2020

## Overview
The Dark Knight's new era begins here!

## Description
Batman faces off against new threats in Gotham City as mysterious murders begin to unfold...

## Featured Characters
- Bruce Wayne/Batman
- James Gordon
- Harvey Bullock

## Teams
- Gotham City Police Department
- Batman Family

## Credits
- Writer: James Tynion IV
- Artist: Tony S. Daniel
- Colorist: Tomeu Morey
\```
