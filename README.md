# Inspired Backend

A robust, polyglot backend & mobile ecosystem for event management and shared event photo libraries.

## About The Project

This project started as a study of the [Pragmatic Coders Junior Fullstack Interview](https://github.com/pragmaticcoders/junior-fullstack-interview) repository. During an interview process, I was impressed by the architectural quality of their base project and decided to use it as the foundation for my own learning journey.

**Until commit `7f60420`**, I followed the original repository strictly to establish the infrastructure. **Since November 26th, 2025**, I have diverged from the original path to build a specialized event creation platform featuring shared, real-time photo libraries for event participants.

## Goals

- **Production Simulation:** Build an application that is as close to "production-ready" as possible, focusing on strict domain boundaries, secure storage flows, and clean contract-driven inter-service communication.
- **Polyglot & Multi-Service Architecture:** Combine Node.js/TypeScript for API gateway logic with Go microservices for fast, lightweight processing over gRPC.
- **Cloud & Local Emulation:** Implement direct-to-storage blob uploads using pre-signed SAS URLs, fully emulated locally via Azure Storage (Azurite).
- **Containerization:** Fully dockerized environment with multi-container orchestration ready for cloud deployment (AWS/Azure).
- **Testing:** Comprehensive test coverage using Mocha/Chai for TypeScript and standard testing library patterns in Go.

## Tech Stack & Architecture

Building this has been a deep dive into backend orchestration and system design. Key technologies and concepts implemented include:

- **Runtimes & Languages:**
  - Node.js (TypeScript with Zod validation)
  - Go (Microservices & high-performance gRPC components)
- **Frontend App:** React Native (Cross-platform client for event creators and attendees)
- **Inter-Service Communication:** gRPC (Protobuf contracts defining type-safe RPCs between backends)
- **Database:** PostgreSQL (with Knex.js for migrations and query building)
- **Cloud & Blob Storage:** Azurite (Local Azure Blob Storage emulation with pre-signed SAS URL generation for secure, direct client uploads)
- **Infrastructure & Orchestration:** Docker & Docker Compose multi-container setup with automated initialization hooks
- **Logging:** Winston (with JSON log formatting; planning unified cross-service log collection)
- **Testing:**
  - TypeScript: Mocha, Chai, Sinon (Unit & Integration testing)
  - Go: Standard `testing` library
- **Architecture:** Polyglot monorepo with layered Node.js services and Go gRPC microservices

## Roadmap

- [x] Establish Infrastructure (Docker, TypeScript, Linter)
- [x] Database Connection & Migrations Setup
- [x] Basic CRUD Operations (Skills Domain)
- [x] Integration Testing Setup
- [x] gRPC Contract Definition & Proto Schema Setup
- [x] gRPC Server Implementation (Go backend)
- [x] Azurite Infrastructure Setup & Pre-signed SAS URL Generation
- [ ] Implement Unified Centralized Logging across Node & Go
- [ ] Implement Activities Domain (Soft Deletes, Delta Sync)
- [ ] Implement Learning Domain (Soft Deletes, Delta Sync)
- [ ] Complete Mobile Client Integration (React Native)
- [ ] Cloud Deployment (AWS/Azure)

## Acknowledgements

I want to extend a huge thank you to **Pragmatic Coders**. This project exists because of the guidance provided by their open-source interview repository. It provided a free, high-quality architectural lesson that I did not expect but am extremely thankful for.

---

_Note: While I strive for "production-ready" code, this is an active engineering journey representing modern multi-service and cloud-native backend patterns._
