# Tickety - A Ticket Management System

Tickety is a powerful and intuitive ticket management system designed to streamline issue tracking and improve collaboration between teams. Built with **Django** for the backend and **React** for the frontend, it offers a modern, scalable, and user-friendly solution for managing service tickets, assigning agents, and tracking statuses.

With Tickety, you can:

- Create, assign, and track tickets.
- Manage user roles such as Admins and Agents.
- Seamlessly track ticket statuses and priorities.
- Ensure efficient issue resolution through a centralized dashboard.

---

## Features

- **User Authentication**: Secure login with custom user roles (Admins, Agents, and Users) using JWT.
- **Ticket Management**: Easily create, update, and resolve tickets.
- **Agent Assignment**: Assign tickets to agents directly from the admin dashboard.
- **Custom Ticket Fields**: Include issue types, urgency levels, and descriptions.
- **Responsive Design**: Built for both desktop and mobile views.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Python 3.12
- Node.js and npm
- PostgreSQL (or any compatible database)
- Git

---

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/BKM14/Tickety.git
   cd tickety/backend
   ```

2. **Set Up a Virtual Environment**

   ```bash
   python3 -m venv ticketenv
   source ticketenv/bin/activate  # For Unix/Linux
   ticketenv\Scripts\activate     # For Windows
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up the Database**

   - Configure your database settings in `settings.py`.
   - Enter all the environment variables in the .env file
   - Run migrations:

     ```bash
     cp .env.example .env
     python manage.py makemigrations
     python manage.py migrate
     ```

5. **Seed the Database**

   ```bash
   python manage.py seed_db
   ```

6. **Run the Development Server**

   ```bash
   python manage.py runserver
   ```

The backend will be accessible at `http://localhost:8000/`.

---

### Frontend Setup

1. **Navigate to the Frontend Directory**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**
    - Install all the required dependencies
    - Set environment variables in .env file

   ```bash
   npm install
   cp .env.example .env
   ```

3. **Start the React Development Server**

   ```bash
   npm run dev
   ```

The frontend will be accessible at `http://localhost:5173/`.

## Contributing

Contributions are welcome! If you'd like to improve Tickety, feel free to:

1. Fork the repository.
2. Create a new feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

4. Push to the branch:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request.

---

## Support

For questions, issues, or feature requests, please open an issue in the repository.

Happy ticketing with **Tickety**!
