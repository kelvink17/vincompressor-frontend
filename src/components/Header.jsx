import React from 'react';
import { PackageOpen, Github } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 backdrop-blur-lg bg-dark-950/50 border-b border-dark-700/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/50">
              <PackageOpen size={24} className="text-dark-950" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">VinCompressor</h1>
              <p className="text-xs text-gray-400">Lightning Fast</p>
            </div>
          </motion.div>

          {/* Navigation & Links */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com/kelvink17"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
            >
              <Github size={20} className="text-gray-400 hover:text-primary-400" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.header>  
  );
}
