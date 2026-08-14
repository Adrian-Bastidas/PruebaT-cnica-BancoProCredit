# Banco ProCredit - Frontend

Frontend de la prueba técnica FullStack de Banco ProCredit.

## Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS
- Axios
- React Router
- React Hook Form
- Zod

## Arquitectura

El frontend utiliza una arquitectura orientada a features, providers y componentes reutilizables:

```text
src/
├── app/
│   ├── providers/
│   │   └── AppProviders.tsx
│   ├── App.tsx
│   └── ProtectedRoute.tsx
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   │
│   └── employees/
│       ├── components/
│       ├── constants/
│       ├── context/
│       ├── pages/
│       ├── services/
│       └── types/
│
└── shared/
    ├── components/
    ├── services/
    ├── types/
    └── utils/
```

No se utilizan datos mock. Los services consumen directamente la API REST.

## Providers

`AuthProvider` concentra el estado de autenticación, sesión, login, logout y errores.

`EmployeesProvider` concentra empleados, catálogos, estados de carga, creación de empleados y la definición dinámica del formulario.

`AppProviders` compone los providers de la aplicación.

## API

La URL base se configura mediante:

```env
VITE_API_BASE_URL=https://localhost:7139/api
```

El cliente Axios está centralizado en:

```text
src/shared/services/api.ts
```

El interceptor agrega automáticamente:

```http
Authorization: Bearer <token>
```

utilizando el JWT almacenado en `procredit_token`.

### Autenticación

```text
POST /auth/login
```

Request:

```json
{
  "username": "usuario",
  "password": "123456"
}
```

Response esperada por el contrato de Postman:

```json
{
  "token": "...",
  "expiresAt": "..."
}
```

El frontend almacena el token y `expiresAt` en `localStorage`.

### Empleados

```text
GET    /empleados
GET    /empleados/{id}
GET    /empleados/departamento/{departamentoId}
POST   /empleados
PUT    /empleados/{id}
DELETE /empleados/{id}
```

El filtro por departamento utiliza el endpoint específico:

```text
GET /empleados/departamento/{departamentoId}
```

### Departamentos

```text
GET /departamentos
GET /departamentos/{id}
```

### Cargos

```text
GET /cargos
GET /cargos/{id}
```

## Formulario dinámico

El formulario de creación de empleados se genera desde:

```text
src/features/employees/constants/employeeFormData.const.ts
```

Los campos se recorren mediante `map` y son renderizados por:

```text
src/shared/components/dynamic-form/DynamicFormField.tsx
```

Los `select` reciben sus opciones desde los catálogos obtenidos por `EmployeesProvider`.

React Hook Form se mantiene como `FormProvider`, permitiendo que los componentes hijos utilicen `useFormContext`.

## Ejecutar

Requisitos: Node.js 20+ recomendado.

```bash
npm install
npm run dev
```

Abrir `http://localhost:5173`.

## Variables de entorno

Crear `.env` a partir de `.env.example`:

```env
VITE_API_BASE_URL=https://localhost:7139/api
```

Si el certificado HTTPS local de ASP.NET Core no está confiado por el navegador, confiar en el certificado de desarrollo de .NET o utilizar la URL HTTP que exponga tu backend.

## Flujo de datos

```text
Component
   ↓
Provider / Context
   ↓
Service
   ↓
Axios
   ↓
.NET API
```
