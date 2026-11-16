---
name: docker-menu
description: Run a project of a Webship Workspace on Docker Compose through the Docker Compose plugin (`@webship.co/workspace-docker`) — which folder is a Docker Compose project, every entry of the DOCKER menu and the `docker` command behind it, the up or down caption, the site link, the option the New folder form offers, and how to check that `docker` is on the machine. Use when asked "is this a Docker Compose project", "what does the DOCKER menu do", "start this project", "why is there no DOCKER menu on this project", "the caption says ?", or when a project of the workspace that carries a compose file.
argument-hint: '<project>'
---

# docker-menu

Docker Compose for a project of a Webship Workspace (`~/workspace`, container-based, DDEV by default). It
comes with the Docker Compose plugin (`@webship.co/workspace-docker`), a runtime of the container family
(`@webship.co/workspace-container`), like the agent `docker-operator`, the command `/docker-status` and
the prompt `docker-up-and-check`.

The workspace builds its own sites on DDEV. This plugin is for a project that runs on Docker Compose
instead: it gives that project a menu of its own, beside the others.

## Which project gets the menu

A project is a Docker Compose project when its folder carries a compose file: `compose.yaml`, `compose.yml`, `docker-compose.yml` or `docker-compose.yaml`. The first one found, in that order, is `<file>` below. The name of the project is the `name:` of that file, or the folder's name.

```bash
cd ~/workspace/<folder>/<project>
ls compose.yaml compose.yml docker-compose.yml docker-compose.yaml 2>/dev/null
```

## The DOCKER menu

On top the menu shows the name of the project and the file it was recognised by, and **Open the site** when a service publishes a port: `http://localhost:<port>`, the first published port in the file. Every
other entry opens a terminal session in the project's folder and runs one command there, so what
`docker` prints is what is seen, and a question it asks can be answered.

| Menu entry | The command, in the project's folder |
| --- | --- |
| **Up (docker compose up -d)** | `docker compose -f <file> up -d` |
| **Down** | `docker compose -f <file> down` |
| **Restart** | `docker compose -f <file> restart` |
| **Status (ps)** | `docker compose -f <file> ps` |
| **Logs (follow)** | `docker compose -f <file> logs -f --tail=200` |
| **Shell in the first service** | `docker compose -f <file> exec $(docker compose -f <file> config --services \| head -1) sh` |
| **Pull images** | `docker compose -f <file> pull` |
| **Build** | `docker compose -f <file> build` |
| **Down and remove volumes (data is lost)** | `docker compose -f <file> down -v` |

The menu ends with the note "The verbs run against the daemon the host uses (Docker-outside-of-Docker)".

### The caption beside the menu

| Caption | What it means |
| --- | --- |
| `up` | `docker compose -f <file> ps --status running` lists a running container |
| `down` | It answered, and nothing of the project is running |
| `?` | `docker` could not answer: it is not installed where the dashboard runs, or it failed |

### A new folder

The New folder form offers **Write a compose.yaml skeleton here**: it writes a `compose.yaml` with one nginx service on port 8080, to edit, unless the folder already has one.

## Turn it on, and check it

```bash
cd ~/workspace
bash core/scripts/plugins.sh --require @webship.co/workspace-docker
bash core/scripts/plugins.sh --activate docker --with-needs     # adds the AI folders its items land in
bash core/scripts/plugins.sh --install docker
bash core/scripts/plugins.sh --check docker                     # docker: found, with its version, or missing
```

The plugin has no settings file. `docker` is installed outside the workspace: https://docs.docker.com/engine/install/

## Traps

- **The verbs act on the daemon of the machine.** The dashboard runs in a container and uses the machine's own Docker: a project started from the menu is the same one `docker compose` shows in a terminal.
- **Down and remove volumes** is the only entry that loses data, and it is drawn in red. **Down** keeps the volumes.
- **The site link is a guess from the file**: the first published port. A project behind a proxy, or with a port set in a variable, has no link or the wrong one.
- **A verb answers "docker is not installed"**: the terminal session of the menu checks for `docker`
  first, and says where to get it.
- **A project on DDEV** keeps the workspace's own menus; this one is not drawn for it unless it
  also carries a compose file of its own.

## The book

For any automated functional testing in this work (a Gherkin feature, a step definition, choosing a
step, a test run and its failures), read the book *Automated Functional Testing Recipes* first.

- **Where.** Use the first that exists: `.claude/automated-functional-testing-recipes/` in the project,
  `~/.claude/automated-functional-testing-recipes/` (installed by webship/webship-js-ai-agent,
  webship/webship-js-skills or webship/ai-agents), or
  https://github.com/webship/webship-js-ai-agent/tree/2.0.x/automated-functional-testing-recipes
- **How.** Its `README.md` first, then the chapter that matches the task (one file per chapter,
  named by its subject), not the single complete file.
- **Which wins.** The installed webship-js package and the step pack are the source of truth for
  step phrasing. When they differ from the book, follow them and say so.
