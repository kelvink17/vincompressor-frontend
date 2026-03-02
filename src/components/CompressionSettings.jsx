import React from 'react';
import { Settings, Zap, Shield, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const formatIcons = {
  package: Package,
  zap: Zap,
  compress: Shield,
};

export default function CompressionSettings({
  format,
  setFormat,
  compressionLevel,
  setCompressionLevel,
  preserveStructure,
  setPreserveStructure,
  formats,
  isSingleFile,
}) {
  const getFormatDescription = (formatId) => {
    const descriptions = {
      zip: 'Universal compression, works everywhere',
      gzip: 'Fast compression, streaming friendly',
      brotli: 'Best compression ratio, modern algorithms',
    };
    return descriptions[formatId] || '';
  };

  const maxLevel = formats?.compressionLevels?.[format]?.max || 9;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <Settings size={24} className="text-primary-400" />
        <h2 className="text-xl md:text-2xl font-bold text-white">
          Compression Settings
        </h2>
      </div>

      <div className="space-y-6">
        {/* Format Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            Compression Format
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {formats?.formats?.map((fmt) => {
              const Icon = formatIcons[fmt.icon] || Package;
              return (
                <motion.button
                  key={fmt.id}
                  onClick={() => setFormat(fmt.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    format === fmt.id
                      ? 'border-primary-400 bg-primary-500/10'
                      : 'border-dark-700 bg-dark-800/30 hover:border-primary-500/30'
                  }`}
                >
                  <Icon size={24} className="text-primary-400 mb-2" />
                  <p className="font-semibold text-white">{fmt.name}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {getFormatDescription(fmt.id)}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Compression Level */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-300">
              Compression Level
            </label>
            <span className="text-lg font-bold text-primary-400">
              {compressionLevel}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400">Fast</span>
            <motion.input
              type="range"
              min="0"
              max={maxLevel}
              value={compressionLevel}
              onChange={(e) => setCompressionLevel(parseInt(e.target.value))}
              className="flex-1 h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer slider"
              whileTap={{ scale: 1.05 }}
            />
            <span className="text-xs text-gray-400">Best</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {compressionLevel <= 3
              ? '⚡ Blazing fast, decent compression'
              : compressionLevel <= 7
              ? '⚙️ Balanced speed and compression'
              : '🎯 Best compression, slower speed'}
          </p>
        </div>

        {/* Preserve Structure (only for single files with ZIP) */}
        {isSingleFile && format === 'zip' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-dark-700/50 transition-colors">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={preserveStructure}
                  onChange={(e) => setPreserveStructure(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-md border-2 transition-all ${
                    preserveStructure
                      ? 'bg-primary-500 border-primary-400'
                      : 'border-dark-600'
                  }`}
                />
                <svg
                  className={`absolute w-3 h-3 text-dark-950 pointer-events-none transition-opacity ${
                    preserveStructure ? 'opacity-100' : 'opacity-0'
                  }`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-300">
                Preserve directory structure
              </span>
            </label>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

const styles = `
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #14b8a6 0%, #2dd4bf 100%);
  cursor: pointer;
  box-shadow: 0 0 10px rgba(20, 184, 166, 0.5);
  transition: all 0.2s ease;
}

.slider::-webkit-slider-thumb:hover {
  box-shadow: 0 0 20px rgba(20, 184, 166, 0.8);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #14b8a6 0%, #2dd4bf 100%);
  cursor: pointer;
  box-shadow: 0 0 10px rgba(20, 184, 166, 0.5);
  border: none;
  transition: all 0.2s ease;
}

.slider::-moz-range-thumb:hover {
  box-shadow: 0 0 20px rgba(20, 184, 166, 0.8);
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
