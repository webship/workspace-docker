# @webship/workspace-docker

Docker Compose for the [Webship Workspace](https://github.com/webship/workspace) dashboard: the **DOCKER**
menu on every project folder that carries a compose file (compose.yaml, docker-compose.yml and their variants), with the runtime's verbs as terminal sessions in
the project, the up/down caption and the site link, and "Write a compose.yaml skeleton here" when a new folder is made.
A runtime of [`@webship/workspace-container`](https://github.com/webship/workspace-container).

A project is a Docker Compose project when it carries `compose.yaml`, `compose.yml`, `docker-compose.yml` or `docker-compose.yaml`. The name is the file's `name:` or the folder; the site link is the first published port of the first service that has one. The dashboard container runs docker against the host's socket (Docker-outside-of-Docker), so the verbs act on the same daemon the host uses.

## Use it

```bash
cd ~/workspace
bash core/scripts/plugins.sh --require github:webship/workspace-docker
bash core/scripts/plugins.sh --activate docker
bash core/scripts/plugins.sh --install docker
```

## The verbs

| Verb | Command |
| --- | --- |
| Up | `docker compose up -d` |
| Down | `docker compose down` |
| Restart | `docker compose restart` |
| Status | `docker compose ps` |
| Logs | `docker compose logs -f --tail=200` |
| Shell | `docker compose exec <first service> sh` |
| Pull | `docker compose pull` |
| Build | `docker compose build` |
| Down and remove volumes | `docker compose down -v` (data is lost: marked in red) |

Every verb opens a terminal session in the project folder, so what the CLI prints is what you see,
and a verb that asks a question can be answered.

The `workspacePlugin` block in `package.json` is the manifest the installer reads.
