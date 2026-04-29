"use client";

import { motion } from "framer-motion";
import { Link2, MousePointer2, Download, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Link2 className="w-10 h-10 text-blue-500" />,
      title: t("hiw_step1_title"),
      description: t("hiw_step1_desc"),
      color: "from-blue-500/20 to-transparent"
    },
    {
      icon: <MousePointer2 className="w-10 h-10 text-purple-500" />,
      title: t("hiw_step2_title"),
      description: t("hiw_step2_desc"),
      color: "from-purple-500/20 to-transparent"
    },
    {
      icon: <Download className="w-10 h-10 text-pink-500" />,
      title: t("hiw_step3_title"),
      description: t("hiw_step3_desc"),
      color: "from-pink-500/20 to-transparent"
    },
    {
      icon: <CheckCircle2 className="w-10 h-10 text-green-500" />,
      title: t("hiw_step4_title"),
      description: t("hiw_step4_desc"),
      color: "from-green-500/20 to-transparent"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4"
          >
            {t("hiw_badge")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter"
          >
            {t("hiw_title_1")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">{t("hiw_title_2")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            {t("hiw_subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all overflow-hidden`}
            >
              <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="mb-6 p-4 rounded-2xl bg-black/40 inline-block">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-12 rounded-[50px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-transparent border border-white/5 text-center"
        >
          <h4 className="text-2xl font-bold text-white mb-4">{t("hiw_end_title")}</h4>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            {t("hiw_end_desc")}
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 rounded-full bg-white text-black font-black hover:scale-105 transition-transform"
          >
            {t("hiw_end_btn")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
