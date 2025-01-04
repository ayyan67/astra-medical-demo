// src/components/layout/DemoBanner.tsx  <- Note: putting in layout folder since it's a layout component
import { Alert, AlertDescription } from "@/components/ui/alert";

export function DemoBanner() {
  return (
    <Alert className="rounded-none border-b">
      <AlertDescription className="text-center">
        🔬 Demo Mode: This is a technology demonstration. No real medical data is processed.
        <a href="https://github.com/ayyan67/astra-medical-demo" className="ml-2 underline">
          View Source
        </a>
      </AlertDescription>
    </Alert>
  );
}