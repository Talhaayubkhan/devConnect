import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-6 py-12 text-slate-300 leading-relaxed"
    >
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-white mb-6 text-center"
      >
        Privacy Policy
      </motion.h1>

      <p className="mb-4">
        At <span className="font-semibold text-indigo-400">DevConnect</span>, we
        value your privacy and are committed to protecting your personal
        information. This Privacy Policy explains how we collect, use, and
        safeguard your data when you interact with our platform.
      </p>

      <h2 className="text-xl text-white font-semibold mt-8 mb-3">
        Information We Collect
      </h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Basic details such as name and email when you register.</li>
        <li>Usage data to analyze performance and enhance user experience.</li>
        <li>
          Payment details securely processed through PayFast’s sandbox
          environment.
        </li>
      </ul>

      <h2 className="text-xl text-white font-semibold mt-8 mb-3">
        How We Use Your Information
      </h2>
      <p className="mb-4">
        We use your data to provide a seamless and secure experience, process
        payments safely, and continually improve our platform. We do not sell or
        share your personal data with third parties for marketing purposes.
      </p>

      <h2 className="text-xl text-white font-semibold mt-8 mb-3">
        Third-Party Services
      </h2>
      <p className="mb-4">
        DevConnect uses{" "}
        <a
          href="https://www.gopayfast.com/"
          target="_blank"
          rel="noreferrer"
          className="text-indigo-400 hover:underline"
        >
          PayFast
        </a>{" "}
        as our secure payment processor. All payment information is encrypted
        and transmitted directly to PayFast. We do not store card details on our
        servers.
      </p>

      <h2 className="text-xl text-white font-semibold mt-8 mb-3">
        Your Consent
      </h2>
      <p className="mb-4">
        By using DevConnect, you agree to this Privacy Policy. We may update
        this policy from time to time, and any changes will be reflected on this
        page with an updated revision date.
      </p>

      {/* 🔙 Back Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center mt-10"
      >
        <Link
          to="/feed"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          ← Back to Feed
        </Link>
      </motion.div>

      <p className="mt-10 text-center text-slate-500 text-sm">
        Last updated: October 2025
      </p>
    </motion.section>
  );
};

export default PrivacyPolicy;
