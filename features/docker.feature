Feature: The Docker Compose plugin on a project row
  Once the plugin is activated and installed, every project folder that carries a compose file (compose.yaml, docker-compose.yml and their variants) carries
  the DOCKER menu, and the Plugins page lists the plugin with its four steps.

  Scenario: The plugin is listed on the Plugins page
    Given I am on "/settings/plugins"
     Then I should see "Docker Compose"
      And I should see "@webship.co/workspace-docker"
