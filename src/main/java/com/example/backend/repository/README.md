# Repository Directory

## Purpose
This directory contains interfaces that act as data access layers for interacting with MongoDB collections. These repositories extend Spring Data's `MongoRepository`.

## Files

### `UserRepository.java`
- Manages CRUD operations for `User` entities.
- Custom query method:
  - `Optional<User> findByEmail(String email)` — Used to find users by their email.

### `PostRepository.java`
- Manages CRUD operations for `Post` entities.
- Uses default `MongoRepository` methods for saving, deleting, and finding posts.

### `CommentRepository.java`
- Manages CRUD operations for `Comment` entities.
- Custom query method:
  - `List<Comment> findByPostId(String postId)` — Retrieves all comments related to a specific post using its ID.

## Notes
- All repositories extend `MongoRepository<ENTITY, ID_TYPE>`.
- Custom queries follow Spring Data method naming conventions, allowing automatic implementation without custom SQL.
