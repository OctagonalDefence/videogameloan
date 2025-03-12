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
- Executar les consultes SQL trobades en el fitxer `sql.sql` per crear les taules i dades inicials.

### 3️⃣ Instal·lació de dependències
#### Backend
```sh
cd videojocs/backend
npm install
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
DB_USER=victus
DB_PASSWORD=victus
DB_DATABASE=videogameloans
PORT=3000
JWT_SECRET=<clau_secreta>
```

---

## 🚀 Com iniciar la API (Backend)

```sh
cd videojocs/backend
node server.js
```

---

## 🔐 Procés d'autenticació
1. L'usuari es registra amb email i contrasenya.
2. El sistema genera un **token JWT** i el retorna.
3. Per accedir a endpoints protegits, s'ha d'enviar el **token** a l'encapçalament `Authorization: Bearer <token>`.

---

---

## 🛠️ Diagrama Entitat-Relació
[Enllaç al model ER](https://github.com/OctagonalDefence/videogameloan](https://github.com/OctagonalDefence/videogameloan/blob/main/inicials/ModelER.png
) 

---

## 🔗 Endpoints

### 🔹 Autenticació
#### 📌 Registre
**POST** `/api/users/register`
##### 🔹 Body Request (JSON)
```json
{
  "username": "exemple",
  "email": "exemple@email.com",
  "password": "contrasenya"
}
```
##### 🔹 Resposta
```json
{
  "message": "Usuari registrat correctament",
  "token": "<jwt_token>"
}
```
Status: `201 Created`

#### 📌 Login
**POST** `/api/users/login`
##### 🔹 Body Request (JSON)
```json
{
  "email": "exemple@email.com",
  "password": "contrasenya"
}
```
##### 🔹 Resposta
```json
{
  "message": "Login correcte",
  "token": "<jwt_token>"
}
```
Status: `200 OK`

### 🔹 Gestionar Videojocs
#### 📌 Obtenir tots els videojocs
**GET** `api/games/getAllGames`
##### 🔹 Resposta
```json
[
  {
    "id": 1,
    "title": "The Legend of Zelda",
    "platform": "Nintendo Switch",
    "available": true
  }
]
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


## 🎮 Com iniciar la aplicació (Frontend)
```sh
cd videojocs/frontend/videogame-loans
ng serve --open
```
