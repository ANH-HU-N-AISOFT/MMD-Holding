# Overview

`defer-if` is a utility package that extends the functionality of Remix's `defer` method, allowing you to easily conditionally defer or not defer data based on some programmatic criteria.

# Usage

This is a quick demo showing how to use `defer-if` to only defer data when the user agent is a
mobile device.

```jsx
import { deferIf } from "defer-if";
import { isMobileUserAgent } from "../your-utils";

export function loader({ request }) {
    const data = {
        value1: await fetchSomething(), // this will always block (never defer)
        value2: "This is a static value",
        value3: fetchSomethingElse(), // this will either block or defer based on `deferIf`
    };

    // Using deferIf
   return await deferIf(data, isMobileUserAgent(request));
}

export default function Component() {
    const data = useLoaderData<typeof loader>();

    return (
        <Suspense fallback="Loading...">
            <Await resolve={data.value3}>
                {(value) => <MyComponent /* ... props */ />}
            </Await>
        </Suspense>
    );
}
```

## Documentation

`deferIf` accepts three arguments:

1. **data**: An object containing key-value pairs where values can be Promises or any other values.
2. **predicate**: A function that returns a boolean value or a boolean value itself. If the function returns true, the promise will be deferred (not awaited); otherwise, it will be awaited (blocking the response).
3. **options**: An optional configuration object containing:
   - **init**: A number or ResponseInit value.
   - **alwaysAwait**: An array of keys that should always be awaited, even if the predicate returns true.
   - **neverAwait**: An array of keys that should never be awaited, even if the predicate returns false.
