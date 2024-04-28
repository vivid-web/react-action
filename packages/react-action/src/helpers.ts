import type { ErrorResult, SuccessResult } from "./types";

export const notOk = <TError>(error: TError): ErrorResult<TError> => ({
	status: "error",
	error,
});

export const ok = <TData>(data: TData): SuccessResult<TData> => ({
	status: "success",
	data,
});

export const error = notOk;

export const success = ok;
