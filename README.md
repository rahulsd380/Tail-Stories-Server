# 🐾 Tail Stories - Pet Care Tips & Stories 🐾

**Tail Stories** offers a valuable mix of practical advice and heartwarming tales for pet owners. It provides essential tips on pet care, including nutrition, exercise, grooming, and veterinary visits, alongside inspiring stories of love and loyalty. The platform also enables users to create and share their own pet stories while offering premium content and advanced social interaction features.

## 🌟 Project Overview

Tail Stories is a web application that empowers pet owners to:
- Share pet care tips and stories.
- Explore practical advice on caring for pets.
- Interact with a vibrant community by upvoting, commenting, and following other users.
- Monetize premium content and offer exclusive advice.

## 🎯 Project Objectives

- Develop a full-stack web application with secure JWT-based authentication.
- Create a responsive, mobile-friendly user interface.
- Implement a MongoDB database for scalable data management.
- Enable rich content creation using a text editor.
- Integrate payment gateways like **Aamarpay** or **Stripe** for premium content access.
- Enable user social interactions (upvotes, comments, and following).
- Design intuitive admin and user dashboards.

---

## 🔧 Tech Stack

**Frontend:**
- React.js with Tailwind CSS for responsive design.
- React Router for navigation.
- Rich text editor or Markdown for post creation.

**Backend:**
- Node.js with Express.js for API development.
- MongoDB for database management.
- JWT for authentication.

**Other:**
- Payment Gateway: Aamarpay / Stripe for premium content subscriptions.
- Upvote and commenting system for user engagement.

---

## 🚀 Functional Features

### 1. **User Authentication & Authorization**
- **Registration**: Users can sign up with email, password, and other details.
- **Login/Logout**: Secure JWT-based login and logout.
- **Password Recovery**: Forgot password and recovery flow.

### 2. **User Profile Management**
- **Profile Update**: Users can edit their personal info and profile picture.
- **My Profile**: Displays user stories, tips, followers, and following.

### 3. **Content Creation & Sharing**
- **Rich Text Editor**: Users can create pet care tips and stories.
- **Image Attachments**: Users can add images to their posts.
- **Categorization**: Classify posts as "Tip" or "Story".
- **Monetization**: Users can create premium content for exclusive insights.

### 4. **Upvote & Downvote System**
- Users can upvote or downvote posts.
- Posts are sorted based on upvotes for better discovery.

### 5. **Commenting System**
- Comment on posts, with options to edit or delete comments.
- Replying to comments is optional.

### 6. **Premium Content & Payment Integration**
- Integration with Aamarpay or Stripe for unlocking premium content.
- Premium posts are accessible only after completing payment.

### 7. **News Feed**
- Dynamic feed with infinite scroll to showcase latest posts.
- Advanced search and filtering by keywords and categories.
- Premium content is highlighted with a special badge.

### 8. **Following System**
- Follow other users to see their content in the feed.

### 9. **Admin Dashboard**
- Manage users, content, and payment history.
- Publish or unpublish posts.

---

## 📜 API Endpoints

### 1. **User Authentication**

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| POST   | `/api/auth/register`    | Register a new user             |
| POST   | `/api/auth/login`       | User login and get JWT token    |
| POST   | `/api/auth/logout`      | Logout the user                 |
| POST   | `/api/auth/password-recovery` | Recover forgotten password |
| POST   | `/api/auth/reset-password` | Reset password               |

### 2. **User Profile**

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| GET    | `/api/users/profile`    | Get current user profile        |
| PATCH  | `/api/users/profile`    | Update user profile             |
| GET    | `/api/users/:id/posts`  | Get user's posts                |
| GET    | `/api/users/follow/:id` | Follow/unfollow a user          |

### 3. **Post Management**

| Method | Endpoint                 | Description                     |
|--------|--------------------------|---------------------------------|
| GET    | `/api/posts`              | Get all posts                   |
| GET    | `/api/posts/:id`          | Get a specific post             |
| POST   | `/api/posts`              | Create a new post               |
| PATCH  | `/api/posts/:id`          | Edit a post                     |
| DELETE | `/api/posts/:id`          | Delete a post                   |
| POST   | `/api/posts/:id/upvote`   | Upvote a post                   |
| POST   | `/api/posts/:id/downvote` | Downvote a post                 |

### 4. **Comment Management**

| Method | Endpoint                        | Description                   |
|--------|---------------------------------|-------------------------------|
| POST   | `/api/posts/:postId/comments`   | Add a comment                 |
| PATCH  | `/api/comments/:commentId`      | Edit a comment                |
| DELETE | `/api/comments/:commentId`      | Delete a comment              |

### 5. **Payment Integration**

| Method | Endpoint                 | Description                     |
|--------|--------------------------|---------------------------------|
| POST   | `/api/payments/checkout`  | Initiate payment for premium content |
| GET    | `/api/payments/status`    | Check payment status            |

---

## 🌐 Installation & Setup

### 1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/tail-stories.git
cd tail-stories
npm install
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET=your_stripe_secret_key
AAMARPAY_SECRET=your_aamarpay_secret_key
npm run dev

### Key Sections Explained:
- **Tech Stack** outlines the technologies used.
- **Functional Features** clearly explain the system's functionality.
- **API Endpoints** are structured to show what routes are available for the backend.
- **Installation & Setup** provides step-by-step instructions to get the project up and running.
- **Admin Functionality** highlights special features for the admin.
- **UI Design & Animations** describes visual and interactive elements of the project.

This `README.md` provides clear and concise documentation, while also being visually engaging. You can modify it as per your project needs!
