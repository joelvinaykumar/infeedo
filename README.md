## About

* This project can create, update, get tasks
* You can create a task by simply passing title and description.

## Stack

* Express JS
* Prisma
* Postgresql


## Architecture

* We're following Controller-Service model.
* This will help abstract logic and keep request, response lifecycle in one place and business logic in another place.
* Following is the directory structure

```
- controllers
- services
- utils
    - constants
    - middleware
```

* This is kept simple as per the requirements.
* We can extend to add loggers, messaging queues etc.

## Environment

```
PORT=
DATABASE_URL=
```
