import React, { useRef, useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FileUploadZone({ onFilesSelected, files, onRemoveFile, maxSize = 500 }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e) => {
    handleFiles(e.target.files);
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).filter((file) => {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is ${maxSize}MB.`);
        return false;
      }
      return true;
    });

    if (newFiles.length > 0) {
      onFilesSelected(newFiles);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes, k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? 'border-primary-400 bg-primary-500/10 scale-105'
            : 'border-primary-500/30 hover:border-primary-500/50 bg-dark-800/30'
        }`}
        animate={{
          scale: isDragging ? 1.02 : 1,
        }}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <motion.div
            animate={{ y: isDragging ? -5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Upload
              size={48}
              className="text-primary-400 mx-auto"
              strokeWidth={1.5}
            />
          </motion.div>

          <div>
            <p className="text-xl font-semibold text-white mb-2">
              Drop files here or click to browse
            </p>
            <p className="text-sm text-gray-400">
              Supports any file type up to {maxSize}MB
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileInput}
            className="hidden"
            accept="*"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 btn-primary"
          >
            Select Files
          </button>
        </div>
      </motion.div>

      {/* File List */}
      <AnimatePresence mode="popLayout">
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 space-y-3"
          >
            <h3 className="text-sm font-semibold text-gray-300">
              Selected Files ({files.length})
            </h3>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {files.map((file, index) => (
                <motion.div
                  key={`${file.name}-${index}`}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="card p-3 flex items-center justify-between hover:border-primary-500/30"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <File size={20} className="text-primary-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-200 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveFile(index)}
                    className="ml-2 p-1 hover:bg-dark-700 rounded-lg transition-colors flex-shrink-0"
                  >
                    <X size={16} className="text-gray-400" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
