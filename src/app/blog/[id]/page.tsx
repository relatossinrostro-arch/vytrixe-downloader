"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useParams, useRouter } from "next/navigation";
import { Calendar, Clock, ArrowLeft, Share2, MessageCircle, Mail, Link2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// We'll import the data from a separate file to keep this clean
// For now, we'll define a simple mock or placeholder
import { getBlogPostById } from "@/lib/blogData";

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const post = getBlogPostById(params.id as string);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Post not found</h1>
          <p className="text-gray-500">The article you are looking for does not exist or has been moved.</p>
          <Link href="/blog" className="px-8 py-3 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs">Back to Blog</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <Navbar />

      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <button 
            onClick={() => router.push("/blog")}
            className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Hub
          </button>

          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                <div className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</div>
                <div className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight italic leading-tight text-white">
              {post.title}
            </h1>

            <div className="relative aspect-[21/9] w-full rounded-[2.5rem] overflow-hidden border border-white/10 grayscale-[0.5] hover:grayscale-0 transition-all duration-700">
              <Image src={post.image} alt={post.title} fill className="object-cover" unoptimized />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-white/5">
            {/* Sidebar / Info */}
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Written By</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-[2px]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-black">VA</div>
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">Team ViralAuthority</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Share Article</p>
                <div className="flex gap-2">
                  {[MessageCircle, Mail, Link2, Share2].map((Icon, i) => (
                    <button key={i} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all">
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              <div 
                className="prose prose-invert prose-blue max-w-none 
                prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tight 
                prose-p:text-gray-400 prose-p:leading-relaxed prose-p:font-medium
                prose-strong:text-white prose-a:text-blue-500 hover:prose-a:text-blue-400"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
