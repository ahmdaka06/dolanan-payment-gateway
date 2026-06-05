import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  isInvalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, isInvalid, ...props }, ref) => (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border bg-white px-3 text-sm text-zinc-950 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500",
        isInvalid
          ? "border-red-400 focus:border-red-500 focus:ring-red-500/20 dark:border-red-800"
          : "border-zinc-200 dark:border-zinc-800",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

Input.displayName = "Input";
