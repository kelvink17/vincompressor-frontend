import React from 'react';
import { Zap, Lock, Package, Globe, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized algorithms compress files in milliseconds using multi-threading.',
    color: 'from-yellow-400 to-orange-400',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Files are processed locally and automatically deleted after compression.',
    color: 'from-blue-400 to-cyan-400',
  },
  {
    icon: Package,
    title: 'Multiple Formats',
    description: 'Support for ZIP, GZIP, and Brotli compression algorithms.',
    color: 'from-pink-400 to-rose-400',
  },
  {
    icon: Globe,
    title: 'Universal Support',
    description: 'Compress images, videos, documents, and any file type.',
    color: 'from-purple-400 to-indigo-400',
  },
  {
    icon: Lock,
    title: 'Encryption Ready',
    description: 'Optional password protection for compressed archives.',
    color: 'from-emerald-400 to-teal-400',
  },
  {
    icon: Clock,
    title: 'Auto Cleanup',
    description: 'Compressed files are automatically removed after 24 hours.',
    color: 'from-sky-400 to-blue-400',
  },
];

export default function FeaturesSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="text-white">Powerful Features</span>
            <br />
            <span className="gradient-text">Professional Performance</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Everything you need for efficient, secure file compression
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card-hover p-6 md:p-8 group"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-block p-3 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-10 mb-4`}
                >
                  <Icon size={28} className="text-primary-400" />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Accent Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="mt-4 h-1 w-0 group-hover:w-12 bg-gradient-to-r from-primary-400 to-primary-300 rounded-full transition-all"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
