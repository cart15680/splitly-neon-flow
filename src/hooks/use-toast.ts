
import { toast as sonnerToast } from "sonner";
import * as React from "react";

// Define the interface types directly here to avoid circular dependencies
export interface Toast {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
}

export type ToastActionElement = React.ReactElement;

export interface ToastProps {
  toast: Toast;
  className?: string;
  style?: React.CSSProperties;
}

// Create a simple toast context
const ToastContext = React.createContext<{
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

// Export a properly typed toast function
export const toast = (props: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
}) => {
  if (props.variant === "destructive") {
    return sonnerToast.error(props.title as string, {
      description: props.description as string,
    });
  }
  
  return sonnerToast(props.title as string, {
    description: props.description as string,
  });
};

// Export the useToast hook
export function useToast() {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback(
    (data: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, ...data }]);
      
      // Also trigger the sonner toast
      if (data.variant === "destructive") {
        sonnerToast.error(data.title as string, {
          description: data.description as string,
        });
      } else {
        sonnerToast(data.title as string, {
          description: data.description as string,
        });
      }
    },
    [setToasts]
  );

  const removeToast = React.useCallback(
    (id: string) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    },
    [setToasts]
  );

  const value = React.useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
    }),
    [toasts, addToast, removeToast]
  );

  return value;
}
