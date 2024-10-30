# Proiect React și Nest.js

## 1. Crearea structurilor de bază
Am început prin a crea două foldere: **front-end** și **back-end**.

## 2. Inițializarea proiectelor
- **React.js**:
  ```bash
  npx create-react-app frontend-react
Nest.js:
bash
Copy code
npm install -g @nestjs/cli
nest new backend-nest
3. Dezvoltarea backend-ului
a. Structura directorului
Structura backend-ului este organizată după cum urmează:

Controllers
portfolio.controller.ts
upload.controller.ts
Database
database.module.ts
database.server.ts
Dtos
portfolio.dto.ts
Middleware
rate-limiter.middleware.ts
Models
portfolio.models.ts
Services
portfolio.service.ts
Validators
image.validator.ts
App.module.ts
App.service.ts
Main.ts
b. Conexiunea la baza de date
Am creat un serviciu numit DatabaseService care gestionează conectarea la baza de date PostgreSQL prin Sequelize. Acesta se inițializează la pornirea modulului, stabilește conexiunea și oferă instanța Sequelize pentru utilizare în aplicație. DatabaseModule include acest serviciu, făcându-l disponibil în întreaga aplicație.

c. Modele
Modelele definesc structura bazei de date și modul în care datele sunt gestionate.

d. DTO (Data Transfer Object)
DTO-urile facilitează interacțiunile dintre client și server, permițând preluarea doar a coloanelor necesare (de exemplu, fără ID-uri) și oferind validări și mesaje de eroare detaliate pentru securizarea aplicației.

e. Middleware
Am implementat rate-limiter.middleware.ts pentru a gestiona cererile la server, limitând numărul de cereri la maximum 100 într-un interval de 15 minute, protejând astfel aplicația de abuzuri și atacuri DoS.

f. Serviciul Portfolio
PortfolioService implementează operațiuni CRUD pentru gestionarea portofoliului:

Create: Preluăm fișierul și datele din DTO, sanitizăm datele și aruncăm excepții pentru date invalide.
FindAll și FindOne: Returnează portofoliile sau un portofoliu specificat prin ID.
Update: Actualizăm portofoliul existent, sanitizând datele.
Remove: Șterge portofoliul din baza de date și imaginea asociată.
setImage: Verifică dacă un fișier a fost încărcat și validează URL-ul imaginii.
isValidUrl: Verifică validitatea unui URL folosind expresii regulate.
sanitizeInput: Sanitizarea câmpurilor pentru a preveni introducerea de cod malițios.
g. Controller-ul Portfolio
PortfolioController gestionează cererile HTTP pentru portofoliu:

Constructor: Primește instanța PortfolioService.
create: Endpoint pentru a crea un nou portofoliu, validând datele și încărcând fișierul.
findAll: Endpoint pentru a returna toate portofoliile.
findOne: Endpoint pentru a găsi un portofoliu specificat prin ID.
update: Endpoint pentru a actualiza un portofoliu existent.
remove: Endpoint pentru a șterge un portofoliu specificat prin ID.
h. Validatorul IsUrlOrLocalImagePath
Asigură că image este fie un URL valid, fie un path local în uploads/ cu extensii acceptate.

4. Configurarea AppModule
imports: Module externe, cum ar fi DatabaseModule și MulterModule pentru gestionarea fișierelor.
controllers: Gestionarea cererilor API prin PortfolioController și UploadController.
providers: Servicii, cum ar fi PortfolioService și AppService.
MiddlewareConsumer: Aplicarea middleware-urilor pe rutele specificate.
cookieParser: Gestionarea datelor din cookies pentru autentificare.
RateLimiterMiddleware: Limitarea cererilor pentru a preveni abuzurile.
5. Main.ts
Verificăm dacă există folderul uploads, dacă nu, îl creăm. Activăm CORS pentru a permite cererile doar de la frontend, setăm folderul uploads ca static și configurăm serverul backend pe portul 3002.

6. UploadController
Folosim diskStorage din multer pentru a încărca fișierele în folderul uploads, asigurându-ne că fiecare fișier primește un nume unic pentru a evita suprascrierea.
