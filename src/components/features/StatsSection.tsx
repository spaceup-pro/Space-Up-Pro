"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "50+", label: "Trường Đại học" },
  { value: "200+", label: "Ngành học" },
  { value: "10,000+", label: "Sinh viên" },
  { value: "95%", label: "Tỷ lệ việc làm" },
];

export function StatsSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="text-center p-6 rounded-2xl bg-charcoal-900/30 border border-charcoal-800"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
            className="text-3xl md:text-4xl font-bold gradient-text mb-2"
          >
            {stat.value}
          </motion.div>
          <p className="text-sm text-charcoal-400">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}