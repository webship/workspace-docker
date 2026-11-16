Feature: The Docker Compose plugin on a project row
  Once the plugin is activated and installed, every project folder that carries a compose file (compose.yaml, docker-compose.yml and their variants) carries
  the DOCKER menu, and the Plugins page lists the plugin with its four steps.

  # The Plugins page names each plugin; the package is on the plugin's own page (the row shows it on hover only).
  Scenario: The plugin is listed on the Plugins page, and its own page names its package
    Given I am on "/settings/plugins"
     Then I should see "Docker Compose"
     When I go to "/settings/plugin/docker"
     Then I should see "@webship.co/workspace-docker"

  # The AI folders are searched by name: with every plugin on, a folder lists more than one page of items.
  Scenario: The AI Agents folder lists the agent the plugin ships
    Given I am on "/ai-agents?q=docker-operator"
     Then I should see "docker-operator"

  Scenario: The AI Skills folder lists the skill the plugin ships
    Given I am on "/ai-skills?q=docker-menu"
     Then I should see "docker-menu"

  Scenario: The AI Commands folder lists the command the plugin ships
    Given I am on "/ai-commands?q=docker-status"
     Then I should see "docker-status"

  Scenario: The AI Prompts folder lists the prompt the plugin ships
    Given I am on "/ai-prompts?q=docker-up-and-check"
     Then I should see "docker-up-and-check"
