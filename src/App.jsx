import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import FileUploadZone from "./components/FileUploadZone";
import CompressionSettings from "./components/CompressionSettings";
import CompressionResult from "./components/CompressionResult";
import FeaturesSection from "./components/FeaturesSection";
import { compressionApi } from "./api/compressionApi";
import { AlertCircle, Github, Twitter, MessageSquare } from "lucide-react";

export default function App() {
  const [files, setFiles] = useState([]);
  const [format, setFormat] = useState("zip");
  const [compressionLevel, setCompressionLevel] = useState(6);
  const [preserveStructure, setPreserveStructure] = useState(true);
  const [formats, setFormats] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiError, setApiError] = useState(null);
  const compressRef = useRef(null);

  useEffect(() => {
    const fetchFormats = async () => {
      try {
        const data = await compressionApi.getFormats();
        setFormats(data);
      } catch (err) {
        console.error("Failed to fetch formats:", err);
        setApiError("Failed to connect to compression service");
      }
    };
    fetchFormats();
  }, []);

  useEffect(() => {
    const handleBrowserBack = () => {
      if (result) {
        handleNewCompression();
      }
    };

    if (result) {
      window.history.pushState({ screen: "result" }, "");
    }

    window.addEventListener("popstate", handleBrowserBack);
    return () => window.removeEventListener("popstate", handleBrowserBack);
  }, [result]);
  const handleFilesSelected = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setError(null);
    setResult(null);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleCompress = async () => {
    if (files.length === 0) {
      setError("Please select at least one file");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      let response;
      if (files.length === 1) {
        response = await compressionApi.compressFile(
          files[0],
          format,
          compressionLevel,
          preserveStructure,
          (progress) => console.log("Upload progress:", progress),
        );
      } else {
        response = await compressionApi.compressFiles(
          files,
          format,
          compressionLevel,
          (progress) => console.log("Upload progress:", progress),
        );
      }

      // FIXED: Extract data from Axios response to avoid "0 undefined"
      const finalResult = response.data || response;
      setResult(finalResult);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!result) return;
    try {
      const blob = await compressionApi.downloadFile(result.downloadId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = result.filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleNewCompression = () => {
    // FIXED: Fully resetting state to avoid 404/stale view
    setFiles([]);
    setResult(null);
    setError(null);
    setFormat("zip");
    setCompressionLevel(6);
    setPreserveStructure(true);
  };

  const scrollToCompress = () => {
    compressRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <Header />

      {apiError && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 left-4 right-4 max-w-md mx-auto z-40 card p-4 border-red-500/30 bg-red-500/5"
        >
          <div className="flex items-center gap-3">
            <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
            <p className="text-sm text-red-300">{apiError}</p>
          </div>
        </motion.div>
      )}

      {!result && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden"
        >
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div
              animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute bottom-20 left-20 w-72 h-72 bg-primary-400/5 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-5xl mx-auto text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/30 bg-primary-500/10">
                <span className="text-sm font-medium text-primary-300">
                  ⚡ Free & Open Source
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6">
                <span className="text-white">Compress Files</span>
                <br />
                <motion.span
                  className="gradient-text inline-block"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  At Lightning Speed
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8"
            >
              Advanced file compression with ZIP, GZIP, and Brotli algorithms.
              <br className="hidden md:block" />
              Reduce file sizes by up to 90% without quality loss.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mb-10"
            >
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary-400">
                  90%
                </p>
                <p className="text-xs md:text-sm text-gray-400">
                  Max Compression
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary-400">
                  &lt;1s
                </p>
                <p className="text-xs md:text-sm text-gray-400">Avg. Speed</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary-400">
                  100%
                </p>
                <p className="text-xs md:text-sm text-gray-400">Secure</p>
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToCompress}
                className="btn-primary gap-2 flex items-center"
              >
                ⚡ Start Compressing
              </motion.button>

              <motion.a
                href="https://github.com/kelvink17"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center gap-2"
              >
                📦 View on GitHub
              </motion.a>
            </div>
          </div>
        </motion.section>
      )}

      <motion.section
        ref={compressRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-dark-900/50 to-dark-950"
      >
        <div className="max-w-5xl mx-auto">
          {!result ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Upload & Compress
                </h2>
                <p className="text-gray-400 text-lg">
                  Drag and drop files or click to browse
                </p>
              </motion.div>

              <div className="space-y-6 md:space-y-8">
                <FileUploadZone
                  onFilesSelected={handleFilesSelected}
                  files={files}
                  onRemoveFile={handleRemoveFile}
                />

                <CompressionSettings
                  format={format}
                  setFormat={setFormat}
                  compressionLevel={compressionLevel}
                  setCompressionLevel={setCompressionLevel}
                  preserveStructure={preserveStructure}
                  setPreserveStructure={setPreserveStructure}
                  formats={formats}
                  isSingleFile={files.length === 1}
                />

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-4 border-red-500/30 bg-red-500/5"
                  >
                    <p className="text-red-400 text-sm">{error}</p>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCompress}
                  disabled={files.length === 0 || isLoading}
                  className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "⏳ Compressing..." : "🚀 Compress Files"}
                </motion.button>
              </div>
            </>
          ) : (
            <CompressionResult
              result={result}
              isLoading={isLoading}
              error={error}
              onDownload={handleDownload}
              onNewCompression={handleNewCompression}
            />
          )}
        </div>
      </motion.section>

      {!result && <FeaturesSection />}

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-dark-700 bg-dark-900/50 backdrop-blur-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-primary-400 font-bold mb-4">VinCompressor</h3>
              <p className="text-gray-400 text-sm">
                Fast, secure, and free file compression service.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-400 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-400 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-400 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-400 transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-400 transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-400 transition-colors"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between border-t border-dark-700/50 pt-10 pb-6 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-dark-800/40 border border-primary-500/10 backdrop-blur-sm max-w-sm"
            >
              <div className="relative">
                <img
                  src="https://github.com/kelvink17.png"
                  alt="Creator"
                  className="w-12 h-12 rounded-full border-2 border-primary-500/50 object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-900 shadow-sm"></div>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Built by Kelvin</p>
                <p className="text-gray-400 text-xs">
                  Fullstack Dev & Tool Builder
                </p>
                <div className="flex gap-2 mt-2">
                  <a
                    href="https://github.com/kelvink17"
                    className="text-gray-500 hover:text-primary-400 transition-colors"
                  >
                    <Github size={14} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-primary-400 transition-colors"
                  >
                    <Twitter size={14} />
                  </a>
                </div>
              </div>
            </motion.div>

            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm mb-2">
                &copy; 2026 VinCompressor. All rights reserved.
              </p>
              <div className="flex gap-6 justify-center md:justify-end text-gray-500 text-xs">
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="https://github.com/kelvink17"
                  className="hover:text-primary-400 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
