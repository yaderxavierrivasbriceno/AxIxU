# AXIXU - Inicio rapido

## 1) Base de datos (PostgreSQL)

Opcional rapido con Docker:

```powershell
docker run --name axixu-postgres -e POSTGRES_DB=axixu -e POSTGRES_USER=axixu -e POSTGRES_PASSWORD=axixu -p 5432:5432 -d postgres:16
```

## 2) Backend (Django)

Instala dependencias y arranca backend:

```powershell
cd C:\Users\yader\OneDrive\Desktop\AXIXU\backend
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
python manage.py migrate
python manage.py runserver
```

Backend en navegador:

- http://127.0.0.1:8000/health/
- http://127.0.0.1:8000/admin/

Variables de entorno minimas en `backend/.env`:

```env
POSTGRES_DB=axixu
POSTGRES_USER=axixu
POSTGRES_PASSWORD=axixu
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
```

## 3) Frontend (Next.js)

Arranca frontend:

```powershell
cd C:\Users\yader\OneDrive\Desktop\AXIXU\frontend\nextjs
npm install
npm run dev
```

Frontend en navegador:

- http://localhost:3000
- http://localhost:3000/idiomas
- http://localhost:3000/agentes-ia

## 4) Crear usuario admin de Django

```powershell
cd C:\Users\yader\OneDrive\Desktop\AXIXU\backend
.\.venv\Scripts\Activate.ps1
python manage.py createsuperuser
```

## 5) Seguridad de entorno

- Nunca subas `.env` ni `.env.local` a GitHub.
- Usa `DJANGO_SECRET_KEY` propia en produccion.

## 6) Deploy (Vercel + Render)

Frontend (Vercel):
- Root del proyecto: `frontend/nextjs`
- Env: `NEXT_PUBLIC_BACKEND_URL=https://TU_BACKEND.onrender.com`

Backend (Render web service):
- Root directory: `backend`
- Build command:
```bash
pip install -r requirements.txt && python manage.py collectstatic --no-input
```
- Start command:
```bash
gunicorn core.wsgi:application
```

Variables recomendadas en Render backend:
```env
DJANGO_SECRET_KEY=tu_secreto_seguro
DJANGO_DEBUG=false
DJANGO_ALLOWED_HOSTS=tu-backend.onrender.com
CORS_ALLOWED_ORIGINS=https://tu-frontend.vercel.app
CSRF_TRUSTED_ORIGINS=https://tu-frontend.vercel.app
DATABASE_URL=postgresql://...
```

Notas:
- Si usas previews de Vercel, agrega `CORS_ALLOWED_ORIGIN_REGEXES` para permitir subdominios preview.
- Tienes un blueprint base en `render.yaml` que puedes importar en Render.
