import * as React from "react";
import {
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle as HeadlessDialogTitle,
  Description as HeadlessDialogDescription,
} from "@headlessui/react";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const DialogContext = React.createContext<
  { setOpen: (open: boolean) => void } | undefined
>(undefined);

function Dialog({
  open,
  onOpenChange,
  children,
  ...props
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled =
    typeof open === "boolean" && typeof onOpenChange === "function";
  const actualOpen = isControlled ? open : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  return (
    <DialogContext.Provider value={{ setOpen }}>
      <HeadlessDialog
        transition
        open={actualOpen}
        onClose={setOpen}
        className="z-50 fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-closed:opacity-0"
        {...props}
      >
        {children}
      </HeadlessDialog>
    </DialogContext.Provider>
  );
}

function DialogTrigger({ children, ...props }: React.ComponentProps<"button">) {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error("DialogTrigger must be used within a Dialog");
  return (
    <button type="button" onClick={() => context.setOpen(true)} {...props}>
      {children}
    </button>
  );
}

function DialogOverlay({
  className = "",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 -z-40 bg-slate-900/50 dark:bg-slate-950/80",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className = "",
  children,
  ...props
}: React.ComponentProps<"div">) {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error("DialogContent must be used within a Dialog");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center isolate">
      <DialogOverlay />
      <DialogPanel
        data-slot="dialog-content"
        className={cn(
          "bg-background w-full md:max-w-4xl p-4 sm:p-6 md:rounded-lg border border-border shadow-lg grid gap-4 relative overflow-y-auto max-h-full md:max-h-[90vh]",
          className,
        )}
        {...props}
      >
        {children}
        <button
          type="button"
          className="text-black dark:text-white ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          onClick={() => context.setOpen(false)}
        >
          <XIcon />
          <span className="sr-only">Close</span>
        </button>
      </DialogPanel>
    </div>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-4 sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof HeadlessDialogTitle>) {
  return (
    <HeadlessDialogTitle
      data-slot="dialog-title"
      className={cn("text-2xl leading-none font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof HeadlessDialogDescription>) {
  return (
    <HeadlessDialogDescription
      data-slot="dialog-description"
      className={cn("text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
};
