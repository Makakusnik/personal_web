import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-text-on-primary [a&]:hover:bg-primary-hover",
        secondary:
          "border-transparent bg-secondary text-text-on-secondary [a&]:hover:bg-secondary-hover",
        destructive:
          "border-transparent bg-error text-white dark:text-text-on-primary [a&]:hover:bg-error/90 focus-visible:ring-error/20 dark:focus-visible:ring-error/40 dark:bg-error/60",
        outline:
          "text-foreground [a&]:hover:bg-slate-100 [a&]:hover:text-slate-900 dark:[a&]:hover:bg-slate-800 dark:[a&]:hover:text-slate-50",
        online:
          "border-transparent bg-success text-success-secondary [a&]:hover:bg-success",
        "in-progress":
          "border-transparent bg-warning text-warning-secondary [a&]:hover:bg-warning",
        offline:
          "border-transparent bg-error text-error-secondary [a&]:hover:bg-error",
        saas: "border-transparent bg-badge-1 text-badge-1-secondary [a&]:hover:bg-badge-1/80",
        website:
          "border-transparent bg-badge-2 text-badge-2-secondary [a&]:hover:bg-badge-2/80",
        portfolio:
          "border-transparent bg-badge-3 text-badge-3-secondary [a&]:hover:bg-badge-3/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
