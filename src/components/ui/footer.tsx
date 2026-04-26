'use client';

import { Github, Linkedin, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-16 w-full overflow-hidden pt-16 pb-8 bg-[#0B1120]">
      {/* Glow effects */}
      <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 select-none">
        <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl"></div>
        <div className="absolute right-1/4 -bottom-24 h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl"></div>
      </div>

      {/* Glass Container */}
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 rounded-2xl px-6 py-10 md:flex-row md:items-start md:justify-between md:gap-12 backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl">
        <div className="flex flex-col items-center md:items-start text-white">
          <a href="#" className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 text-2xl font-extrabold text-white shadow-md">
              <Zap className="h-5 w-5" />
            </span>
            <span className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-xl font-semibold tracking-tight text-transparent">
              LinguaTranslate
            </span>
          </a>
          <p className="text-slate-400 mb-6 max-w-xs text-center text-sm md:text-left">
            Empowering global communication with seamless translation services. 
            Built for professionals, by LinguaTranslate.
          </p>
          <div className="mt-2 flex gap-4 text-slate-400">
            <a href="https://github.com/Mad-iii" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-white transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/mahd-sadiq1" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>

        <nav className="flex w-full flex-col gap-9 text-center md:w-auto md:flex-row md:justify-end md:text-left">
          <div>
            <div className="mb-3 text-xs font-bold tracking-widest text-white uppercase">
              Product
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Translation API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Browser Extension</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-xs font-bold tracking-widest text-white uppercase">
              Company
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="text-slate-500 relative z-10 mt-10 text-center text-xs">
        <span>&copy; {new Date().getFullYear()} LinguaTranslate. All rights reserved.</span>
      </div>
    </footer>
  );
}
