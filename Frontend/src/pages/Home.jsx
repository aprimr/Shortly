import React, { useState } from "react";
import HeroImg from '../assets/HeroImg.png';
import { FaCopy } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState(null);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const navigate = useNavigate()

  const handleShorten = () => {
    if (!originalUrl) return;
    // Simulating a shortened URL (Replace with API call)
    setShortenedUrl(`https://short.ly/${btoa(originalUrl).slice(0, 6)}`);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBack = () => {
    setShortenedUrl(null);
    setOriginalUrl("");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white py-10 px-4 relative">
      {/* Search Icon and Text */}
      {!isSearchVisible && shortenedUrl === null && (
        <div className="absolute top-4 right-8 flex flex-row gap-1 items-center ">
          <span className="text-sm md:text-lg text-white flex items-center animate-pulse">Search <IoIosArrowForward /></span>
          <button
            onClick={toggleSearch}
            className="flex items-center gap-2 bg-gray-800 rounded-md text-2xl text-white p-1"
          >
            <CiSearch />
          </button>
        </div>
      )}


      {/* Search Popup */}
      {isSearchVisible && shortenedUrl === null && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-95 flex justify-center items-center z-50">
          <div className="w-full flex gap-2 justify-center items-center max-w-xl bg-gray-800 p-4 rounded-lg">
            <div className="flex flex-col items-center w-full">
              <label className="text-lg mb-2 text-white">Search URLs here</label>
              <div className="flex w-full flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-full bg-gray-700 border border-gray-600 shadow-xl text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button
                  onClick={toggleSearch}
                  className="bg-emerald-500 hover:bg-emerald-600 flex flex-row justify-center items-center gap-1 text-gray-900 p-3 rounded-full mt-4 sm:mt-0 sm:w-auto w-full h-full"
                >
                  <CiSearch className="text-2xl" /><p className="md:hidden">Search URL</p>
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={toggleSearch}
            className="absolute p-1 rounded-md top-4 right-8 bg-gray-900 text-white text-2xl"
          >
            <IoMdClose />
          </button>
        </div>
      )}

      {shortenedUrl === null && (
        <img src={HeroImg} alt="URL Shortener" className="w-64 md:w-80 mx-auto mb-6" />
      )}

      {shortenedUrl === null ? (
        <div className="w-full max-w-xl bg-gray-800 p-8 rounded-lg shadow-xl text-center space-y-6">
          <h1 className="text-3xl font-semibold text-white">Enter Long URL Here</h1>
          <input
            type="text"
            className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter your long URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <button
            onClick={handleShorten}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold py-3 rounded-lg transition"
          >
            Shorten URL
          </button>
          <button
            onClick={()=>navigate('/analytics')}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold py-3 rounded-lg transition mt-4"
          >
            View All URLs
          </button>
        </div>
      ) : (
        <div className="w-full max-w-xl bg-gray-800 p-8 rounded-lg shadow-xl text-center space-y-6">
          <h1 className="text-3xl font-semibold text-white">Shortened URL Result</h1>
          <div className="text-left">
            <strong className="text-white">Original URL:</strong>
            <p className="text-gray-400 text-sm break-all">{originalUrl}</p>
          </div>
          <div className="text-left">
            <strong className="text-white">Shortened URL:</strong>
            <div className="mt-3 p-4 bg-gray-700 rounded-lg flex justify-between items-center">
              <span className="truncate text-emerald-500 text-lg">{shortenedUrl}</span>
              <button
                onClick={handleCopy}
                className="ml-2 text-white hover:text-emerald-500"
              >
                {copied ? <FiCheck className="text-emerald-500 text-xl" /> : <FaCopy className="text-xl" />}
              </button>
            </div>
          </div>
          {/* Only the Back button here */}
          <button
            onClick={handleBack}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition mt-4"
          >
            <IoMdArrowBack className="inline mr-2" />
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
