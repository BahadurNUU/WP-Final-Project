# controllers/

## Purpose
This directory contains the REST controllers for handling HTTP requests in the backend. Each controller is responsible for a specific aspect of the application, such as user authentication, profile management, comments, and bookmarks.

Controllers serve as the entry point to backend logic, interacting with services and repositories to process requests and return responses.

---

## Files

### `AuthController.java`
- **Purpose**: Handles user authentication tasks such as login, registration, and connection testing.
- **Endpoints**:
    - `POST /api/auth/login`: Authenticates a user using email and password. Returns a JWT token on success.
    - `POST /api/auth/register`: Registers a new user if the email is not already taken.
    - `POST /api/auth/test`: Test endpoint for MongoDB connection. Saves a sample user to the database.
- **Key Features**:
    - JWT token generation and validation.
    - Basic credential checking (password comparison).
    - Integration with `JwtUtil` and `GenericResponse`.

---

### `ProfileController.java`
- **Purpose**: Manages user profile retrieval and updates.
- **Endpoints**:
    - `GET /api/profile`: Fetches the currently authenticated user's profile details using a JWT token.
    - `PUT /api/profile`: Updates the user's profile, supporting optional fields and image uploads.
- **Key Features**:
    - Accepts multipart form data for profile updates.
    - Updates fields such as username, bio, and profile image.
    - Secure endpoint requiring valid JWT token.

---

### `BookmarkController.java`
- **Purpose**: Manages the bookmarking functionality for posts.
- **Endpoints**:
    - `GET /api/bookmarks/{userId}`: Retrieves all bookmarked posts for a user.
    - `POST /api/bookmarks/{userId}/{postId}`: Toggles a bookmark on/off for a specific post.
- **Key Features**:
    - Dynamically adds or removes post IDs from the user's bookmark list.
    - Fetches post details for bookmarked post IDs.

---

### `CommentController.java`
- **Purpose**: Handles the creation and retrieval of comments on posts.
- **Endpoints**:
    - `GET /api/comments/{postId}`: Fetches all comments related to a specific post.
    - `POST /api/comments`: Creates a comment and assigns the author's username.
- **Key Features**:
    - Associates comments with users via `userId`.
    - Automatically sets the `author` field from the user data.

---

## Notes
- All controllers are annotated with `@RestController` and use Spring annotations for routing (`@RequestMapping`, `@GetMapping`, `@PostMapping`, etc.).
- Dependency injection is handled using `@Autowired`.
- JWT-based authentication is used for secure access to user-specific routes.
- Controllers handle both happy paths and basic error handling through appropriate HTTP status codes.

---

