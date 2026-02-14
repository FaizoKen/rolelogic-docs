---
sidebar_position: 4
title: Role Link API Reference - External Token-Based API
description: Complete API reference for the RoleLogic Role Link external API. Manage role-linked users programmatically using token-based authentication.
keywords:
  - RoleLogic API
  - Role Link API
  - external API
  - token authentication
  - role link users
  - Discord role automation API
  - REST API reference
  - role management API
image: /img/social-preview.png
---

# Role Link API Reference

The Role Link external API lets you manage users linked to a Discord role programmatically. Use it to integrate RoleLogic with your own applications, websites, or services — for example, granting a Discord role to users who complete a purchase, pass verification, or meet custom criteria.

**All endpoints require token-based authentication.** Tokens are scoped to a single role link (one guild + one role).

---

## Authentication

Every request must include an `Authorization` header with the `Token` scheme:

```
Authorization: Token rl_your_token_here
```

### Generating a Token

1. Open the **RoleLogic Dashboard** for your server
2. Navigate to **Role Links**
3. Select or create a role link
4. Click **Reset Token** to generate a new token

:::warning
Tokens are shown **only once** when generated. Store your token securely — it cannot be retrieved later. If you lose it, generate a new one (this invalidates the previous token).
:::

---

## Base URL

```
https://apirolelogic.faizo.net
```

All endpoint paths below are relative to this base URL.

---

## Path Parameters

All endpoints use the following path parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `guildId` | string | The Discord server (guild) ID |
| `roleId` | string | The Discord role ID |
| `userId` | string | A Discord user ID (snowflake format, 17–20 digits) |

---

## Endpoints

### List Users

Returns all user IDs currently linked to this role.

```
GET /api/role-link/:guildId/:roleId/users
```

**Response**

```json
{
  "data": [
    "123456789012345678",
    "234567890123456789"
  ]
}
```

`data` is an array of Discord user ID strings. Returns an empty array if no users are linked.

---

### Replace Users (Batch Set)

Replaces the entire user list with the provided array. This is an atomic operation — the old list is fully removed and the new list is inserted.

```
PUT /api/role-link/:guildId/:roleId/users
```

**Request Body**

A JSON array of Discord user ID strings:

```json
[
  "123456789012345678",
  "234567890123456789",
  "345678901234567890"
]
```

- Each ID must be a valid Discord snowflake (17–20 digits).
- Duplicates are automatically removed.
- Maximum number of users depends on your plan (see [Limits](#limits)).

**Response**

```json
{
  "data": {
    "user_count": 3
  }
}
```

`user_count` reflects the number of unique users stored after deduplication.

---

### Check User

Check whether a specific user is in the linked user list.

```
GET /api/role-link/:guildId/:roleId/users/:userId
```

**Response**

```json
{
  "data": {
    "exists": true
  }
}
```

Returns `true` if the user is in the list, `false` otherwise.

---

### Add User

Add a single user to the linked user list. This operation is **idempotent** — adding a user who already exists returns `added: false` without error.

```
POST /api/role-link/:guildId/:roleId/users/:userId
```

**Response**

```json
{
  "data": {
    "added": true
  }
}
```

| Field | Description |
|-------|-------------|
| `added: true` | User was newly added |
| `added: false` | User already existed in the list |

---

### Remove User

Remove a single user from the linked user list. This operation is **idempotent** — removing a user who doesn't exist returns `removed: false` without error.

```
DELETE /api/role-link/:guildId/:roleId/users/:userId
```

**Response**

```json
{
  "data": {
    "removed": true
  }
}
```

| Field | Description |
|-------|-------------|
| `removed: true` | User was removed |
| `removed: false` | User was not in the list |

---

## Limits

| Resource | Free Plan | Premium |
|----------|-----------|---------|
| Users per role link | 100 | 1,000,000 |
| Role links per server | 10 | 10 |

Exceeding the user limit on **Add User** or **Replace Users** returns a `400` error.

---

## Error Responses

All errors follow this format:

```json
{
  "statusCode": 401,
  "message": "Authorization header required"
}
```

### Error Reference

| Status | Message | Cause |
|--------|---------|-------|
| `401` | Authorization header required | Missing `Authorization` header |
| `401` | Invalid authorization scheme. Use: Token \<token\> | Wrong scheme (e.g., `Bearer` instead of `Token`) |
| `403` | Invalid or revoked token | Token does not match the guild/role, or has been reset |
| `403` | This role link is disabled | The role link exists but is disabled in the dashboard |
| `400` | Maximum N users per role link | User limit exceeded (see [Limits](#limits)) |
| `400` | Validation error | Request body failed validation (e.g., invalid user ID format) |
| `404` | Role link not found | No role link exists for this guild/role combination |

---

## Example: cURL

```bash
# List all users
curl -H "Authorization: Token rl_your_token_here" \
  https://apirolelogic.faizo.net/api/role-link/123456789/987654321/users

# Add a user
curl -X POST -H "Authorization: Token rl_your_token_here" \
  https://apirolelogic.faizo.net/api/role-link/123456789/987654321/users/111222333444555666

# Replace all users
curl -X PUT -H "Authorization: Token rl_your_token_here" \
  -H "Content-Type: application/json" \
  -d '["111222333444555666", "222333444555666777"]' \
  https://apirolelogic.faizo.net/api/role-link/123456789/987654321/users

# Check if a user exists
curl -H "Authorization: Token rl_your_token_here" \
  https://apirolelogic.faizo.net/api/role-link/123456789/987654321/users/111222333444555666

# Remove a user
curl -X DELETE -H "Authorization: Token rl_your_token_here" \
  https://apirolelogic.faizo.net/api/role-link/123456789/987654321/users/111222333444555666
```

---

## Related

- **[Limits Reference](./limits-reference)** — All system limits and quotas
- **[Plans & Pricing](../plans)** — Upgrade options for higher user limits
- **[FAQ](../faq)** — Common questions answered
