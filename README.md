# User Directory Dashboard

A responsive React application that fetches users from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) and presents them in a searchable, sortable table with a detailed profile view per user.

---

## Features

- **Dashboard Table** — lists all users with Name, Email, Phone, and Company
- **Search** — client-side filtering by name or email (live as you type)
- **Sorting** — click the Name or Company column header to toggle ascending / descending order
- **User Detail Page** — click any row to open a full profile with contact info, address (Google Maps link), and company details
- **Loading & Error States** — spinner while fetching; graceful error message on failure
- **Responsive Design** — detail grid collapses to a single column on small screens

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Library | React 18 |
| Routing | React Router DOM v6 |
| Build Tool | Vite 5 |
| Styling | Plain CSS (CSS variables, no framework) |
| Data Source | JSONPlaceholder REST API |

---

## Project Structure

```
Dashboard/
├── index.html              # HTML entry point
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx            # React DOM root
    ├── App.jsx             # Route definitions
    ├── index.css           # Global styles & CSS variables
    └── pages/
        ├── Dashboard.jsx   # User table with search & sort
        └── UserDetail.jsx  # Full user profile view
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Navigate to the project folder
cd Dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will open automatically at **http://localhost:5173**.

### Build for Production

```bash
npm run build
```

Output is placed in the `dist/` folder. To preview the production build locally:

```bash
npm run preview
```

---

## API

Data is fetched from the public JSONPlaceholder API — no API key required.

| Endpoint | Used for |
|---|---|
| `GET /users` | Load all users on the Dashboard |
| `GET /users/:id` | Load a single user on the Detail page |

---

## Pages

### `/` — Dashboard

| Element | Description |
|---|---|
| Search input | Filters rows by `name` or `email` |
| Name column header | Sorts alphabetically by full name |
| Company column header | Sorts alphabetically by company name |
| User row (click) | Navigates to `/user/:id` |

### `/user/:id` — User Detail

Displays all fields returned by the API:

- **Contact** — Email, Phone, Website
- **Address** — Street, Suite, City, Zipcode, Map link
- **Company** — Name, Catchphrase, Business strategy

---

## Screenshots

> Run `npm run dev` and open [http://localhost:5173](http://localhost:5173) to see the app live.

---

## License

This project is open source and available under the [MIT License](LICENSE).
