# Social Network API

## Description

The **Social Network API** is a backend solution designed for social media platforms, where users can share their thoughts, react to others' thoughts, and manage friend lists. This project is built using **Express.js** and **MongoDB** with **Mongoose ODM**, providing a NoSQL database solution optimized for handling large volumes of unstructured data. The API supports CRUD operations for users, thoughts, reactions, and friendships, offering the core functionalities required for a social network.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Thought Routes](#thought-routes)
  - [Reaction Routes](#reaction-routes)
  - [Friend Routes](#friend-routes)
- [Models](#models)
  - [User Model](#user-model)
  - [Thought Model](#thought-model)
  - [Reaction Schema](#reaction-schema)
- [Technologies](#technologies)
- [Walkthrough Video](#walkthrough-video)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/RubenDguez/social-api
   ```

2. **Navigate to the project directory:**

   ```bash
   cd social-network-api
   ```

3. **Install the necessary dependencies:**

   ```bash
   npm install
   ```

4. **Set up your MongoDB database:**

   - Ensure you have MongoDB installed and running locally or configure a MongoDB Atlas instance.
   - You may optionally create a `.env` file to store your MongoDB connection string:

   ```bash
   MONGODB_URI=mongodb://localhost:27017/social
   ```

5. **Start the server:**

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3001`.

## Usage

After starting the server, you can test the API routes using **Insomnia**, **Postman**, or any API client of your choice. The available routes allow you to manage users, thoughts, reactions, and friends.

## API Endpoints

### User Routes

- **GET /api/users**  
  Retrieves all users.

- **GET /api/users/:userId**  
  Retrieves a single user by ID with populated thoughts and friend data.

- **POST /api/users**  
  Creates a new user.

  Example:

  ```json
  {
    "username": "lernantino",
    "email": "lernantino@gmail.com"
  }
  ```

- **PUT /api/users/:userId**  
  Updates a user by ID.

- **DELETE /api/users/:userId**  
  Deletes a user by ID and optionally removes all associated thoughts.

### Thought Routes

- **GET /api/thoughts**  
  Retrieves all thoughts.

- **GET /api/thoughts/:thoughtId**  
  Retrieves a single thought by ID.

- **POST /api/thoughts**  
  Creates a new thought and associates it with a user.

  Example:

  ```json
  {
    "thoughtText": "Here's a cool thought...",
    "username": "lernantino",
    "userId": "5edff358a0fcb779aa7b118b"
  }
  ```

- **PUT /api/thoughts/:thoughtId**  
  Updates a thought by ID.

- **DELETE /api/thoughts/:thoughtId**  
  Deletes a thought by ID.

### Reaction Routes

- **POST /api/thoughts/:thoughtId/reactions**  
  Adds a reaction to a specific thought.

- **DELETE /api/thoughts/:thoughtId/reactions/:reactionId**  
  Deletes a reaction by its ID.

### Friend Routes

- **POST /api/users/:userId/friends/:friendId**  
  Adds a friend to a user's friend list.

- **DELETE /api/users/:userId/friends/:friendId**  
  Removes a friend from a user's friend list.

## Models

### User Model

| Field        | Type   | Description                                   |
|--------------|--------|-----------------------------------------------|
| `username`   | String | Unique, required, trimmed                     |
| `email`      | String | Unique, required, must match valid email      |
| `thoughts`   | Array  | Array of _id values referencing Thought model |
| `friends`    | Array  | Array of _id values referencing User model    |

**Virtuals:**
- `friendCount`: Retrieves the length of the user's friends array.

### Thought Model

| Field        | Type   | Description                                        |
|--------------|--------|----------------------------------------------------|
| `thoughtText`| String | Required, 1-280 characters                         |
| `createdAt`  | Date   | Defaults to current timestamp, formatted via getter|
| `username`   | String | Required                                           |
| `reactions`  | Array  | Array of nested documents using Reaction schema    |

**Virtuals:**
- `reactionCount`: Retrieves the length of the reactions array.

### Reaction Schema

| Field          | Type     | Description                                        |
|----------------|----------|----------------------------------------------------|
| `reactionId`   | ObjectId | Mongoose ObjectId, default value is a new ObjectId |
| `reactionBody` | String   | Required, max 280 characters                       |
| `username`     | String   | Required                                           |
| `createdAt`    | Date     | Defaults to current timestamp, formatted via getter|

## Technologies

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose ODM**

## Walkthrough Video

A walkthrough video demonstrating the functionality of the Social Network API can be found [here](https://youtu.be/Cdm6H7Xb6Wg).

The video covers:
- GET routes for users and thoughts
- POST, PUT, and DELETE routes for users and thoughts
- Friend list management
- Reactions to thoughts

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Questions
- If you have further questions, you can contact me at: argenis.dominguez@hotmail.com
- This is my GitHub profile: [RubenDguez](https://github.com/RubenDguez)
