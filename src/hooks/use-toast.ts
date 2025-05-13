
import { toast } from "sonner";
import { useToast as useToastInternal } from "@/components/ui/use-toast";

export { toast };
export const useToast = useToastInternal;

// Re-export interface types
export type {
  Toast,
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast";
