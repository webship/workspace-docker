Feature: The Docker Compose plugin on a project row
  Once the plugin is activated and installed, every project folder that carries a compose file (compose.yaml, docker-compose.yml and their variants) carries
  the DOCKER menu, and the Plugins page lists the plugin with its four steps.

  Scenario: The plugin is listed on the Plugins page
    Given I am on "/settings/plugins"
     Then I should see "Docker Compose"
      And I should see "@webship.co/workspace-docker"

  Scenario: The AI Agents folder lists the agent the plugin ships
    Given I am on "/ai-agents"
     Then I should see "docker-operator"

  Scenario: The AI Skills folder lists the skill the plugin ships
    Given I am on "/ai-skills"
     Then I should see "docker-menu"

  Scenario: The AI Commands folder lists the command the plugin ships
    Given I am on "/ai-commands"
     Then I should see "docker-status"

  Scenario: The AI Prompts folder lists the prompt the plugin ships
    Given I am on "/ai-prompts"
     Then I should see "docker-up-and-check"
