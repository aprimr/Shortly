import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";

const totalClicks = 555;
const mostClicked = { shortUrl: "short.ly/top555", longUrl: "https://top-performer.com", clicks: 555 };
const totalShortened = 5;

export default function AnalyticsPage() {
  const [urls, setUrls] = useState([
    { id: 1, shortUrl: "shortly-jjkj.onrender.com/abc123", longUrl: "https://example.com/page1", clicks: 123 },
    { id: 2, shortUrl: "short.ly/xyz456", longUrl: "https://example.com/page2", clicks: 456 },
    { id: 3, shortUrl: "short.ly/def789", longUrl: "https://example.com/page3", clicks: 789 },
  ]);
  
  const [copied, setCopied] = useState(null);

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(shortUrl);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white py-10 px-4">
      <h1 className="text-3xl font-semibold mb-6">URL Analytics</h1>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-6xl">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold text-gray-200">Total Clicks</h2>
          <p className="text-3xl font-bold text-emerald-400">{totalClicks}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold text-gray-200">Top Performer Clicks</h2>
          <p className="text-3xl font-semibold text-emerald-400">{mostClicked.clicks}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-lg font-semibold text-gray-200">Total URLs Shortened</h2>
          <p className="text-3xl font-bold text-emerald-400">{totalShortened}</p>
        </div>
      </div>

      {/* URL Analytics Table */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-6xl">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">All URLs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-200">SN</th>
                <th className="px-4 py-2 text-left text-gray-200">Original URL</th>
                <th className="px-4 py-2 text-left text-gray-200">Short URL</th>
                <th className="px-4 py-2 text-left text-gray-200">Clicks</th>
                <th className="px-4 py-2 text-left text-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url, index) => (
                <tr key={url.id} className="hover:bg-gray-700">
                  <td className="px-4 py-2 text-gray-200">{index + 1}</td>
                  <td className="px-4 py-2 text-gray-400 truncate max-w-xs">{url.longUrl}</td>
                  <td className="px-4 py-2 text-emerald-400">{url.shortUrl}</td>
                  <td className="px-4 py-2 text-gray-400">{url.clicks}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleCopy(url.shortUrl)}
                      className="bg-gray-700 text-white hover:bg-gray-600 py-2 px-4 rounded-full flex items-center"
                    >
                      {copied === url.shortUrl ? (
                        <FaCheck className="text-emerald-500 text-xl mr-2" />
                      ) : (
                        <FiCopy className="text-xl mr-2" />
                      )}
                      {copied === url.shortUrl ? 'Copied' : 'Copy'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={() => window.history.back()}
        className="mt-6 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-gray-900 rounded-md flex items-center"
      >
        <IoMdArrowBack className="mr-2" />
        Back to Dashboard
      </button>
    </div>
  );
}
