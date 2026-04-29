import { SEOPage } from "@/components/SEOPage";
import { JsonLd } from "@/components/JsonLd";

export const metadata = {
  title: "Pinterest Video Downloader - Save Pins & GIFs | Vytrixe",
  description: "Download Pinterest videos for free in high quality. Vytrixe is the fastest Pinterest downloader. Save Pins, Stories, and GIFs instantly.",
};

const FAQ_DATA = [
  {
    question: "How do I download a video from Pinterest?",
    answer: "Copy the link of the Pinterest video Pin, paste it into our search bar at Vytrixe, and click the download button to save it locally."
  },
  {
    question: "Does it work for Pinterest GIFs?",
    answer: "Yes, our downloader can fetch GIFs and save them as high-quality MP4 files or original animated images."
  },
  {
    question: "Is there a limit on Pinterest downloads?",
    answer: "No, Vytrixe allows unlimited Pinterest video downloads with no daily or monthly caps."
  },
  {
    question: "Is it safe to download content from Pinterest?",
    answer: "Yes, we use SSL encryption and do not store any user data or download history, ensuring your experience is private and secure."
  }
];

export default function PinterestVideoDownloader() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Download Pinterest Videos and Pins",
    "description": "Learn how to save high-quality Pinterest videos to your device using Vytrixe.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Copy Pin Link",
        "text": "Open Pinterest, find the video Pin, and copy its link from the browser bar or sharing menu."
      },
      {
        "@type": "HowToStep",
        "name": "Paste in Vytrixe",
        "text": "Go to the Vytrixe Pinterest downloader and paste the link into the input box."
      },
      {
        "@type": "HowToStep",
        "name": "Download Video",
        "text": "Press the download button and save the resulting MP4 file."
      }
    ]
  };

  return (
    <>
      <JsonLd data={howToSchema} />
      <SEOPage
        platform="Pinterest"
        title="Pinterest Video Downloader"
        subtitle="Save Pinterest videos and GIFs in HD quality for free."
        faqData={FAQ_DATA}
        content={
          <div className="space-y-12">
            <section>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Pinterest Video Downloader - Save Inspiration Instantly</h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Pinterest is a goldmine of creative ideas, DIY tutorials, and stunning visual stories. While the platform is great for discovery, downloading high-quality videos for offline viewing isn't built into their core feature set. Vytrixe provides the most reliable **Pinterest video downloader**, allowing you to bridge that gap and save any public Pin in HD quality.
              </p>
              <p className="mt-6 text-gray-600">
                **Start saving your favorite Pins now** by pasting the link above. Join the thousands of users who trust Vytrixe as their primary **free video downloader online**.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How to use Vytrixe for Pinterest Downloads</h2>
              <p className="mb-6 text-gray-600">Follow these three quick steps to get your Pinterest content instantly:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
                  <h4 className="font-bold text-orange-900">1. Copy Link</h4>
                  <p className="text-sm text-orange-700 mt-2">Find the video Pin on Pinterest and click the Share icon to 'Copy Link'.</p>
                </div>
                <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
                  <h4 className="font-bold text-orange-900">2. Paste Link</h4>
                  <p className="text-sm text-orange-700 mt-2">Open Vytrixe.com and paste the URL into the Pinterest search field.</p>
                </div>
                <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
                  <h4 className="font-bold text-orange-900">3. Save Video</h4>
                  <p className="text-sm text-orange-700 mt-2">Wait for the engine to fetch the Pin and click the download button.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Vytrixe?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">★</div>
                  <div>
                    <h4 className="font-bold">Original Quality</h4>
                    <p className="text-sm text-gray-600">We don't compress your files. You get the original high-bitrate MP4 file as uploaded to Pinterest.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">★</div>
                  <div>
                    <h4 className="font-bold">Lightning Fast</h4>
                    <p className="text-sm text-gray-600">Our servers are optimized for Pinterest's CDN, ensuring your downloads start in under 3 seconds.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-orange-600 text-white p-12 rounded-[50px]">
              <h3 className="text-2xl font-bold mb-4">The Best Pinterest Video Downloader of 2026</h3>
              <p className="text-orange-50 leading-relaxed">
                Vytrixe is recognized globally as the fastest and most stable **Pinterest video downloader** on the market. Our commitment to quality and user experience means we are constantly innovating to stay ahead of platform technical changes. Save your creative legacy today.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>
              <div className="space-y-6">
                {FAQ_DATA.map((faq, i) => (
                  <div key={i} className="border-b pb-8">
                    <h4 className="text-lg font-bold text-gray-900 font-serif">{faq.question}</h4>
                    <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        }
      />
    </>
  );
}
