import { Metadata } from "next"
import { DeidentifySection } from "@/components/deidentify/DeidentifySection"
import { PrivacyBanner } from "@/components/deidentify/PrivacyBanner"

export const metadata: Metadata = {
  title: "De-identify Medical Data - Astra Medical",
  description: "Securely de-identify your medical data with HIPAA compliance",
}

export default function DeidentifyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">De-identify Medical Data</h1>
          <p className="mt-2 text-sm text-gray-600">
            Remove personal health information (PHI) from your medical files securely.
          </p>
        </div>
        
        <PrivacyBanner />
        <DeidentifySection />
      </div>
    </div>
  )
}