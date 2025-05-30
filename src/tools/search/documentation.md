# Comic Vine Search Tool

This tool allows you to perform a unified search across different types of Comic Vine content, including characters, issues, volumes, story arcs, and publishers.

## Available Tool

### search

Performs a search across Comic Vine's database, optionally filtering by resource type.

**Parameters:**
- `params`: Search and filtering options
  - `query` (required): The search term(s)
  - `resources`: Array of resource types to search. Supported values:
    - "character"
    - "issue"
    - "publisher"
    - "story_arc"
    - "volume"
  - `field_list`: Specify which fields to include in results
  - `limit`: Maximum number of results to return
  - `offset`: Number of results to skip (for pagination)
  - `sort`: Field to sort by (prefix with "-" for descending)

**Example Usage:**
```javascript
// Search for "Spider-Man" across all content types
{
  "params": {
    "query": "Spider-Man",
    "limit": 10
  }
}

// Search for Batman volumes only
{
  "params": {
    "query": "Batman",
    "resources": ["volume"],
    "field_list": ["name", "start_year", "publisher", "description"]
  }
}

// Search for recent X-Men issues
{
  "params": {
    "query": "X-Men",
    "resources": ["issue"],
    "sort": "-cover_date",
    "limit": 5
  }
}
```

## Response Format

The response will be formatted as readable markdown text, grouping results by resource type. Example:

\```markdown
# Search Results for "Batman"

Found 50 total matches across all content types

## Characters (3 results)
- Batman (Bruce Wayne)
  Publisher: DC Comics
  First Appearance: Detective Comics #27

- Batman Beyond (Terry McGinnis)
  Publisher: DC Comics
  First Appearance: Batman Beyond #1

- Batman '66 (Bruce Wayne)
  Publisher: DC Comics
  First Appearance: Batman '66 #1

## Volumes (2 results)
- Batman (2016)
  Publisher: DC Comics
  Issues: 129
  
- Batman Beyond (2015)
  Publisher: DC Comics
  Issues: 50

## Story Arcs (1 result)
- Batman: Death of the Family
  Publisher: DC Comics
  First Issue: Batman #13
\```
