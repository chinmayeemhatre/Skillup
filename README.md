<<<<<<< HEAD
# SKILLUP - Gamified Learning & Mentorship Platform

SKILLUP is a Django + SQLite web platform that helps college students become software developers through a seven-level roadmap, gamification, and peer mentorship.

## Features

- Django authentication: signup, login, logout, profile editing.
- Seven learning levels: Basics, DSA, Projects, Resume, Interview Prep, Job Apply, Internship Ready.
- Every level includes theory, video links, reference links, tasks, checklist progress, example questions, mini project ideas, and tips.
- Gamification: XP, daily streak, badges, level progress, total progress, and leaderboard.
- Dashboard: current level, XP, progress percent, completed tasks, streak, badges, next tasks, and recent activity.
- Mentorship: same-level peers, users one or two levels above, help requests, and stored message threads.
- Dark blue/violet glassmorphism UI with responsive cards, timeline roadmap, and smooth hover states.

## Project Structure

```text
miniproject/
|-- manage.py
|-- db.sqlite3
|-- README.md
|-- skillup/
|   |-- __init__.py
|   |-- settings.py
|   |-- urls.py
|   |-- asgi.py
|   `-- wsgi.py
|-- learning/
|   |-- admin.py
|   |-- apps.py
|   |-- forms.py
|   |-- models.py
|   |-- urls.py
|   |-- views.py
|   |-- migrations/
|   |   `-- 0001_initial.py
|   `-- management/
|       `-- commands/
|           `-- seed_skillup.py
|-- templates/
|   |-- base.html
|   |-- registration/
|   |   |-- login.html
|   |   `-- signup.html
|   `-- learning/
|       |-- home.html
|       |-- dashboard.html
|       |-- roadmap.html
|       |-- level_detail.html
|       |-- leaderboard.html
|       |-- mentors.html
|       |-- chat.html
|       `-- profile.html
|-- static/
|   `-- skillup/
|       |-- css/
|       |   `-- app.css
|       `-- js/
|           `-- app.js
|-- index.html, dashboard.html, level.html, ...
`-- server/
    `-- old Node prototype files preserved for reference
```

## Setup Instructions

1. Open a terminal in this folder:

```bash
cd c:\Users\Chinmayee\miniproject
```

2. Confirm Django is available:

```bash
py -m django --version
```

3. Apply migrations:

```bash
py manage.py migrate
```

4. Load complete demo content:

```bash
py manage.py seed_skillup
```

5. Start the server:

```bash
py manage.py runserver
```

6. Open:

```text
http://127.0.0.1:8000/
```

## Demo Accounts

All demo accounts use:

```text
password123
```

| Username | Role feel | Level |
|---|---:|---:|
| aarav | Student | 2 |
| priya | Mentor | 4 |
| rahul | Mentor | 5 |
| karan | Mentor | 6 |
| meera | Senior mentor | 7 |

## Useful Routes

- `/` - landing page
- `/signup/` - create account
- `/login/` - login
- `/dashboard/` - user dashboard
- `/roadmap/` - seven-level timeline
- `/level/1/` through `/level/7/` - detailed learning pages
- `/leaderboard/` - XP leaderboard
- `/mentors/` - peer and mentor discovery
- `/profile/` - profile settings

## Verification Run

These checks were run successfully:

```bash
py manage.py makemigrations learning
py manage.py migrate
py manage.py seed_skillup
py manage.py check
```

The main routes were also rendered with Django's test client and returned HTTP 200.
=======
# Skillup
SKILLUP is a web-based gamified learning platform built using Django and MongoDB that helps students follow a structured roadmap from beginner to internship-ready. It includes level-based progression, XP system, progress tracking, and mentorship features to improve consistency, motivation, and career readiness.
>>>>>>> 64272904e3b30f383649715a664ac1b16f4576c3
