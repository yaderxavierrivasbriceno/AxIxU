# AXIXU - Inicio rapido

## 1) Backend (Django + Stripe)

Configura variables del backend:

```powershell
cd C:\Users\yader\OneDrive\Desktop\AXIXU\backend
copy .env.example .env
```

Edita `backend/.env` con tu clave secreta de Stripe:

```env
STRIPE_SECRET_KEY=tu_sk_test
```

Instala dependencias y arranca backend:

```powershell
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend en navegador:

- http://127.0.0.1:8000/health/
- http://127.0.0.1:8000/admin/

Endpoint de Stripe (backend):

- `POST http://127.0.0.1:8000/api/payments/create-checkout-session/`

## 2) Frontend (Next.js)

Configura variables del frontend:

```powershell
cd C:\Users\yader\OneDrive\Desktop\AXIXU\frontend\nextjs
copy .env.example .env.local
```

Edita `frontend/nextjs/.env.local` y coloca tus claves:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_clave_google_maps
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=tu_pk_test
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
```

Arranca frontend:

```powershell
npm install
npm run dev
```

Frontend en navegador:

- http://localhost:3000
- http://localhost:3000/mapa
- http://localhost:3000/pago

## 3) Crear usuario admin de Django

```powershell
cd C:\Users\yader\OneDrive\Desktop\AXIXU\backend
.\.venv\Scripts\Activate.ps1
python manage.py createsuperuser
```

## 4) Seguridad de claves

- `pk_test` (publica): frontend.
- `sk_test` (privada): solo backend.
- `whsec` (firma webhook): solo backend.
- Nunca subas `.env` ni `.env.local` a GitHub.
- Si compartes una clave en chat/publico, rotala en Stripe.
