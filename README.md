# 📌 VideoGameLoan

## 📂 Repositori

[Enllaç al repositori](https://github.com/OctagonalDefence/videogameloan) 

---

## ⚙️ Instal·lació i configuració

### 1️⃣ Clonar el repositori
```sh
git clone <URL_DEL_REPOSITORI>
```

### 2️⃣ Configuració de la base de dades
- Obrir **SQL Server Management Studio**.
- Executar les consultes SQL trobades en el fitxer `inicials/SQLQuery1.sql` per crear les taules i dades inicials.

### 3️⃣ Instal·lació de dependències

#### Backend
```sh
cd videojocs/backend
npm install
npm install express-rate-limit express-validator
```

#### Frontend
```sh
cd videojocs/frontend/videogame-loans
npm install
```

### 4️⃣ Fitxers de configuració
Alguns fitxers no estan inclosos per seguretat. Has de crear un fitxer `.env` dins `backend/` amb la configuració següent:

```
DB_SERVER=localhost
DB_USER=<usuari>
DB_PASSWORD=<contrasenya>
DB_DATABASE=videogameloans
PORT=3000
JWT_SECRET=<clau_secreta>
```

---

## 🚀 Com iniciar la API (Backend)

### Producció
```sh
cd videojocs/backend
npm start
```

### Desenvolupament (amb nodemon)
```sh
cd videojocs/backend
npm run dev
```

---

## 🎮 Com iniciar la aplicació (Frontend)
```sh
cd videojocs/frontend/videogame-loans
ng serve --open
```

---

## 🔐 Procés d'autenticació
1. L'usuari es registra amb email i contrasenya.
2. El sistema genera un **token JWT** i el retorna.
3. Per accedir a endpoints protegits, s'ha d'enviar el **token** a l'encapçalament `Authorization: Bearer <token>`.

---

## 🛠️ Diagrama Entitat-Relació i Sequències
[Enllaç al model ER](https://github.com/OctagonalDefence/videogameloan/blob/main/inicials/ModelER.png)
[Enllaç al Diagrama de Sequències](https://github.com/OctagonalDefence/videogameloan/blob/main/inicials/ModelSeq.png)

---

## 🔗 Endpoints

### 🔹 Autenticació

#### 📌 Registre
**POST** `/api/v1/users/register`
##### 🔹 Body Request (JSON)
```json
{
  "email": "prova2@email.com",
  "name": "prova2",
  "password": "prova2"
}
```
##### 🔹 Resposta
```json
{
  "message": "Usuari registrat correctament",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByb3ZhMkBnbWFpbC5jb20iLCJpYXQiOjE3NDkzODkxODR9.-lkEk9-5BSmtFCBof_DvtrhAyiTyP1xXa3A5aupLCO0"
}
```
Status: `201 Created`

#### 📌 Login
**POST** `/api/v1/users/login`
##### 🔹 Body Request (JSON)
```json
{
  "username": "prova2@email.com",
  "password": "prova2"
}
```
##### 🔹 Resposta
```json
{
  "message": "Login correcte",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByb3ZhMkBnbWFpbC5jb20iLCJpYXQiOjE3NDkzODkxODR9.-lkEk9-5BSmtFCBof_DvtrhAyiTyP1xXa3A5aupLCO0"
}
```
Status: `200 OK`

### 🔹 Gestionar Videojocs

#### 📌 Obtenir tots els videojocs (paginació i ordenació)
**GET** `/api/v1/games/getAllGames?page=1&limit=10&sortBy=Nom&order=asc`
##### 🔹 Headers
```
Authorization: Bearer <jwt_token>
```
##### 🔹 Resposta
```json
{
    "data": [
        {
            "UID": "69890008-0454-4F81-9299-BAA3871DBCA7",
            "Nom": "Red Dead Redemption 2",
            "Any_Publicacio": 2018,
            "Unitats": 90,
            "Plataforma": "PlayStation 4",
            "Publicadora": "Rockstar Games"
        },
        {
            "UID": "7928CC95-728C-4DCD-8E43-BB3B6F14A949",
            "Nom": "Cyberpunk 2077",
            "Any_Publicacio": 2020,
            "Unitats": 110,
            "Plataforma": "PC",
            "Publicadora": "CD Projekt"
        },
        {
            "UID": "EE387D9B-F76A-4374-9D0F-A02B9C72D1FD",
            "Nom": "Halo Infinite",
            "Any_Publicacio": 2021,
            "Unitats": 80,
            "Plataforma": "Xbox Series X",
            "Publicadora": "Xbox Game Studios"
        },
        {
            "UID": "6A18AB83-9F4B-4175-AAE6-3612857FA8DA",
            "Nom": "Elden Ring",
            "Any_Publicacio": 2022,
            "Unitats": 120,
            "Plataforma": "PC",
            "Publicadora": "Bandai Namco"
        },
        {
            "UID": "3F5DF6B0-4D54-4FE6-9525-2AE2442689E0",
            "Nom": "God of War Ragnarök",
            "Any_Publicacio": 2022,
            "Unitats": 150,
            "Plataforma": "PlayStation 5",
            "Publicadora": "Sony Interactive Entertainment"
        },
        {
            "UID": "21AC0F34-B3CC-441A-BF91-A1D0A1589A92",
            "Nom": "The Legend of Zelda: Tears of the Kingdom",
            "Any_Publicacio": 2023,
            "Unitats": 200,
            "Plataforma": "Nintendo Switch",
            "Publicadora": "Nintendo"
        }
    ],
    "page": 1,
    "limit": 10,
    "total": 6,
    "totalPages": 1
}
```
Status: `200 OK`

---

## ⚠️ Errors comuns
| Codi | Descripció |
|------|------------|
| 400  | Petició incorrecta |
| 401  | No autoritzat (Falta token) |
| 403  | Prohibit (Token invàlid) |
| 404  | No trobat |
| 500  | Error intern del servidor |

---

## 📬 Proves amb Postman

Trobaràs un fitxer d'import de proves a [postman.json](postman.json). Importa-la a Postman per provar tots els endpoints.

---
