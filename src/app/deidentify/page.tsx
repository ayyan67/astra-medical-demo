import { Metadata } from "next"
import { DeidentifySection } from "@/components/deidentify/DeidentifySection"
import { PrivacyBanner } from "@/components/deidentify/PrivacyBanner"
import Navigation from "@/components/layout/Navigation"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "De-identify Medical Data - Astra Medical",
  description: "Securely de-identify your medical data with HIPAA compliance",
}

export default function DeidentifyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">De-identify Medical Data</h1>
        <p className="mt-2 text-sm text-gray-600 mb-8">
          Remove personal health information (PHI) from your medical files securely.
        </p>

        <div className="space-y-6">
          <Card className="p-6">
            <PrivacyBanner />
            <div className="mt-6">
              <DeidentifySection />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}