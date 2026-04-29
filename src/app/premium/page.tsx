"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";
import { 
  Check, 
  ShieldCheck, 
  Zap, 
  Star, 
  Crown, 
  Shield, 
  Sparkles, 
  BadgeCheck, 
  Infinity, 
  Rocket, 
  Trophy,
  CreditCard,
  ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PayPalScriptProvider, 
  PayPalButtons 
} from "@paypal/react-paypal-js";



export default function PremiumPage() {
  const { t } = useLanguage();
  const { user, isPremium, setPremiumStatusInDB, openLoginModal } = useUser();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"smart" | "card">("smart");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  const handlePaymentSuccess = async (details: any) => {
    console.log("Payment Successful:", details);
    setLoading(true);
    try {
      if (user) {
        await setPremiumStatusInDB(true);
        setIsSuccess(true);
      } else {
        // Save pending activation for when they login
        localStorage.setItem("pending_pro", JSON.stringify(details));
        alert("¡Pago recibido con éxito! Por favor, inicia sesión ahora para activar tus funciones Pro automáticamente.");
        openLoginModal();
      }
    } catch (err) {
      console.error(err);
      alert("Error activating Pro status. Please contact support.");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { title: t("premium_benefit_1_title"), desc: t("premium_benefit_1_desc"), icon: Infinity, color: "text-purple-400" },
    { title: t("premium_benefit_2_title"), desc: t("premium_benefit_2_desc"), icon: Rocket, color: "text-blue-400" },
    { title: t("premium_benefit_3_title"), desc: t("premium_benefit_3_desc"), icon: ShieldCheck, color: "text-emerald-400" },
  ];

  const comparisons = [
    { feature: "Download Speed", free: "Standard", pro: "Ultra Fast", icon: Zap },
    { feature: "Video Quality", free: "Up to 1080p", pro: "4K / 8K / Ultra HD", icon: Crown },
    { feature: "Transcription Limit", free: "5 Minutes", pro: "Unlimited", icon: Star },
    { feature: "Interface", free: "Ad Supported", pro: "100% Ad-Free", icon: Shield },
    { feature: "Support", free: "Standard", pro: "24/7 Priority", icon: Trophy },
  ];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-12 text-center space-y-8 shadow-2xl shadow-blue-500/10"
          >
            <div className="mx-auto w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
              <Sparkles size={48} />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-black uppercase italic tracking-tighter">Welcome Pro</h1>
              <p className="text-gray-400 font-medium leading-relaxed">
                Your account is now fully elevated. All Pro tools are unlocked and waiting for you.
              </p>
            </div>
            <a 
              href="/dashboard"
              className="block w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
            >
              Enter Dashboard
            </a>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <main className="container mx-auto px-4 py-12 lg:py-24">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Hero Section */}
          <section className="text-center space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 text-blue-400 text-sm font-black tracking-[0.2em] uppercase"
            >
              <Crown size={16} /> {t("premium_badge")}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-black tracking-tighter leading-tight uppercase italic"
            >
              {t("premium_title").split(" ").map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? "bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600" : ""}>
                  {word}{" "}
                </span>
              ))}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium"
            >
              {t("premium_subtitle")}
            </motion.p>

            {/* Plan Toggle */}
            <div className="flex items-center justify-center gap-4 pt-8">
              <span className={`text-sm font-bold uppercase tracking-widest ${billingCycle === "monthly" ? "text-white" : "text-gray-500"}`}>{t("premium_monthly")}</span>
              <button 
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                className="w-16 h-8 bg-white/10 rounded-full p-1 relative flex items-center transition-colors hover:bg-white/20"
              >
                <motion.div 
                  className="w-6 h-6 bg-white rounded-full shadow-lg"
                  animate={{ x: billingCycle === "monthly" ? 0 : 32 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold uppercase tracking-widest ${billingCycle === "yearly" ? "text-white" : "text-gray-500"}`}>{t("premium_annual")}</span>
                <span className="px-2 py-0.5 rounded-md bg-blue-600 text-[10px] font-black uppercase tracking-tighter animate-pulse">{t("premium_save")}</span>
              </div>
            </div>
          </section>

          {/* Pricing Card & Checkout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Subscription Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative group h-full"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-black border border-white/10 rounded-[2.5rem] p-10 lg:p-14 h-full flex flex-col justify-between">
                <div className="space-y-12">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-blue-500">
                        {billingCycle === "monthly" ? "Monthly Plan" : "Yearly Plan"}
                      </h3>
                      <p className="text-5xl font-black italic tracking-tighter">
                        {billingCycle === "monthly" ? t("premium_price") : t("premium_annual_price")}
                        <span className="text-xl text-gray-500 not-italic font-medium">/{billingCycle === "monthly" ? t("premium_period").split(" ")[1] : t("premium_annual_period").split(" ")[1]}</span>
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400">
                      <Star size={32} />
                    </div>
                  </div>

                  <div className="space-y-6">
                    {benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className={`mt-1 ${b.color}`}>
                          <BadgeCheck size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold uppercase tracking-tight">{b.title}</h4>
                          <p className="text-sm text-gray-500 font-medium">{b.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 flex items-center gap-3">
                  <ShieldCheck className="text-emerald-500" size={20} />
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Secure 256-bit encrypted checkout</span>
                </div>
              </div>
            </motion.div>

            {/* Gateway Selection & PayPal */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 lg:p-12 space-y-10 min-h-[450px] shadow-2xl shadow-blue-500/5"
            >
              <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/10 relative">
                <button 
                  onClick={() => setPaymentMethod("smart")}
                  className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 relative ${paymentMethod === "smart" ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]" : "text-gray-500 hover:text-gray-300"}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Zap size={14} fill={paymentMethod === "smart" ? "black" : "none"} />
                    Express Checkout
                  </div>
                  {paymentMethod === "smart" && (
                    <motion.span layoutId="pop" className="absolute -top-2 -right-2 px-2 py-1 bg-blue-600 text-white text-[8px] rounded-md font-black">POPULAR</motion.span>
                  )}
                </button>
                <button 
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 relative ${paymentMethod === "card" ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]" : "text-gray-500 hover:text-gray-300"}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <ShieldCheck size={14} fill={paymentMethod === "card" ? "black" : "none"} />
                    Direct Card
                  </div>
                  <motion.span className="absolute -top-2 -right-2 px-2 py-1 bg-amber-600 text-white text-[8px] rounded-md font-black">MAINTENANCE</motion.span>
                </button>
              </div>

              {paymentMethod === "card" && (
                <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-center">
                  <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Maintenance</p>
                  <p className="text-[10px] text-gray-500 mt-1">Direct card payments are temporarily unavailable. Please use Express Checkout.</p>
                </div>
              )}

              <div className="space-y-6">
                {process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ? (
                  <PayPalScriptProvider options={{ 
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
                  }}>
                    <div className="p-4 bg-black/20 rounded-2xl border border-white/5">
                      <PayPalButtons 
                        style={{ layout: "vertical", shape: "rect", label: "pay", color: "gold" }}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [{
                              description: `Vytrixe Pro - ${billingCycle === "yearly" ? "Yearly" : "Monthly"} Plan`,
                              amount: {
                                currency_code: "USD",
                                value: billingCycle === "yearly" ? "94.99" : "14.99"
                              }
                            }]
                          });
                        }}
                        onApprove={async (data, actions) => {
                          if (actions.order) {
                            const details = await actions.order.capture();
                            handlePaymentSuccess(details);
                          }
                        }}
                      />
                    </div>
                  </PayPalScriptProvider>
                ) : (
                  <div className="p-8 bg-amber-500/10 border border-amber-500/20 rounded-3xl text-center">
                    <p className="text-xs text-amber-500 font-black uppercase tracking-widest">PayPal Not Configured</p>
                    <p className="text-[10px] text-gray-500">NEXT_PUBLIC_PAYPAL_CLIENT_ID is missing</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Feature Comparison Table */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black uppercase italic tracking-tighter">{t("premium_feature_comparison")}</h2>
              <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full" />
            </div>

            <div className="bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.02]">
                    <th className="px-8 py-6 text-sm font-black uppercase tracking-widest">Feature</th>
                    <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-gray-500">{t("premium_free")}</th>
                    <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-blue-500">{t("premium_pro")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {comparisons.map((item, i) => (
                    <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-8 py-6 flex items-center gap-3">
                        <item.icon size={18} className="text-blue-500" />
                        <span className="font-bold">{item.feature}</span>
                      </td>
                      <td className="px-8 py-6 text-sm font-medium text-gray-500">{item.free}</td>
                      <td className="px-8 py-6 text-sm font-bold text-white flex items-center gap-2">
                        <Check size={16} className="text-blue-500" />
                        {item.pro}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Final CTA */}
          <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-600/20 border border-white/10 p-16 text-center space-y-8">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)]" />
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Everything you need, in one place.</h2>
            <p className="text-gray-400 font-medium max-w-2xl mx-auto">Join thousands of creators using Vytrixe Pro to power their digital workflow with AI.</p>
            <button className="relative px-12 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-white/10">
              Get Started Now
            </button>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
