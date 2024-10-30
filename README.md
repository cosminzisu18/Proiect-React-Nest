# Documentația Proiectului

### Tehnologii Utilizate
```
- React.js
- Nest.js
- Bootstrap
- PostgreSQL
```

### Rezumat al rezumatului :)

#### Am creat backendul cu o structură destul de curată
  - controllers - CRUD pentru portofoliu și post pentru upload imagine,
    
  - database - conectarea la PostgreSQL,
    
  - models - structura bazei de date,
    
  - dto - modelele pe care le-am folist și cu constrângeri complexe,
    
  - middleware - pentru securitate am folosit rate limiting,
    
  - services - serviciile pentru controller, inclus ștergere imagine din upload/ și protejarea XSS prin sanitizare,
    
  - validators - am folosit pentru imagini din dto să accepte ori URL-uri, ori imaginile din uploads,
    
  - module.ts - am inclus middleware-urile de specificarea destinației ale imaginilor (/uploads) și de rate limiter, pe lângă includerea Modulului, Controllerelor și Serviciilor,
    
  - main.ts - verifică dacă există directorul uploads, dacă nu, îl creează, activez CORS, tot ca securitate, numai pentru portul frontend-ului React, fac fișierele statice din uploads pentru a putea fi accesate prin URL și pornesc serverul backend pe portul 3002.

#### Am creat frontendul la fel, cu o structură curată
  - am inclus bootstrap, toast
  - în services la portfolioService am preluat serviciile CRUD și am preluat din backend erorile personalizate, iar la toastService am inclus toast-ul
  - acum în components am făcut componentele care au file .js și .css:
    - Footer : un simplu footer care să se păstreze în partea de jos a paginii
    - Home : la fel, un simplu home, responsive, în care prezint o imagine și câteva detalii
    - Modal : este modalul utilizat pentru ștergerea unui portofoliu
    - Navbar : un navbar bootstrap, responsive care prezintă linkurile către componentele Home și Portfolio
    - Portfolio:
        - Portfolio.js: cu bootstrap am creat card-urile cu datele cerute (imagine, titlu, descriere, link și status), am folosit getall, getid, delete din serviciu, un loading și afișarea în funcție de vizibilitate
        - PortfolioModal.js: aici am creat modalul pentru adăugare/modificare portofoliu. În funcție de dacă primește id sau nu se hotărăște dacă acest modal este pentru adăugare sau modificare. dacă primește id, se vor completa automat inputurile imaginile vor putea fi introduse ori prin URL, ori prin upload și vor fi preluate ori prin URL, ori prin URL-ul către imaginea din upload încărcată
  - Pe lângă asta m-am asigurat prin teste că tot funcționează, am utilizat CSS pentru stilizare și pentru responsive și am mizat pe un cod cât mai curat și mai simplu de înțeles.

    
## Bun, acum să începem cu rezumatul complet!

### 1. Structura Proiectului
Am creat două foldere:

    frontend-react
    backend-nest

### 2. Crearea Proiectului
React.js:

          npx create-react-app frontend-react
          
          cd frontend-react
          
          npm install bootstrap
          
          npm install react-toastify
          
          npm install axios
          
          npm install @fortawesome/free-solid-svg-icons
          
          npm install react-router-dom
          
          npm install @mui/material @emotion/react @emotion/styled


Nest.js:

        npm i -g @nestjs/cli
        
        nest new backend-nest
        
        cd backend-nest
        
        npm install @nestjs/platform-express
        
        npm install @nestjs/cors
        
        npm install @nestjs/rate-limiter
        
        npm install multer
        
        npm install class-validator
        
        npm install dompurify
        
        npm install fs
        
        npm install path
        
        npm install jsdom
        
        npm install sequelize-typescript
        
        npm install sequelize
        
        npm install @nestjs/sequelize


## 3. Detalii Backend

### a. Structura Backend-ului

