#!/usr/bin/env bash
## The host side of the Docker Compose plugin: the CLI on this machine. Run by core/scripts/plugins.sh
## --install docker, and by core/scripts/install.sh for every installed plugin that ships one.
## Idempotent: whatever is already there is reported, not redone; nothing is installed unasked.
set -u
BIN='';
for candidate in "$(command -v docker 2>/dev/null)" "${HOME}/.local/bin/docker" ; do
  [ -n "${candidate}" ] && [ -x "${candidate}" ] && { BIN="${candidate}"; break; }
done
if [ -n "${BIN}" ] ; then
  printf '  ✓ %-16s %s\n' "docker" "${BIN}" ;
else
  printf '  ✗ %-16s %s\n' "docker" "missing — the DOCKER menu's verbs need it (docs.docker.com/engine/install)" ;
fi
