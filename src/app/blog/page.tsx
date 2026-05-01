"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookOpen, Calendar, Clock, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogPosts } from "@/lib/blogData";

const blogPosts = getAllBlogPosts();

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
              <BookOpen size={14} /> Knowledge Hub
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight italic leading-tight">
              Our <span className="text-blue-500 not-italic">Blog</span>
            </h1>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
              Guías, tutoriales y noticias sobre el futuro del contenido digital y la Inteligencia Artificial.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center justify-between border-b border-white/5 pb-8">
            <div className="flex items-center gap-4 overflow-x-auto pb-2 custom-scrollbar no-scrollbar">
              {["All", "Tutorials", "Guides", "AI Tools", "Tips"].map((cat) => (
                <button key={cat} className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input type="text" placeholder="Search articles..." className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-4 py-3 text-xs outline-none focus:border-blue-500 transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id} className="group flex flex-col bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-blue-500/30 transition-all hover:translate-y-[-8px]">
                <div className="relative h-64 w-full">
                  <Image src={post.image} alt={post.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" unoptimized />
                  <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-blue-400">
                    {post.category}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">
                    <div className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</div>
                    <div className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</div>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tighter italic text-white mb-4 leading-tight group-hover:text-blue-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium mb-8 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white group-hover:gap-4 transition-all">
                    Read More <ArrowRight size={16} className="text-blue-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
