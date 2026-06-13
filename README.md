# Sprint 10 - Blog API with MongoDB Atlas

## Project Overview

This project is a RESTful Blog API developed using Node.js, Express.js, MongoDB Atlas, and Mongoose. The application demonstrates CRUD operations, cloud database integration, object data modeling (ODM), and relational data handling using Mongoose's `populate()` method.

---

## Technologies Used

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Postman
* dotenv

---

## Project Structure

```
week-10-project/
│
├── controllers/
│   ├── postController.js
│   └── userController.js
│
├── models/
│   ├── Post.js
│   └── User.js
│
├── routes/
│   ├── postRoutes.js
│   └── userRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

### Posts API

* Create a new post
* Retrieve all posts
* Delete a post
* Retrieve the top 3 most recent posts
* Populate author details in posts

### Users API

* Create a new user
* Retrieve all users
* Update user information

### Database Features

* MongoDB Atlas cloud database integration
* Mongoose schemas and models
* Relationship between Users and Posts using ObjectId references
* Data persistence in the cloud

---

## API Endpoints

### Users

#### Create User

```
POST /users
```

#### Get All Users

```
GET /users
```

#### Update User

```
PUT /users/:id
```

---

### Posts

#### Create Post

```
POST /posts
```

#### Get All Posts

```
GET /posts
```

#### Delete Post

```
DELETE /posts/:id
```

#### Get Top 3 Recent Posts

```
GET /posts/recent
```

---

## Installation

1. Clone the repository:

```bash
git clone <https://github.com/anucodeverse/BlogAPICluster>
```

2. Navigate to the project directory:

```bash
cd week-10-project
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

5. Start the server:

```bash
npm start
```

---

## Testing

All endpoints were tested using Postman.

The application was verified by:

* Creating users
* Creating posts
* Updating user details
* Deleting posts
* Fetching posts with populated author data
* Confirming data persistence through MongoDB Atlas

---

## Learning Outcomes

Through this project, I learned:

* How to connect an Express application to MongoDB Atlas.
* How to use Mongoose schemas and models.
* How to perform CRUD operations with Mongoose.
* How to establish relationships between collections using ObjectId references.
* How to use `populate()` to retrieve related data.
* How to organize backend code using controllers, routes, and models.

---

## Author

Ananthalakshmi Surla
