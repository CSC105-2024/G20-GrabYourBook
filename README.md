# G20-MasterHasGivenDobbyA-PreHack-2025

## :notebook: Grab Your Book (Choose Your Vibe)

_Grab Your Book is a website where users can reserve books online. Users can search for books by typing the title or browsing by category. Each book shows its details and whether it is available and how many copies that available. If the book is not available, users will see the nearest available date. Users can borrow a book for 5 days. They can also return it early or cancel the booking before picking it up. If all copies are booked, users can still make an advance reservation. This website helps solve the common problem of going to the library only to find that the book is not available, by showing exactly when it will be and how many copies will be ready._

---

## :eight_spoked_asterisk: Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CSC105-2024/G20-GrabYourBook.git
   cd G20-GrabYourBook
   ```

---
## :round_pushpin: Alternative for running the server

- Run Front-end only:
  ```bash
  npm run frontend
  ```
- Run Back-end only:
  ```bash
  npm run backend
  ```
- Run the project (front-end & back-end):
  ```bash
  npm run dev
  ```
## :computer: Frontend - React

### :space_invader: Tech Stack

- React.ts
- Vite
- Axios
- React Router DOM
- Tailwind CSS
- Zod
- React Icon

### :bulb: Getting Started - React Client

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The client will be running on [http://localhost:5173](http://localhost:5173).

---

## :open_file_folder: Backend - Node.js

### :space_invader: Tech Stack

- Node.js
- Hono
- Postgresql
- Bcrypt
- JWT

### :electric_plug: API Endpoints

- User 

| Method |          Endpoint        |        Description           |
|--------|--------------------------|------------------------------|
| GET    | `/user/getuser/:id`      | Get user by using user ID.   |
| POST   | `/user/register`         | Create new user.             |

- Authentication

| Method |       Endpoint      |               Description                    |
|--------|---------------------|----------------------------------------------|
| POST   | `/auth/register`    | Create the account for the user.             |
| POST   | `/auth/login`       | Loging in to navigate to our website.        |
| GET    | `/auth/logout`      | To delete the token and logout the website.  |

- Books

| Method |            Endpoint            |               Description                    |
|--------|--------------------------------|----------------------------------------------|
| GET    | `/book/search/:name`           | To search the book title by name.            |
| GET    | `/book/detailBook`             | Get all of detail book.                      |
| GET    | `/book/getdetailbook/:id`      | Get detail of a book by book ID.             |
| GET    | `/book/availableDate/:bookId`  | To check the status of the book by book ID.  |

- Borrow

| Method |                Endpoint             |               Description                    |
|--------|-------------------------------------|----------------------------------------------|
| GET    | `/borrow/borrow/:id`                | Get a book that borrowed by borrow ID.       |
| GET    | `/borrow/mybook/:user`              | Get all of borrowed by using user ID.        |
| GET    | `/borrow/isAvailable/:bookId/:date` | Get status by query book ID and booked date. |
| GET    | `/borrow/borrow/auto-return`        | To test auto return after booked.            |
| POST   | `/borrow/borrow`                    | To reservation a book.                       |
| PUT    | `/borrow/return/:id`                | Return a book before auto-return.            |
| DELETE | `/borrow/delete:id`                 | Delete the reaervation by using borrow ID.   |

### :bulb: Getting Started - Node.js Server

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies & Genrate the database:
   ```bash
   npm install
   npx prisma generate
   ```

3. Create a `.env` file and configure the following variables:
   ```
   DATABASE_URL="postgresql://dobby:ybbod@db.dobby.sunthewhat.com:5432/dobby_db?schema=public"

   JWT_SECRET="You can generate the JWT secret at https://jwtsecret.com/generate"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. The server will be running on [http://localhost:3000](http://localhost:3000)