```plaintext
backend-nest/
├── src/
│   ├── controllers/
│   │   ├── portfolio.controller.ts
│   │   └── upload.controller.ts
│   ├── database/
│   │   ├── database.module.ts
│   │   └── database.server.ts
│   ├── dtos/
│   │   └── portfolio.dto.ts
│   ├── middleware/
│   │   └── rate-limiter.middleware.ts
│   ├── models/
│   │   └── portfolio.models.ts
│   ├── services/
│   │   └── portfolio.service.ts
│   ├── validators/
│   │   └── image.validator.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
└── uploads/ 
```

### b. Database
Am creat un serviciu numit DatabaseService care se ocupă de conectarea la baza de date PostgreSQL prin Sequelize. Acesta se inițializează când modulul pornește, stabilește conexiunea și oferă instanța Sequelize pentru a fi folosită în restul aplicației. Modulul DatabaseModule include acest serviciu, făcându-l disponibil în întreaga aplicație.

### c. Models
Modelele creează structura bazei de date și definesc cum arată datele stocate. Ele sunt responsabile pentru gestionarea datelor.

### d. DTO (Data Transfer Object)
DTO-urile se ocupă de interacțiunile dintre client și server. Ele permit preluarea doar a coloanelor necesare și oferă validări și mesaje de eroare mai complexe pentru a securiza aplicația.

### e. Middleware
Am implementat rate-limiter.middleware.ts pentru a gestiona cererile către server. Această măsură de securitate limitează numărul de cereri la maximum 100 într-un interval de 15 minute.

### f. PortfolioService
Implementăm operațiuni CRUD pentru gestionarea portofoliului, folosind datele din PortfolioDto.

Create: Sanitizăm datele folosind DOMPurify.

FindAll și FindOne: Returnează portofoliile din baza de date.

Update: Actualizăm un portofoliu existent, sanitizând datele.

Remove: Ștergem portofoliul din baza de date cu tot cu imaginea asociată din ../../uploads/.

setImage: Verifică dacă un fișier a fost încărcat.

isValidUrl: Verifică validitatea URL-ului.

sanitizeInput: Sanitizarea câmpurilor pentru a preveni introducerea de cod malițios HTML sau JavaScript.

### g. PortfolioController
Gestionăm cererile HTTP pentru resursa de portofoliu, permițând operațiuni CRUD.

create: Endpoint pentru a crea un nou portofoliu.

findAll: Endpoint pentru a returna toate portofoliile.

findOne: Endpoint pentru a găsi un portofoliu după ID.

update: Endpoint pentru a actualiza un portofoliu existent.

remove: Endpoint pentru a șterge un portofoliu.

### h. Validatorul IsUrlOrLocalImagePath 
asigură că proprietatea image este fie un URL valid, fie un path local.

### i. AppModule: 
Definirea modulelor externe necesare aplicației și gestionarea rutei.

### j. Main.ts: 
Verificăm existența folderului uploads, activăm CORS, setăm folderul ca static și pornim serverul pe portul 3002.

### k. UploadController
Folosim diskStorage din multer pentru a încărca fișierele în folderul uploads, asigurându-ne că fiecare fișier are un nume unic.

## 4. Detalii Frontend

### a. Structura Frontend-ului

```plaintext
frontend-react/
├── src/
│   ├── components/
│   │   ├── Footer/
│   │   │   ├── Footer.css
│   │   │   └── Footer.js
│   │   ├── Home/
│   │   │   ├── Home.css
│   │   │   └── Home.js
│   │   ├── Modal/
│   │   │   ├── Modal.css
│   │   │   └── Modal.js
│   │   ├── Navbar/
│   │   │   ├── Navbar.css
│   │   │   └── Navbar.js
│   │   └── Portfolio/
│   │       ├── PortfolioModal/
│   │       │   ├── PortfolioModal.css
│   │       │   └── PortfolioModal.js
│   │       ├── Portfolio.css
│   │       └── Portfolio.js
│   ├── services/
│   │   ├── portfolioService.js
│   │   └── toastService.js
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   └── index.js
..................
```
### b. Home: 
Aceasta este pagina principală, unde am integrat animații pentru text și imagini pentru a îmbunătăți experiența utilizatorului.

