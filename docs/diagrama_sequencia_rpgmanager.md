# Sequence Diagram — RPG Manager

Source: `diagrama_sequencia_rpgmanager.drawio`

Two main authentication/infrastructure flows.

---

## 1. Database stability check

Verifies whether the database is healthy before continuing with system operations.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant HealthController
    participant HealthService
    participant Database

    User->>HealthController: Requests database verification
    HealthController->>HealthService: Runs health check
    HealthService->>Database: Queries the database
    Database-->>HealthService: return
    HealthService-->>HealthController: return
    HealthController-->>User: return
```

### Participants

| Participant | Role |
| --- | --- |
| User | Actor who requests the check |
| HealthController | Boundary / health API |
| HealthService | Control / health-check logic |
| Database | Entity / database |

### Steps

1. The user requests a database check.
2. `HealthController` triggers the health check on `HealthService`.
3. `HealthService` queries the database.
4. The result returns through the chain back to the user.

---

## 2. User registration

Registration flow via `POST /auth/register`.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant AuthService
    participant UserRepository
    participant Database

    User->>AuthService: POST /auth/register
    AuthService->>UserRepository: Checks whether the email exists
    UserRepository->>Database: Queries the database
    Database-->>UserRepository: return
    UserRepository-->>AuthService: return
    AuthService->>AuthService: Password encryption
    AuthService->>UserRepository: Creates user
    UserRepository->>Database: Persists the user
    Database-->>UserRepository: return
    UserRepository-->>AuthService: return
    AuthService-->>User: return
```

### Participants

| Participant | Role |
| --- | --- |
| User | Actor who registers |
| AuthService | Boundary / authentication service |
| UserRepository | Control / user data access |
| Database | Entity / database |

### Steps

1. The user sends `POST /auth/register`.
2. `AuthService` asks `UserRepository` to check whether the email already exists.
3. The repository queries the database and returns the result.
4. `AuthService` encrypts the password (self-call).
5. `AuthService` requests user creation.
6. The repository persists the user in the database and the result returns to the user.

### Legend (Draw.io UML notation)

| Symbol | Meaning |
| --- | --- |
| Solid / filled arrow | Synchronous message |
| Open arrow | Asynchronous message |
| Dashed arrow | Return |
