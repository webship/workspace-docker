# @webship.co/workspace-docker

Docker Compose for the [Webship Workspace](https://github.com/webship/workspace) dashboard: the **DOCKER**
menu on every project folder that carries a compose file (compose.yaml, docker-compose.yml and their variants), with the runtime's verbs as terminal sessions in
the project, the up/down caption and the site link, and "Write a compose.yaml skeleton here" when a new folder is made.
A runtime of [`@webship.co/workspace-container`](https://github.com/webship/workspace-container).

A project is a Docker Compose project when it carries `compose.yaml`, `compose.yml`, `docker-compose.yml` or `docker-compose.yaml`. The name is the file's `name:` or the folder; the site link is the first published port of the first service that has one. The dashboard container runs docker against the host's socket (Docker-outside-of-Docker), so the verbs act on the same daemon the host uses.

## Use it

```bash
cd ~/workspace
bash core/scripts/plugins.sh --require github:webship/workspace-docker
bash core/scripts/plugins.sh --activate docker --with-needs
bash core/scripts/plugins.sh --install docker
```

## The items it carries

The workspace is container-based (DDEV by default). Each item lands in the folder of its kind, when
that folder is an active workspace folder, is listed there like any other item, and is installed
into Claude Code from there:

| What | Lands in | What it is for |
| --- | --- | --- |
| The agent `docker-operator` | `ai-agents/` | Says whether a Docker Compose project is up, starts, stops and restarts it with the commands of the DOCKER menu, and never runs the destroying one on its own |
| The skill `docker-menu` | `ai-skills/` | Which folder is a Docker Compose project, every entry of the DOCKER menu and its `docker` command, the caption, the site link, the New folder option |
| The command `/docker-status` | `ai-commands/` | `/docker-status <project>`: whether it is a Docker Compose project and whether it is up. Read-only |
| The prompt `docker-up-and-check` | `ai-prompts/` | The launch command of a session that starts a Docker Compose project and says whether it came up |

The plugin places no `cmd-*.sh`: every entry of the menu is one `docker` command in the project's folder, and a wrapper would add nothing to it. The item bodies are plain Markdown any AI command-line assistant can follow; Claude Code is the default shape (frontmatter, the launch command of the prompt).

How the items are laid out and checked: [docs/plugin-items-pattern.md](docs/plugin-items-pattern.md).

## What it needs

On the machine this plugin needs `docker` (https://docs.docker.com/engine/install/), and its manifest says so (`needs.commands`). The workspace reports it and never installs it:

```bash
bash core/scripts/plugins.sh --check docker      # found, with its version, or missing, with how to install it
webship-workspace doctor                        # the same for the core and every plugin
```

It also needs the AI folders its items are placed in (`needs`): `ai-agents`, `ai-skills`, `ai-commands` and `ai-prompts`. `--require` says so, `--activate` and `--install` stop until the workspace has them, and `--with-needs` adds what is missing first. A kind whose folder is not an active workspace folder is skipped, and the install says so. It needs no sites folder: its menu is on the project rows of whatever folders the workspace has.

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

## What the package holds of them

| Path | What it is |
| --- | --- |
| `ai/agents/docker-operator.md` | The agent `docker-operator` |
| `ai/skills/docker-menu/` | The skill `docker-menu` |
| `ai/commands/docker-status.md` | The command `/docker-status` |
| `ai/prompts/docker-up-and-check.md` | The prompt `docker-up-and-check` |
| `tests/items.test.ts` | The shape of every item, and that it names nothing the plugin does not have |
