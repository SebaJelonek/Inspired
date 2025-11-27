# Inspired Backend CMS

A robust, production-oriented backend infrastructure project designed to act as a Headless CMS.

## About The Project

This project started as a study of the [Pragmatic Coders Junior Fullstack Interview](https://github.com/pragmaticcoders/junior-fullstack-interview) repository. During an interview process, I was impressed by the architectural quality of their base project and decided to use it as the foundation for my own learning journey.

**Until commit `7f60420`**, I followed the original repository strictly to establish the infrastructure. **Since November 26th, 2025**, I have diverged from the original path to build a custom CMS service designed to capture data and populate a frontend application.

## Goals

- **Production Simulation:** To build an application that is as close to "production-ready" as possible, focusing on proper layering, configuration, and separation of concerns.
- **Containerization:** Fully dockerized environment with the end goal of deployment to a cloud provider (AWS/Azure).
- **Testing:** Elevating my testing skills (previously Go, now TypeScript/Node) to new heights using Mocha and Chai.

## Tech Stack & Learning Outcomes

Building this has been a deep dive into backend configuration and tooling. Key technologies and concepts implemented include:

- **Runtime:** Node.js
- **Language:** TypeScript (configured for strict typing with Zod for validation)
- **Database:** PostgreSQL (with Knex.js for migrations and query building)
- **Infrastructure:** Docker & Docker Compose (first-time implementation)
- **Logging** Winston (with log-format for verbose logs in json format )
- **Testing:** Mocha, Chai, Sinon (Mocking and Integration testing)
- **Architecture:** Layered Architecture (Separation of `app-services`, `config`, and `server`).

## Roadmap

- [x] Establish Infrastructure (Docker, Typescript, Linter)
- [x] Database Connection & Migrations Setup
- [x] Basic CRUD Operations (Skills Domain)
- [x] Integration Testing Setup
- [ ] Implement Activities Domain (Soft Deletes, Delta Sync)
- [ ] Implement Learning Domain (Soft Deletes, Delta Sync)
- [ ] Add Content Management Logic
- [ ] Cloud Deployment (AWS/Azure)

## Acknowledgements

I want to extend a huge thank you to **Pragmatic Coders**. This project exists because of the guidance provided by their open-source interview repository. It provided a free, high-quality architectural lesson that I did not expect but am extremely thankful for.

---

_Note: While I strive for "production-ready" code, this is a learning experience and represents my best effort at professional architecture to date._
