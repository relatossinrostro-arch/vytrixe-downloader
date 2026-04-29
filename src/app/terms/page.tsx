import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Terms of Service - Vytrixe",
  description: "Terms and conditions for using the Vytrixe video downloader service.",
};

export default function Terms() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-4xl prose prose-blue lg:prose-lg">
          <h1 className="text-4xl font-extrabold text-gray-900 border-b pb-4">Terms of Service</h1>
          <p className="mt-8 text-gray-600">
            Welcome to Vytrixe Downloader. By using our website, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-12">1. Acceptance of Agreement</h2>
          <p className="text-gray-600">
            By accessing and using Vytrixe, you accept and agree to be bound by the terms of this agreement. If you do not agree to these terms, you should not use this site.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">2. No Content Hosting</h2>
          <p className="text-gray-600">
            Vytrixe does not host any of the video or audio files downloaded through our service. We only provide a technical service that allows users to access and download content from third-party platforms.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">3. User Responsibility</h2>
          <p className="text-gray-600">
            Users are solely responsible for the content they download. You agree to use the service only for lawful purposes and in accordance with the terms of service of the video's original platform (e.g., YouTube, TikTok, Instagram).
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">4. Copyright Disclaimer</h2>
          <p className="text-gray-600">
            You must respect the intellectual property rights of others. You agree not to use Vytrixe to download copyrighted content without the express permission of the copyright holder. Vytrixe is intended for personal, non-commercial use only.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">5. Disclaimer of Warranties</h2>
          <p className="text-gray-600">
            The service is provided "as is" and "as available" without any warranties of any kind. We do not guarantee that the service will be uninterrupted or error-free.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

