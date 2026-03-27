import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy - VYTRIXE",
  description: "Privacy policy and data usage information for VYTRIXE.",
};

export default function Privacy() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-4xl prose prose-blue lg:prose-lg">
          <h1 className="text-4xl font-extrabold text-gray-900 border-b pb-4">Privacy Policy</h1>
          <p className="mt-8 text-gray-600">
            Your privacy is important to us. This Privacy Policy explains how VYTRIXE Downloader ("we", "us", or "our") collects, uses, and protects your information when you use our service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">1. Data Collection & Analytics</h2>
          <p className="text-gray-600">
            We use Google Analytics to understand how visitors interact with our website. This data is collected only after you grant consent via our cookie banner. The information collected includes your IP address, browser type, and site usage patterns, which helps us improve our service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">2. Advertising</h2>
          <p className="text-gray-600">
            VYTRIXE may display advertisements provided by third-party ad networks. These networks may use cookies to serve personalized ads based on your previous visits to our site or other sites on the internet. Personalized advertising is only enabled if you accept our cookie policy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">3. Video Downloads</h2>
          <p className="text-gray-600">
            VYTRIXE is a technical service that processes video URLs. We do not store or host any of the videos you download on our servers. All processing is done transiently to provide you with the download link.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">4. User Rights (GDPR/CCPA)</h2>
          <p className="text-gray-600">
            Depending on your location, you may have rights regarding your personal data, including the right to access, correct, or delete any data we might have collected through analytics. You can withdraw your consent at any time by clearing your browser cookies.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">5. Third-Party Services</h2>
          <p className="text-gray-600">
            Our service relies on third-party APIs and services (like Google Analytics and Ad Networks). We encourage you to review their respective privacy policies to understand how they handle data.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">6. Contact Information</h2>
          <p className="text-gray-600">
            If you have any questions regarding this Privacy Policy, please reach out via our contact page.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
