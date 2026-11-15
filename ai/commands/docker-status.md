---
description: Say whether a Webship Workspace project is a Docker Compose project and whether it is up, with the read-only commands the DOCKER menu runs. Nothing is started, stopped or removed.
argument-hint: '<project>'
---

# /docker-status

Say where this project stands on Docker Compose: `$ARGUMENTS`

The argument is one word: the project, which is its folder name in a workspace folder. With no
project, stop and ask for one.

The workspace is container-based (DDEV by default); `docker` runs on the machine, in the project's
folder. This command only reads: these are the entries of the DOCKER menu of the Docker Compose plugin
(`@webship.co/workspace-docker`) that change nothing. Never start, stop, restart, build or remove anything here.

## 1. Find the project and its file

```bash
ls -d ~/workspace/*/<project>
cd ~/workspace/<folder>/<project>
ls compose.yaml compose.yml docker-compose.yml docker-compose.yaml 2>/dev/null
```

If none of those files is there, stop and say that it is not a Docker Compose project: the DOCKER menu is
not on it either.

## 2. Is `docker` here

```bash
cd ~/workspace && bash core/scripts/plugins.sh --check docker
```

If it is missing, say so with the address it gives (https://docs.docker.com/engine/install/), and stop.

## 3. Read

```bash
cd ~/workspace/<folder>/<project>
docker compose -f <file> ps
```

## 4. Report

The file the project was recognised by, then what is running and what is not, in the words of
the answer. A list with no container is a result: the project is down.

For starting or stopping it, hand over to the agent `docker-operator`.