### c. Modal: 
Componenta Modal este folosită pentru gestionarea procesului de ștergere. Aceasta include un titlu, o descriere și două butoane: unul pentru confirmare și altul pentru anulare.

### d. Navbar: 
Am utilizat Bootstrap pentru a crea un navbar responsive, care se transformă într-un meniu tip burger pe dispozitivele mobile. Navbar-ul include linkuri pentru pagina de portofoliu și pagina principală, cu pagina principală setată ca fiind default "/" 

### e. Portfolio -> Portfolio.js

#### Importuri: 

  Preluăm getPortfolios, getPortfolioById și deletePortfolio din portfolioService. De asemenea, importăm FontAwesomeIcon din React, modalele de ștergere și de adăugare/editare, serviciul de toast și spinnerul din React pentru loading.
  
#### Funcții:

  ##### fetchPortfolios: 
  Obține lista portofoliilor de la server prin serviciul getPortofolios și creează un loader care durează 0.5 secunde.
    
  ##### getImageSrc: 
  Returnează URL-ul imaginii pentru un portofoliu: dacă începe cu http sau https, înseamnă că este URL preluat de pe internet, așadar îl returnează normal. Dacă nu începe cu http sau https, înseamnă că este o imagine preluată din calculator și va accesa imaginea prin http://localhost:3002/uploads/imagine.
    
  ##### useEffect: 
  Apelează fetchPortfolios la montarea componentei.
    
  ##### fetchPortfolioById: 
  Obține detalii despre un portofoliu specific.
    
  ##### handleEdit: 
  Pregătește editarea unui portofoliu.
    
  ##### handleDelete: 
  Inițiază procesul de ștergere a unui portofoliu.
    
  ##### confirmDelete: 
  Șterge portofoliul confirmat de utilizator prin serviciul deletePortfolio.
    
  ##### handleFormSubmit: 
  Actualizează lista portofoliilor după trimiterea formularului, important pentru a nu fi nevoiți să dăm refresh la pagină pentru a afișa noile modificări.
    
  ##### filteredPortfolios: 
  Filtrează portofoliile în funcție de starea lor (afişate sau ascunse, în funcție de status - true sau false).
    
  ##### return (JSX): 
    
  Renderizează UI-ul portofoliilor:
  - Prima dată, afișăm loaderul cu un mesaj pentru 0.5 secunde.
  - Apoi, avem radiourile „Toate”, „Afisate” și „Ascunse” pentru desktop și select box pentru mobil, pentru a afișa portofoliile de interes după filtrare.
  - Pe aceeași linie avem butonul de adăugare, care deschide modalul fără a trimite ID, deci cu gândul de adăugare, iar datele trimise sunt câmpuri goale.
  - Apoi, trecem la afișarea portofoliilor:
    
    4.1. Dacă lungimea datelor filtrate din portofoliu este 0, va afișa că nu există date disponibile. Aceasta se face cu lungimea datelor filtrate, deoarece vrem să apară mesajul că nu există date disponibile în momentul în care sunt portofolii afisate, dar nu sunt ascunse, iar eu intru pe partea de ascunse.
    
    4.2. Dacă există filteredPortfolios, vom afișa într-un card Bootstrap detalii despre portofolii: titlu, descriere, link către client și statusul: vizibil sau invizibil. Sub acestea vor fi butoanele de ștergere (care vor trimite ID-ul și titlul, pentru a avea un mesaj personalizat în modal) și butonul de editare (care va trimite ID-ul).
    
    - La final, avem ModalComponent - modalul pentru ștergere, care va insera un titlu și o descriere ce va include și titlul portofoliului, și PortfolioModal, modalul de adăugare sau de modificare, care va transmite datele setFormData, iar după ce îl închidem, va face din nou o cerere la handleFormSubmit.

