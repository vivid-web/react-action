# @vivid-web/react-action

> **⚠️ Do not use in production! This is a proof of concept and relies on the beta version of React 19. ⚠️**

## Example

The following is a basic example to get the ball rolling:

```tsx
import { ComponentRef, FormEvent, useRef } from "react";
import { error, success, useAction } from "@vivid-web/react-action";

// For demonstration purposes, we create a simple in-memory store
const state = new Map();

// Define the action you want to perform
const myAction = async (data: FormData) => {
	const key = data.get("key");
	const value = data.get("value");

	if (!key || !value) {
		return error("Key and value are required");
	}

	if (state.has(key)) {
		return error("Key already exists");
	}

	state.set(key, value);

	return success("Key-value pair created!");
};

function App() {
	const [dispatch, isPending] = useAction(myAction, {
		// Will be called when the action returns an error-response
		onError: (error) => {
			return alert(`Action failed - ${error}`);
		},
		// Will be called when the action returns an success-response
		onSuccess: (value) => {
			return alert(`Action succeeded - ${value}`);
		},
	});

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// We dispatch the action with the form data
		dispatch(new FormData(event.target as HTMLFormElement));
	};

	return (
		<form action={myAction} onSubmit={onSubmit}>
			<input type="text" name="key" placeholder="Enter a key" />
			<input type="text" name="value" placeholder="Enter a value" />
			<button disabled={isPending} type="submit">
				{isPending ? "Loading..." : "Submit"}
			</button>
		</form>
	);
}
```
