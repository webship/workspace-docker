/**
 * Docker Compose, as a container runtime: a project with a compose file.
 */

import fs from 'fs';
import path from 'path';
import { detectByFiles } from '@webship/workspace-container';
import type { ContainerProject, ContainerRuntime } from '@webship/workspace-container';

export const COMPOSE_FILES = ['compose.yaml', 'compose.yml', 'docker-compose.yml', 'docker-compose.yaml'];

/** The compose project's name, first service and first published port, read without a YAML parser. */
export function readCompose(file: string, fallbackName: string): { name: string; service?: string; port?: string } {
  let text = '';
  try { text = fs.readFileSync(file, 'utf8'); } catch (_) { return { name: fallbackName }; }
  const name = (text.match(/^name:\s*["']?([\w.-]+)/m) || [])[1] || fallbackName;
  const services = text.indexOf('\nservices:');
  const body = services >= 0 ? text.slice(services) : '';
  const service = (body.match(/\n {2}([\w.-]+):/) || [])[1];
  const port = (body.match(/^\s+-\s*["']?(?:[\d.]+:)?(\d+):\d+/m) || [])[1];
  return { name, service, port };
}

export const dockerRuntime: ContainerRuntime = {
  id: 'docker',
  label: 'DOCKER',
  title: 'Docker Compose',
  cli: 'docker',
  cliHint: 'https://docs.docker.com/engine/install/',
  detect: (dir): ContainerProject | null => {
    const p = detectByFiles(dir, COMPOSE_FILES);
    if (!p) return null;
    const c = readCompose(path.join(dir, p.file), path.basename(dir));
    return { file: p.file, name: c.name, url: c.port ? `http://localhost:${c.port}` : undefined };
  },
  state: async (p, dir, lib) => {
    const out = await lib.run('docker', ['compose', '-f', p.file, 'ps', '--status', 'running', '--format', '{{.Name}} {{.State}}'], dir, { timeoutMs: 15 * 1000 });
    if (!out.ok) return 'unknown';
    return /running/.test(String(out.stdout)) ? 'up' : 'down';
  },
  verbs: {
    start: { label: 'Up (docker compose up -d)', icon: 'play', kind: 'start', cmd: (p) => `docker compose -f ${p.file} up -d` },
    stop: { label: 'Down', icon: 'ban', kind: 'stop', cmd: (p) => `docker compose -f ${p.file} down` },
    restart: { label: 'Restart', icon: 'refresh', kind: 'restart', cmd: (p) => `docker compose -f ${p.file} restart` },
    status: { label: 'Status (ps)', icon: 'info', kind: 'status', cmd: (p) => `docker compose -f ${p.file} ps` },
    logs: { label: 'Logs (follow)', icon: 'file-text', kind: 'logs', cmd: (p) => `docker compose -f ${p.file} logs -f --tail=200` },
    shell: { label: 'Shell in the first service', icon: 'terminal', kind: 'shell', cmd: (p) => `docker compose -f ${p.file} exec $(docker compose -f ${p.file} config --services | head -1) sh` },
    pull: { label: 'Pull images', icon: 'cloud-download', kind: 'other', cmd: (p) => `docker compose -f ${p.file} pull` },
    build: { label: 'Build', icon: 'cog', kind: 'other', cmd: (p) => `docker compose -f ${p.file} build` },
    downv: { label: 'Down and remove volumes (data is lost)', icon: 'trash', kind: 'other', danger: true, cmd: (p) => `docker compose -f ${p.file} down -v` },
  },
  init: { label: 'Write a compose.yaml skeleton here', cmd: (name) => `[ -e compose.yaml ] || printf 'name: ${name}\\nservices:\\n  web:\\n    image: nginx:alpine\\n    ports:\\n      - "8080:80"\\n' > compose.yaml`, help: 'One nginx service on port 8080, to edit.' },
  menuNote: 'The verbs run against the daemon the host uses (Docker-outside-of-Docker)',
};
