export type SuccessResult<TData> = {
	status: "success";
	data: TData;
};

export type ErrorResult<TError> = {
	status: "error";
	error: TError;
};

export type Action = (
	...parameters: Array<any>
) => Promise<Result<any, any>> | Result<any, any>;

export type Result<TData, TError> = SuccessResult<TData> | ErrorResult<TError>;

export type InferInput<TAction extends Action> = Parameters<TAction>;

export type InferOutput<TAction extends Action> = Awaited<ReturnType<TAction>>;

export type InferSuccessResult<TResult> =
	TResult extends SuccessResult<infer Data> ? Data : never;

export type InferErrorResult<TResult> =
	TResult extends ErrorResult<infer Error> ? Error : never;

export type InferSuccessValue<TAction extends Action> = InferSuccessResult<
	InferOutput<TAction>
>;

export type InferErrorValue<TAction extends Action> = InferErrorResult<
	InferOutput<TAction>
>;

export type Options<TAction extends Action> = {
	onSuccess?: (data: InferSuccessValue<TAction>) => Promise<void> | void;
	onError?: (error: InferErrorValue<TAction>) => Promise<void> | void;
	onSettled?: (result: InferOutput<TAction>) => Promise<void> | void;
};
