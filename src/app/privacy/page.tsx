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
            Your privacy is important to us. This Privacy Policy explains how VYTRIXE Downloader collects, uses, and protects your information.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">1. Information We Collect</h2>
          <p className="text-gray-600">
            VYTRIXE does not require users to register or provide any personal information. We do not store any identifying data such as your name, email, or IP address in association with the videos you download.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">2. Usage Data</h2>
          <p className="text-gray-600">
            We may collect non-personal information about your visit to our site, such as the type of browser you use, the pages you visit, and the time spent on the site. This data is used solely to improve our service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">3. Cookies</h2>
          <p className="text-gray-600">
            We use cookies to enhance your browsing experience and for analytical purposes. You can choose to disable cookies in your browser settings, though this may affect some features of the site.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">4. Third-Party Links</h2>
          <p className="text-gray-600">
            Our site may contain links to third-party websites. We are not responsible for the privacy practices or the content of those websites.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">5. Updates to This Policy</h2>
          <p className="text-gray-600">
            We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

