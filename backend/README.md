Skill Tracker Application Service Layer

This document summarizes the progress in building the core service and persistence layers for the Skill Tracker application. The design strictly adheres to a modular, layer-separated architecture to ensure testability, maintainability, and flexibility.

1. Data Contract and Validation (Entities)

All foundational data structures are defined and validated at runtime using Zod schemas to guarantee data integrity across the application layers.

SkillEntity: The complete, canonical representation of a skill, including database-generated fields (skillId, updatedAt).

CreateSkillPayload: The specific data shape required for inserting a new skill, which excludes the auto-generated skillId and updatedAt.

2. Storage Abstraction (Interface)

The SkillsStorage interface defines the mandatory contract for all data access modules, ensuring the business logic remains decoupled from the persistence technology.

The contract mandates all standard CRUD operations: getAll(), getById(), insert(), and delete().

3. Storage Implementations (Persistence)

Two interchangeable implementations fulfill the SkillsStorage contract, allowing the application to easily switch between mock and production environments based on configuration.

Implementation

Purpose

Key Technical Details

SkillsMockStorage

Used for local testing and scenarios where database access is mocked.

Implements persistence using standard JavaScript array methods (find, filter).

SkillsDbStorage

Production implementation using Knex (SQL query builder).

Knex/Zod Integration: All raw database results are immediately validated with Zod upon retrieval. Insertion (insert) correctly uses .returning('\*') with array destructuring (const [record] = await ...) to fetch the complete, newly created row.

4. Utility Components

Essential supporting files for the application structure:

Table Enum: Provides canonical, type-safe names for database tables (app.skills).

Logger: A robust logging utility built on Winston that integrates environment awareness (e.g., using colorized output for "local" environments and JSON for production) and injects metadata like appVersion.

Current Status: Finalizing Dependencies

All core data entities, interfaces, and storage implementations are complete.

The final task is to define the Application Configuration (AppConfig) structure. This is required to complete the dependency injection logic in app-services.ts which decides whether to instantiate SkillsMockStorage or SkillsDbStorage.
