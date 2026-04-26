import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Globe, 
  ArrowRight, 
  ArrowRightLeft, 
  Copy, 
  Volume2, 
  X, 
  RotateCw, 
  Check, 
  AlertCircle,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import TextMarquee from '@/src/components/ui/text-marque';
import Footer from '@/src/components/ui/footer';

const LANGUAGES = [
  { code: 'auto', name: 'Auto Detect' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'nl', name: 'Dutch' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'tr', name: 'Turkish' },
  { code: 'pl', name: 'Polish' },
  { code: 'sv', name: 'Swedish' },
  { code: 'no', name: 'Norwegian' },
  { code: 'da', name: 'Danish' },
  { code: 'fi', name: 'Finnish' },
  { code: 'el', name: 'Greek' },
  { code: 'he', name: 'Hebrew' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ms', name: 'Malay' },
  { code: 'ur', name: 'Urdu' },
  { code: 'bn', name: 'Bengali' },
  { code: 'fa', name: 'Farsi' },
];

export default function App() {
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('es');
  const [isTranslating, setIsTranslating] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [copyStatus, setCopyStatus] = useState<'source' | 'target' | null>(null);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const translateText = useCallback(async (text: string, sl: string, tl: string) => {
    if (!text.trim()) {
      setTargetText('');
      return;
    }

    setIsTranslating(true);
    setStatus(null);

    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Translation failed');
      
      const data = await response.json();
      const translation = data[0].map((item: any) => item[0]).join('');
      setTargetText(translation);
      setStatus({ type: 'success', message: 'Translation complete' });
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Could not connect to translation service.' });
    } finally {
      setIsTranslating(false);
    }
  }, []);

  useEffect(() => {
    if (autoTranslate && sourceText) {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        translateText(sourceText, sourceLang, targetLang);
      }, 800);
    }
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [sourceText, sourceLang, targetLang, autoTranslate, translateText]);

  const handleManualTranslate = () => {
    translateText(sourceText, sourceLang, targetLang);
  };

  const swapLanguages = () => {
    if (sourceLang === 'auto') return;
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(targetText);
    setTargetText(sourceText);
  };

  const copyToClipboard = (text: string, type: 'source' | 'target') => {
    navigator.clipboard.writeText(text);
    setCopyStatus(type);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const speakText = (text: string, lang: string) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'auto' ? 'en' : lang;
    window.speechSynthesis.speak(utterance);
  };

  const clearAll = () => {
    setSourceText('');
    setTargetText('');
    setStatus(null);
  };

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleManualTranslate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sourceText, sourceLang, targetLang]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-200">
      {/* Header marquee */}
      <div className="bg-[#0F172A] py-1 border-b border-slate-800">
        <TextMarquee baseVelocity={-2} className="text-white/20 text-[14px] font-medium tracking-widest uppercase">
          Translate Globally • Seamless Communication • Professional Tool • Real-time Translation • LinguaTranslate • 
        </TextMarquee>
      </div>

      {/* Hero Header */}
      <header className="bg-[#0F172A] text-white py-12 px-6 shadow-xl relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shadow-inner">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">LinguaTranslate</h1>
          </motion.div>
          <div className="inline-block bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10 mb-6">
            <p className="text-slate-300 text-xs font-medium uppercase tracking-[0.2em]">
              Powered by Advanced Algorithms
            </p>
          </div>
          <p className="text-slate-400 text-lg max-w-lg text-center leading-relaxed">
            Break language barriers instantly with our professional-grade translation engine. 
            Elegance meets functionality.
          </p>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-10 relative z-20 pb-20">
        {/* Main Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-200 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            
            {/* Source Panel */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1 px-1.5 bg-slate-50 rounded w-fit">Source Language</span>
                  <select 
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="appearance-none bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer pr-8 py-1 hover:text-slate-900 transition-colors"
                  >
                    {LANGUAGES.map(l => (
                      <option key={l.code} value={l.code}>{l.name}</option>
                    ))}
                  </select>
                </div>
                {sourceText && (
                  <button 
                    onClick={clearAll}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="relative">
                <textarea 
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  placeholder="Enter text to translate..."
                  className="w-full min-h-[220px] text-lg lg:text-xl text-slate-700 placeholder:text-slate-300 resize-none focus:outline-none bg-transparent"
                />
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
                <span className={cn(
                  "text-[10px] font-mono tracking-widest px-2 py-1 rounded bg-slate-50",
                  sourceText.length > 4500 ? "text-rose-500 bg-rose-50" : "text-slate-400"
                )}>
                  {sourceText.length} / 5000
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => copyToClipboard(sourceText, 'source')}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
                  >
                    {copyStatus === 'source' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copyStatus === 'source' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            {/* Swap Column */}
            <div className="bg-slate-50/50 flex items-center justify-center py-4 lg:px-4">
              <button 
                onClick={swapLanguages}
                disabled={sourceLang === 'auto'}
                className="p-3 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all lg:rotate-0 rotate-90"
              >
                <ArrowRightLeft className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Target Panel */}
            <div className="p-8 bg-[#F1F5F9]/30">
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1 px-1.5 bg-slate-200/50 rounded w-fit">Target Language</span>
                  <select 
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="appearance-none bg-transparent font-medium text-slate-700 focus:outline-none cursor-pointer pr-8 py-1 hover:text-slate-900 transition-colors"
                  >
                    {LANGUAGES.filter(l => l.code !== 'auto').map(l => (
                      <option key={l.code} value={l.code}>{l.name}</option>
                    ))}
                  </select>
                </div>
                {isTranslating && (
                  <RotateCw className="w-5 h-5 text-slate-400 animate-spin" />
                )}
              </div>

              <div className="relative">
                <textarea 
                  readOnly
                  value={targetText}
                  placeholder="Translation will appear here..."
                  className="w-full min-h-[220px] text-lg lg:text-xl text-slate-700 placeholder:text-slate-300 resize-none focus:outline-none bg-transparent"
                />
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                <div className="flex gap-2">
                  <button 
                    onClick={() => speakText(targetText, targetLang)}
                    className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all shadow-sm"
                    title="Listen"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={() => copyToClipboard(targetText, 'target')}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0F172A] hover:bg-slate-800 rounded-lg transition-all shadow-lg shadow-slate-200"
                >
                  {copyStatus === 'target' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copyStatus === 'target' ? 'Copied' : 'Copy Result'}
                </button>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="p-6 bg-[#0F172A] border-t border-slate-800 flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={autoTranslate}
                    onChange={(e) => setAutoTranslate(e.target.checked)}
                  />
                  <div className="w-10 h-5 bg-slate-700 rounded-full peer peer-checked:bg-blue-500 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                </div>
                <span className="text-slate-400 text-xs font-medium group-hover:text-slate-200 transition-colors">Auto-translate while typing</span>
              </label>
              <div className="hidden md:block h-4 w-[1px] bg-slate-700"></div>
              <p className="hidden md:block text-[10px] text-slate-500 font-mono tracking-wider">PRESS CTRL + ENTER TO TRANSLATE</p>
            </div>

            <button 
              onClick={handleManualTranslate}
              disabled={isTranslating || !sourceText}
              className="w-full md:w-auto min-w-[180px] h-12 flex items-center justify-center gap-3 px-8 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:active:scale-100 rounded-xl transition-all shadow-lg shadow-blue-900/20"
            >
              {isTranslating ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  Translating...
                </>
              ) : (
                <>
                  Translate Now
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Status / Error Banner */}
        <AnimatePresence>
          {status && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={cn(
                "mt-6 p-4 rounded-xl flex items-center gap-3 border shadow-lg",
                status.type === 'success' ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-rose-50 border-rose-100 text-rose-800"
              )}
            >
              {status.type === 'success' ? <Check className="w-5 h-5 text-emerald-500" /> : <AlertCircle className="w-5 h-5 text-rose-500" />}
              <span className="text-sm font-medium">{status.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Marquee demo area */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] bg-white px-4 py-1 rounded-full border border-slate-100 shadow-sm">Explore More</span>
          </div>
          <TextMarquee baseVelocity={-1.5} className="font-black text-slate-200 uppercase leading-none tracking-tighter hover:text-blue-500/20 transition-colors cursor-default">
            Translation without boundaries • Experience simplicity • Native accuracy • Professional output • Fast & Secure •
          </TextMarquee>
          <TextMarquee baseVelocity={1.5} className="font-bold text-slate-100 uppercase leading-none tracking-tighter hover:text-slate-300 transition-colors cursor-default">
            LinguaTranslate is the future of communication • Trusted by millions • Start translating today • 
          </TextMarquee>
        </div>
      </main>

      <Footer />
    </div>
  );
}
