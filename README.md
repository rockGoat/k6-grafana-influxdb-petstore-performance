# k6-grafana-influxdb-petstore-performance

Performance testing Petstore API with **k6**, InfluxDB, Grafana and GitHub Copilot.

## About this project

This is a demo performance testing setup for the Petstore REST API using k6 with InfluxDB and Grafana dashboards.  
I use this repo as a playground to sharpen my skills in API performance testing, metrics visualization, and AI-assisted test script generation with GitHub Copilot.

As a QA/Automation engineer with 6+ years in manual testing and 3+ years in test automation (Selenium, Playwright, API testing, performance testing), I focus here on realistic user scenarios (create user, get user by username) and analyze how the system behaves under different load profiles.

## Tech stack and tools

- k6 for performance and load testing of HTTP APIs.  
- Docker / Podman / Rancher Desktop to run InfluxDB and Grafana.  
- InfluxDB as a time-series database for k6 metrics.  
- Grafana for dashboards and visual analysis of results.  
- GitHub Copilot integrated in VS Code / JetBrains IDEs to generate k6 scripts from swagger.json.

Useful links:

- [k6 installation](https://grafana.com/docs/k6/latest/set-up/install-k6/)  
- [Docker Desktop](https://docs.docker.com/get-started/introduction/get-docker-desktop/)  
- [Podman](https://podman-desktop.io/)  
- [Rancher Desktop](https://docs.rancherdesktop.io/getting-started/installation/)  
- [VS Code](https://code.visualstudio.com/) + [GitHub Copilot](https://code.visualstudio.com/docs/copilot/setup)  
- [JetBrains IDEs](https://www.jetbrains.com/ides/#choose-your-ide) + [GitHub Copilot plugin](https://plugins.jetbrains.com/plugin/17718-github-copilot)

## How to run locally

1. Start Grafana and InfluxDB containers.  
   ```bash
   docker compose up -d
   ```

2. Create an InfluxDB database (YouTubeDemo or your custom name).  
   ```bash
   curl -i -XPOST http://localhost:8086/query --data-urlencode "q=CREATE DATABASE YouTubeDemo"
   ```

3. Configure InfluxDB as a Data Source in Grafana and import the k6 dashboard.  
   - [Grafana InfluxDB Data Source](https://grafana.com/docs/grafana/latest/datasources/influxdb/)
   - [k6 Grafana dashboard](https://grafana.com/grafana/dashboards/14801-k6-dashboard/)

4. Run k6 with InfluxDB output.  
   ```bash
   k6 run --out influxdb=http://localhost:8086/YourDbName k6_test_script.js
   ```

## Inspired by

This project is inspired by:

- [How to start with Performance testing with k6 and GitHub Copilot](https://github.com/rockGoat/k6-grafana-influxdb-petstore-performance)
