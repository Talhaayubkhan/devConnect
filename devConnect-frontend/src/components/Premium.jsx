import React from "react";
import { motion } from "framer-motion";
import { Crown, Star, CheckCircle } from "lucide-react";

const Premium = () => {
  const memberships = [
    {
      title: "Silver Membership",
      icon: <Star className="text-gray-400 w-8 h-8" />,
      price: "3 Months Plan",
      features: [
        "Buy Blue Tick for 3 months",
        "100 Connections Only",
        "Chat with each other",
      ],
      buttonText: "Buy Silver Membership",
      color: "from-gray-100 to-gray-200",
    },
    {
      title: "Gold Membership",
      icon: <Crown className="text-yellow-500 w-8 h-8" />,
      price: "1 Year Plan",
      features: [
        "Buy Blue Tick for 1 year",
        "Unlimited Connections",
        "Chat with each other",
        "Auto Renew Subscription",
      ],
      buttonText: "Buy Gold Membership",
      color: "from-yellow-100 to-yellow-200",
    },
  ];

  return (
    <div className="py-10 bg-gradient-to-b from-white to-gray-50">
      <h1 className="text-4xl font-extrabold text-center mb-5 text-gray-800">
        Choose Your <span className="text-indigo-600">Premium Plan</span>
      </h1>

      <div className="flex flex-col lg:flex-row justify-center gap-10 items-center">
        {memberships.map((plan, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`card w-80 shadow-xl text-black bg-gradient-to-br ${plan.color} p-6 rounded-3xl transition-all duration-300`}
          >
            <div className="flex flex-col items-center space-y-3">
              {plan.icon}
              <h2 className="text-2xl font-bold">{plan.title}</h2>
              <p className="text-gray-600">{plan.price}</p>
              <ul className="space-y-2 mt-4 text-sm">
                {plan.features.map((f, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ backgroundColor: "#4f46e5" }}
                className="bg-black text-white py-3 px-6 mt-6 rounded-xl font-semibold hover:bg-indigo-600 transition"
              >
                {plan.buttonText}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Premium;
