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

## 🎮 Com iniciar la aplicació (Frontend)
```sh
cd videojocs/frontend/videogame-loans
ng serve --open
```