### f. Portfolio -> PortfolioModal -> PortfolioModal.js

  #### Importuri
  
  Box, Button, Typography, Modal: Componente importate din @mui/material pentru a construi interfața utilizatorului (UI) a modalului. Aceste componente oferă stiluri și comportamente standardizate pentru formulare, butoane și titluri.
  
  createPortfolio, updatePortfolio: Funcții importate din ../../../services/portfolioService, folosite pentru a crea sau actualiza portofoliile în backend.
  
  toastService: Importat din ../../../services/toastService pentru gestionarea notificărilor (atât de succes, cât și de eroare) în aplicație.
  
  #### Stări
  
  imageInputMethod: Stochează metoda de input pentru imagine, care poate fi fie un URL, fie un fișier de pe calculator.
  
  descriptionLength: Stochează lungimea textului din descrierea portofoliului, actualizată dinamic pe măsură ce utilizatorul tastează.
  
  loading: Indică dacă procesul de încărcare este activ, utilizat pentru a dezactiva butonul de trimitere în timpul procesului.
  
  #### Referințe
  
  titleRef, descriptionRef, imageRef, clientLinkRef: Referințe create cu React.useRef, folosite pentru a accesa inputurile din formular, facilitând manipularea directă a elementelor DOM atunci când este necesar.
  
  #### Funcții
  
  ##### handleChange:
  
  Actualizează formData în funcție de schimbările din inputuri.
  Verifică dacă inputul este de tip checkbox și actualizează starea corespunzătoare.
  Actualizează lungimea descrierii atunci când utilizatorul modifică textul.
  
  ##### handleImageInputMethodChange:
  
  Schimbă metoda de input pentru imagine (URL sau fișier) în funcție de selecția utilizatorului din radio buttons.
  
  ##### handleFileChange:
  
  Se ocupă de gestionarea fișierelor încărcate.
  Verifică dacă fișierul selectat este de tip imagine și actualizează formData cu fișierul.
  Afișează un mesaj de eroare prin toastService dacă fișierul nu este o imagine.
  
  ##### handleSubmit:
  
  Previnde comportamentul standard de trimitere a formularului pentru a gestiona trimiterea personalizată.
  
  Creează un obiect FormData care conține toate informațiile portofoliului.
  
  Trimite cererea către server, apelând funcția createPortfolio sau updatePortfolio în funcție de prezența sau absența unui id în formData.
  
  Gestionează eventualele erori prin toastService, afișând mesaje corespunzătoare în cazul unor probleme.
  
  ##### Renderizare
  
  Componenta returnează un Modal care conține un formular pentru adăugarea sau editarea portofoliilor:
  
  Titlu: Un câmp text pentru titlul lucrării.
  
  Descriere: Un textarea pentru descriere, cu un contor de caractere (maxim 200).
  
  Imagine: Opțiuni pentru a introduce o imagine fie prin URL, fie prin încărcare direct din calculator. În cazul încărcării, se salvează doar numele imaginii în baza de date, iar URL-ul complet este generat pentru a facilita afișarea ulterioară (http://localhost:3002/uploads/imagine).
  
  Link Client: Un câmp text pentru introducerea linkului clientului.
  
  Status: Un toggle (checkbox) pentru a indica dacă portofoliul este vizibil sau nu.
  
  Butoanele din formular permit utilizatorului să închidă modalul sau să trimită formularul.
  
  Mesajele de eroare și succes sunt gestionate prin intermediul toastService, asigurând o experiență mai bună pentru utilizatori prin feedback instantaneu asupra acțiunilor lor.
  
  ##### Constrângeri de validare
  Nu există constrângeri de validare pe partea de frontend; toate mesajele de eroare sunt gestionate de backend. Acest lucru permite o gestionare centralizată a erorilor și asigură o mai bună flexibilitate în cazul modificărilor ulterioare ale logicii de validare.
