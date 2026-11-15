/**
 * Docker Compose for Webship Workspace.
 *
 * The DOCKER menu on every project folder that carries a compose file (compose.yaml, docker-compose.yml and their variants): the runtime's verbs as terminal
 * sessions in the project, the up/down caption, the site link, and "Write a compose.yaml skeleton here" when a new folder
 * is made. All of it is the container family's surface (@webship.co/workspace-container); this
 * package is the Docker Compose runtime plus its host install.
 */

import type { PluginApi } from '@webship.co/workspace-plugin-api';
import { registerContainer } from '@webship.co/workspace-container';

import { dockerRuntime } from './lib/runtime';

export { dockerRuntime };

/** The AI items the installer places: agents in ai-agents/, skills in ai-skills/, commands in ai-commands/, prompts in ai-prompts/. */
export const AGENTS: string[] = ['docker-operator'];
export const SKILLS: string[] = ['docker-menu'];
export const AI_COMMANDS: string[] = ['docker-status'];
export const PROMPTS: string[] = ['docker-up-and-check'];

export function register(api: PluginApi): void {
  registerContainer(api, dockerRuntime);
}
