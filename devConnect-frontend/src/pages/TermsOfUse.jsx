import { motion } from "framer-motion";

const TermsOfUse = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-base-100 text-slate-200 px-6 py-16 flex justify-center"
    >
      <div className="max-w-4xl w-full">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl font-semibold text-indigo-400 mb-6 text-center"
        >
          Terms of Use
        </motion.h1>

        <p className="text-slate-400 leading-relaxed mb-4">
          Welcome to <span className="text-white font-medium">DevConnect</span>.
          By using our platform, you agree to comply with the following terms
          and conditions. Please read them carefully before accessing or using
          any part of our services.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">
          1. Acceptance of Terms
        </h2>
        <p className="text-slate-400 mb-4">
          By accessing or using DevConnect, you confirm that you are at least 18
          years old and that you accept these Terms of Use in full. If you do
          not agree, you may not use the platform.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">
          2. User Responsibilities
        </h2>
        <p className="text-slate-400 mb-4">
          You agree not to misuse our services, engage in fraudulent activity,
          or attempt to gain unauthorized access to any part of DevConnect’s
          systems or user data.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">
          3. Intellectual Property
        </h2>
        <p className="text-slate-400 mb-4">
          All code, design, and content within DevConnect are the intellectual
          property of their respective owners. Reproduction or redistribution
          without consent is strictly prohibited.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">
          4. Payment & Refund Policy
        </h2>
        <p className="text-slate-400 mb-4">
          Payments processed through our official payment gateway (e.g., PayFast
          or approved alternatives) are final. Refunds are subject to the terms
          outlined in our Privacy Policy and applicable law.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-2">
          5. Limitation of Liability
        </h2>
        <p className="text-slate-400 mb-4">
          DevConnect is not liable for any indirect or consequential damages
          resulting from the use or inability to use the service. Use the
          platform at your own risk.
        </p>

        <p className="text-slate-500 text-sm mt-10 text-center">
          Last updated: October 2025
        </p>
      </div>
    </motion.section>
  );
};

export default TermsOfUse;
