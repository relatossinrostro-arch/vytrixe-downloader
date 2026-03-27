import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Cookie Policy - VYTRIXE",
  description: "Detailed information about how VYTRIXE uses cookies to improve your experience.",
};

export default function CookiePolicy() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-4xl prose prose-blue lg:prose-lg">
          <h1 className="text-4xl font-extrabold text-gray-900 border-b pb-4">Cookie Policy</h1>
          <p className="mt-8 text-gray-600 italic">
            Last Updated: March 2026
          </p>
          <p className="text-gray-600">
            This Cookie Policy explains how VYTRIXE ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website at vytrixe.com.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">What are cookies?</h2>
          <p className="text-gray-600">
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Types of cookies we use</h2>
          <div className="space-y-6 mt-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Essential Cookies</h3>
              <p className="text-sm text-gray-600">These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.</p>
            </div>
            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <h3 className="text-lg font-bold text-blue-900 mb-2">Analytics Cookies</h3>
              <p className="text-sm text-gray-600">These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are.</p>
            </div>
            <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
              <h3 className="text-lg font-bold text-purple-900 mb-2">Advertising Cookies</h3>
              <p className="text-sm text-gray-600">These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">How can I control cookies?</h2>
          <p className="text-gray-600">
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Banner that appears when you first visit our site. 
          </p>
          <p className="text-gray-600 mt-4">
            You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12">Contact us</h2>
          <p className="text-gray-600">
            If you have any questions about our use of cookies or other technologies, please <Link href="/contact" className="text-blue-600 hover:underline">contact us</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
