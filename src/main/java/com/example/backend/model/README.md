# Model Directory

## Purpose
This directory contains the entity classes that represent the core domain models of the application. Each class is mapped to a MongoDB collection using Spring Data annotations.

## Files

### `User.java`
- Represents a registered user in the application.
- Fields:
  - `id`: Unique identifier.
  - `username`, `email`, `password`: Basic user credentials.
  - `image`: Profile image (as byte array).
  - `bio`: Short biography.
  - `createdAt`: Timestamp of registration.
  - `bookmarks`: List of bookmarked post IDs.

### `Post.java`
- Represents a user-generated post.
- Fields:
  - `id`: Unique identifier.
  - `image`: Post image (as byte array).
  - `title`, `content`: Post content.
  - `likes`: Number of likes.
  - `bookmarked`: Boolean indicating if the post is bookmarked.
  - `createdAt`: Timestamp of creation.
  - `commentIds`: List of associated comment IDs.

### `Comment.java`
- Represents a comment on a post.
- Fields:
  - `id`: Unique identifier.
  - `postId`: ID of the associated post.
  - `content`: Comment text.
  - `author`: Author's display name.
  - `userId`: ID of the user who wrote the comment.
  - `createdAt`: Timestamp of comment creation.

## Notes
- All classes are annotated with `@Document` to map to MongoDB collections.
- Timestamps (`createdAt`) are auto-assigned in constructors.
