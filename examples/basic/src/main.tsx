import React from "react";
import ReactDOM from "react-dom/client";
import { error, ok, useAction } from "@vivid-web/react-action";
import { wait } from "./lib/utils.ts";
import { ComponentRef, FormEvent, useRef } from "react";
import { Button } from "./components/Button.tsx";
import "./index.css";

const state = new Map();

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

	await wait(2_000);

	return ok("Key-value pair created!");
};

function App() {
	const ref = useRef<ComponentRef<"form">>(null);

	const [dispatch, isPending] = useAction(myAction, {
		onError: (error) => {
			return alert(`Action failed - ${error}`);
		},
		onSuccess: (value) => {
			return alert(`Action succeeded - ${value}`);
		},
	});

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!ref.current) return;

		dispatch(new FormData(ref.current));
	};

	return (
		<form
			action={myAction}
			onSubmit={onSubmit}
			ref={ref}
			className="flex flex-1 flex-col gap-4 m-4"
		>
			<input
				type="text"
				name="key"
				placeholder="Enter a key"
				className="flex rounded border border-slate-200 p-2"
			/>
			<input
				type="text"
				name="value"
				placeholder="Enter a value"
				className="flex rounded border border-slate-200 p-2"
			/>
			<Button disabled={isPending} type="submit">
				{isPending ? "Loading..." : "Submit"}
			</Button>
		</form>
	);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
