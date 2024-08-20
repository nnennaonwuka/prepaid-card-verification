"use client";
import CancelIcon from "@/assets/icons/cancel-box.svg";
import CheckIcon from "@/assets/icons/check-circle.svg";
import WarningIcon from "@/assets/icons/warning.svg";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, variant = "error", action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid grid-cols-[6px_auto] gap-2">
              <div
                className={`${variant === "success" ? "bg-primary-green" : variant === "error" ? "bg-destructive" : "bg-primary-yellow"} w-[0.375rem]`}
              ></div>
              <div className="flex items-start gap-4 px-3 py-6">
                <Image
                  src={variant === "success" ? CheckIcon : variant === "error" ? CancelIcon : WarningIcon}
                  alt={`${variant} icon`}
                  width={24}
                  height={24}
                />
                <div className="grid gap-1">
                  {title && <ToastTitle>{title}</ToastTitle>}
                  {description && <ToastDescription>{description}</ToastDescription>}
                </div>
                {action}
              </div>
            </div>
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
