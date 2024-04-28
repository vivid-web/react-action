import { ComponentProps } from "react";
import { cn } from "../lib/utils";

export function Button({ className, ...props }: ComponentProps<"button">) {
	return (
		<button
			{...props}
			className={cn("rounded bg-slate-800 p-2 text-slate-50", className)}
		/>
	);
}
