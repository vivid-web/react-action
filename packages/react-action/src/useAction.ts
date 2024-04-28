"use client";

import type { Action, InferInput, InferOutput, Options } from "./types";
import { useTransition } from "react";

export const useAction = <TAction extends Action>(
	action: TAction,
	{ onSuccess, onError, onSettled }: Options<TAction> = {},
) => {
	const [isPending, startTransition] = useTransition();

	const dispatch = (...params: InferInput<TAction>) => {
		startTransition(async () => {
			const result = (await action(...params)) as InferOutput<TAction>;

			if (result.status === "success") {
				await onSuccess?.(result.data);
			}

			if (result.status === "error") {
				await onError?.(result.error);
			}

			await onSettled?.(result);
		});
	};

	return [dispatch, isPending] as const;
};
