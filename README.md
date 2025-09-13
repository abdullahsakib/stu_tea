# Teacher-Student Q&A (Django + React Vite)
## Quick start
- Backend: `cd backend` -> `pip install -r requirements.txt` -> `python manage.py migrate` -> `python manage.py runserver`
- Frontend: `cd frontend` -> `npm install` -> `npm run dev`
## Render deploy
- Backend: root dir `backend`, build `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput`, start `gunicorn backend.wsgi:application`
- Frontend: root dir `frontend`, build `npm install && npm run build`, publish dir `dist`, set env `VITE_BACKEND_URL` to backend URL
