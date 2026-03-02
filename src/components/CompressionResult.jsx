import React from 'react';
import { Download, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CompressionResult({
  result,
  isLoading,
  error,
  onDownload,
  onNewCompression,
}) {
 
  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
   
    const index = Math.min(Math.max(0, i), sizes.length - 1);
    
    return parseFloat((bytes / Math.pow(k, index)).toFixed(2)) + ' ' + sizes[index];
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card p-8 text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="inline-block"
        >
          <Loader size={48} className="text-primary-400" />
        </motion.div>
        <p className="mt-4 text-lg font-semibold text-white">
          Compressing your files...
        </p>
        <p className="text-gray-400 text-sm mt-2">
          This may take a moment depending on file size
        </p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card p-8 border-red-500/30 bg-red-500/5"
      >
        <div className="flex items-start gap-4">
          <AlertCircle size={24} className="text-red-400 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-400">
              Compression Failed
            </h3>
            <p className="text-gray-300 mt-2">{error}</p>
            <button
              onClick={onNewCompression}
              className="mt-4 btn-primary text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-6 md:p-8 border-primary-500/30 bg-primary-500/5"
        >
          <div className="flex items-center gap-4 mb-4">
            <CheckCircle size={32} className="text-primary-400" />
            <div>
              <h3 className="text-xl font-bold text-white">
                Compression Complete!
              </h3>
              <p className="text-gray-400 text-sm">
                {result.message || 'Your file is ready for download.'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Original Size */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-4"
          >
            <p className="text-gray-400 text-sm">Original Size</p>
            <p className="text-2xl font-bold text-white mt-1">
              {formatFileSize(result.originalSize)}
            </p>
          </motion.div>

          {/* Compressed Size */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-4"
          >
            <p className="text-gray-400 text-sm">Compressed Size</p>
            <p className="text-2xl font-bold text-primary-400 mt-1">
              {formatFileSize(result.compressedSize)}
            </p>
          </motion.div>

          {/* Compression Ratio */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-4"
          >
            <p className="text-gray-400 text-sm">Saved</p>
            <p className="text-2xl font-bold text-green-400 mt-1">
              {result.compressionRatio}%
            </p>
          </motion.div>
        </div>

        {/* Visual Comparison */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <h3 className="text-sm font-semibold text-gray-300 mb-3">
            Size Reduction
          </h3>
          <div className="space-y-2">
            <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.max(0, 100 - parseFloat(result.compressionRatio || 0))}%`,
                }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                className="bg-gradient-to-r from-primary-500 to-primary-400 h-full rounded-full"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Compressed</span>
              <span>Original Size</span>
            </div>
          </div>
        </motion.div>

        {/* Format Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="card p-4 bg-dark-800/50"
        >
          <p className="text-sm text-gray-400">
            Format: <span className="text-primary-400 font-semibold uppercase">{result.format}</span>
          </p>
          <p className="text-sm text-gray-400 mt-1">
            File: <span className="text-white font-mono text-xs break-all">{result.filename}</span>
          </p>
        </motion.div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onDownload}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Download File
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNewCompression}
            className="btn-secondary flex items-center justify-center"
          >
            Compress Another File
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return null;
};