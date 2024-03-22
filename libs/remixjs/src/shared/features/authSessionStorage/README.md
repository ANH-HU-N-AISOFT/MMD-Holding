# Overview

`AuthSessionStorage` manages authentication-related sessions using Remix's session storage. It provides functionalities to create, manage, and guard sessions within a Remix framework environment.

# API Reference

### Constructor

#### `AuthSessionStorage({ loginUrl, options }): AuthSessionStorage<Data>`

- `loginUrl`: URL to redirect to upon login.
- `options`: Session ID storage strategy options.

### Methods

- `getSession(request: Request): Promise<Session<Data, Data>>`: Retrieves the session based on the provided request object.
- `createSession({ request, sessionData, remember, redirectTo }): Promise<void>`: Creates or updates a session with provided data.
- `destroySession(request: Request): Promise<void>`: Destroys the session and redirects to the login URL.
- `guard({ request, homeUrl }): Promise<Data>`: Guards routes by checking session existence and returns session data. Throws a redirect if necessary.

# Usage

```typescript
// utils/sessionStorage.ts
type SessionData = {
  token: string;
  role: string;
};
const authSessionStorage = new AuthSessionStorage<SessionData>({
  loginUrl: "/login", // URL to redirect to upon login
  options: {},
});

// _auth.login.tsx
export const action = async ({ request }: ActionFunctionArgs): Promise<TypedResponse<ActionResponse>> => {
  /*
   * Code logic to get SessionData
   */
  const sessionData: SessionData = {
    token: "...",
    role: "...",
  };
  return sessionStorage.createSession({
    request,
    redirectTo: query.get("redirectTo") ?? "/dashboard",
    remember: data.remember,
    sessionData,
  });
};

// _auth.tsx
export const loader = async ({ request }: LoaderFunctionArgs) => {
  return sessionStorage.guard(request);
};

// _account.tsx
export const loader = async ({ request }: LoaderFunctionArgs) => {
  return sessionStorage.guard(request);
};
```
