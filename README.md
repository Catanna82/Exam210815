# This is a simple photo app, created in Angular. It displays a set of images albums, portfolio and comments area.

This is a web site for Jan Todorov photography.

## Architecture

### Site structure:

- Home page
- About page
- Contacts page
- Comments page
- Portfolio page
- Gallery page
- Admin page
- Login page
- Register page

### User roles:

- Admin- can access Home, About, Contacts, Portfolio, Gallery, Comments and Admin pages.
- User - can access Home, About, Contacts, Portfolio, Gallery and Comments pages.
- Guest - can access Home, About, Contacts and Portfolio pages.

### Used technologies:

- agm
- angular
- rxjs
- mongoose
- express
- MongoDB

### Prerequisites:

- node js version 14+
- npm version 7+

## Installation, startup and application access:

### Install modules from package.json

```console
npm i --legacy-peer-deps
```

### Start node server

```console
node server.js
```

### Start app

```console
ng s
```

### Open a browser window and navigate to

http://localhost:4200/

## User interfaces

### User managment:

- Register button - If you want to use user profile just click on register button, and create a new user profile. First registered user gets the private (admin) profile.
- Login button - Get access to user functionality (only for registered users).

### Menu:

- Home "Начало" (available for Guest, User, Admin).
- About "За мен" (available for Guest, User, Admin) - contains information.about the biography of the owner, his work and his favorite motivating thought.
- Contacts "Контакти" (available for Guest, User, Admin) - contains all.contacts with the owner and google maps to his location.
- Comments "Коментари" (available for User, Admin)- represents customer.satisfaction, their criticisms and recommendations.
- Register "Регистрация" (available for Guest) - register with email, password.
- Login "Вход" (available for Guest) - login with email, password.
- Logout "Изход" (available for User, Admin) - logout from the app.
- Gallery "Галерия" (available for User, Admin) - albums with images.
- Portfolio "Портфолио" (available for Guest, User, Admin) - random images for represents owner work.
- Admin "Админ" (available for Admin) - create albums with images and category.
