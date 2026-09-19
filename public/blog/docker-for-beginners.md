# Docker for Students: Containers Without the Jargon

**URL:** https://studytub.netlify.app/blog/docker-for-beginners.html
**Published:** 2026-08-19
**Tags:** Software Engineering, DevOps

Images, containers, Dockerfiles and compose — what each is, why 'works on my machine' stops being a problem, and the commands you will actually use.

## The problem it solves

Your project runs. A teammate clones it and nothing works — different Node version, missing Postgres, a library that needs a system package.

A container packages the application *and* its environment, so it runs identically anywhere.

## Image versus container

An **image** is a template: your code plus its dependencies plus the OS layer. A **container** is a running instance of an image.

The relationship is class and object. One image, many containers.

## A Dockerfile

<pre><code>FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]</code></pre>

The ordering matters more than it looks. Docker caches each layer. Copying \`package.json\` and installing *before* copying the source means a code change does not reinstall dependencies — the difference between a 3-second and a 3-minute rebuild.

\`alpine\` images are around 50 MB against 900 MB for the default. Smaller images pull faster and have less to patch.

## Compose for several services

A real application is rarely one container. Compose describes them together:

<pre><code>services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data

  api:
    build: ./api
    ports: ["3000:3000"]
    depends_on:
      db:
        condition: service_healthy

volumes:
  pgdata:</code></pre>

\`docker compose up\` starts everything. That is the "clone and run" experience.

## Volumes, or your data disappears

Containers are ephemeral. Delete one and its filesystem goes with it.

A named volume (\`pgdata\` above) lives outside the container lifecycle. Without it, \`docker compose down\` destroys your database — which is exactly what \`-v\` does deliberately, and why that flag deserves caution.

## Commands worth memorising

<pre><code>docker compose up --build   # build and start
docker compose logs -f api  # follow one service's logs
docker compose exec api sh  # shell inside a running container
docker compose down         # stop (add -v to delete volumes too)</code></pre>

## Never bake secrets into an image

Anyone who can pull the image can read every layer. Pass secrets as environment variables at runtime, and keep \`.env\` out of the image with \`.dockerignore\`.
