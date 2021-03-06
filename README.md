# mobailshop

> mobailshop built with nodejs, expressjs & mongodb.

## Features

> CRUD (Create, Read, Update And Delete)

- Authentication with JWT (Reset Password with email)
  - Login (User/saller/Admin)
  - Register
  - Forgot Password
- Pagination and search where necessary
- API Security (NoSQL Injections, XSS Attacks, http param pollution etc)

- Trending
- Subscriptions

- Settings
  - Modify channel name and email
  - Change password
  - Upload channel avatar

## Database Model

Though the diagram uses sql data type, this diagram is to show you the various collections in the mongo database.

## Requirement

- NodeJS
- MongoDB

## Configuration File

Rename the config/.env.example to .env, then modify to your environment variables, mongodb uri, set your JWT_SECRET and SMTP variables

```ENV
NODE_ENV=development
PORT=3001

MONGO_URI=YOUR_URL

JWT_SECRET=YOUR_SECRET
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

FILE_UPLOAD_PATH = ./public/uploads
MAX_FILE_UPLOAD = 1000000

SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_EMAIL=
SMTP_PASSWORD=
FROM_EMAIL=ab7771107d@gmail.com
FROM_NAME=Abdalrhmn Naji
```

Email testing: use mailtrap for email testing, it's easy no stress.

## Installation

Install all npm dependecies

```console
npm install
```

Install nodemon globally

```console
npm install -g nodemon
```

Run database seeder

- Seeder folder is \_data/
- Edit the seeder file if you want to

```console
node seeder -i
```

Delete all data

```console
node seeder -d
```

## Start web server

```console
node run dev
```

## Screenshots

> Delete the screenshot folder if you download this code (Screenshots folder is 3.14mb in size).

## License

This project is licensed under the MIT License

## Developed by Abdalrhmn Naji

Reach me on facebook [@Abdalrhmn](https://www.facebook.com/profile.php?id=100011260472575)
