# isansw-website

This repository contains the source code of the ISANSW website based on the 2025 specification.

## Quickstart

You will need to install a few tools to setup your development environment:

1. [Git](https://git-scm.com/downloads) - You'll need this to make a local copy of this repository on your computer.

2. [Node.js and NPM](https://nodejs.org/en/download) - This is a runtime that lets you run JavaScript out of its native environment, the browser.

3. [Docker Desktop](https://www.docker.com/products/docker-desktop/) - We will need this to run "containers" that simulate a local database and email server.

Once you've installed the tools above, you can start making a local copy (clone) of this repository:

```
git clone https://github.com/isansw-org/isansw-website.git
cd isansw-website
```

Copy over sample environment variables for development:

```
cp .env.example .env.local
```

Open the Docker Desktop app. This will start Docker Engine, but you don't actually need to do anything on the app. Now, run two docker containers in the background, serving a [PostgreSQL](https://www.postgresql.org/) database and [Mailhog](https://github.com/mailhog/MailHog), which is a local email SMTP testing server:

```
docker-compose up -d
```

You can access the Mailhog email inbox at [http://localhost:8027](http://localhost:8027).

Apply migrations to the database (i.e., create the tables):

```
npm run drizzle-kit migrate
```

**Aside:** You can also run `npm run drizzle-kit studio` to host a local graphical user interface to view and manage the database at [local.drizzle.studio](local.drizzle.studio)

**Note on accessing the admin dashboard:** Registration is set up to be invite-only. That is, you cannot create an account unless an existing admin invited you. So, in development, you'll have to populate an initial admin user.

```
npm run init-user
```

Finally, run the Next.js application on [http://localhost:3000/](http://localhost:3000/)

```
npm run dev
```

You should be able to login to the admin dashboard at [http://localhost:3000/login] with credentials `john.doe@example.com` and `Password@123`

## Learn More

The [documentation](https://github.com/isansw-org/isansw-website) should be your first stop in looking for help. It contains guides, tips, and design decision explanations specifically tailored to help you better learn the ISANSW website source code.

## Conventions

This repository has its own [conventions](#) which we ask you to follow in order to maintain an organized source code moving forward.

## Tech Stack

The following are technologies used to develop the website:

- [Next.js](https://nextjs.org/docs) - A meta framework for React. This is the main application framework we are using to build the website. Every other technology/dependency in this list revolves around Next.js.
- [Tailwind CSS](https://tailwindcss.com/) - A CSS library for writing your CSS as inline, atomic classes. It is a community standard for styling in React applications.
- [ShadCN UI](https://ui.shadcn.com/) - A minimally styled, copy-paste component library
- [PostgreSQL](https://www.postgresql.org/) - The relational database management system
- [Drizzle ORM](https://orm.drizzle.team/docs/overview) - A database Object Relational Mapper (ORM). It lets you write SQL schema and query definitions in TypeScript code.
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) - A simple React state management toolkit. You should use Zustand stores instead of the React hook useState.
- [Zod](https://zod.dev/) - A simple validation toolkit for TypeScript.
- [React Email](https://react.email/) - Email markup builder using React code.
- [Docker](https://www.docker.com/products/docker-desktop/) - Containerization tool for running a local database and email server
- [GCP Cloud Storage](https://cloud.google.com/storage?hl=en) - Cloud file storage

For any development task, you will likely invest more time learning **Next.js** and **React.**