import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard/admin');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <main className="w-full max-w-[1100px] flex flex-col md:flex-row overflow-hidden rounded-2xl border border-outline-variant shadow-level-3 bg-white">

        {/* Left panel - Hero */}
        <section className="hidden md:flex w-1/2 relative bg-gradient-to-br from-surface-container-low to-surface flex-col justify-between p-8 border-r border-outline-variant overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-md shadow-primary/20">
                <span className="material-symbols-outlined text-[22px]">medical_services</span>
              </div>
              <h1 className="text-xl font-bold text-primary tracking-tight">HAPMS</h1>
            </div>
            <div className="space-y-3 max-w-sm">
              <h2 className="text-2xl font-bold text-on-surface leading-tight">Consolidating Care Through Intelligence</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">Transform fragmented patient records into a unified, actionable clinical history with our advanced AI portal.</p>
            </div>
          </div>

          <div className="relative flex-1 flex items-center justify-center py-8">
            <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full max-w-xs">
              <div className="bg-white p-4 rounded-xl border border-outline-variant shadow-level-1 rotate-[-3deg] translate-y-2">
                <div className="h-2 w-12 bg-primary/20 rounded mb-2"></div>
                <div className="space-y-1.5">
                  <div className="h-1.5 w-full bg-surface-variant rounded"></div>
                  <div className="h-1.5 w-2/3 bg-surface-variant rounded"></div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-outline-variant shadow-level-1 rotate-[3deg] translate-x-2">
                <span className="material-symbols-outlined text-tertiary text-sm">prescriptions</span>
                <div className="h-1.5 w-full bg-surface-variant rounded mt-2"></div>
              </div>
              <div className="col-span-2 bg-primary p-4 rounded-xl text-white shadow-level-2 flex items-center gap-4 z-10">
                <div className="bg-white/20 p-2 rounded-lg">
                  <span className="material-symbols-outlined">analytics</span>
                </div>
                <div>
                  <p className="text-xs text-white/80 font-medium">Unified Patient ID</p>
                  <p className="text-sm font-bold">#HX-9902-CMS</p>
                </div>
                <div className="ml-auto">
                  <span className="material-symbols-outlined text-white/60">check_circle</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary/5 rounded-full blur-[80px]"></div>
          </div>

          <div className="relative z-10 pt-6 border-t border-outline-variant/50">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <img
                  alt="Doctor 1"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFd7NoNfRHN7j9UdlcqypJUjGVkth5tgz2HdFjzTfDQmcZd0Gcg-Sp-qxg5IuxgyE71xom86fxnYgES3hVOGrTbAS_xwqbiSehTPSAZGqTbw0c7p5xII7NYOjbleFEq2Py0CBaYvE1ahSXnZXjJqQEsUWvSZzrW_FiREGee7G-qI56BuzAl4OCQmZcX-4nGzAp1pAiWsF41d-UnCv5IixSLFWDueu7pCdnzAIrGGdVYroU3DA6zwk_pFMdGtV2icwzWpMOaIdbym7f"
                />
                <img
                  alt="Doctor 2"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnnokgpkcEQNhCxpyC_p1ux1jBcx7AIPmtx2VRP4KmroHyaclDSgtqWrPfJSTDnwxDFm0rVD8bGbbPjN5RdryonZExlwavbOZpMFU3J9m4lNsI4Aylo0U3tI-x4OrxHY-DdrkgwiiXSZQMx3-Ztqs4P9OOIUOL4lxylgIji-_o9ewHJ4kAzz4OcOUYlzqpgIFsdZHBg7HAHCMNb8qB_RYHlAOCfNI0swnYF0gnSFG6MnIsTjnlbDfBTvUkToZ0uWc5Xym9khxbiL7m"
                />
              </div>
              <p className="text-xs text-on-surface-variant">Trusted by <strong className="text-on-surface">1,200+</strong> clinical specialists worldwide.</p>
            </div>
          </div>
        </section>

        {/* Right panel - Login Form */}
        <section className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 bg-white">
          <div className="w-full max-w-sm space-y-6">
            {/* Mobile branding */}
            <div className="md:hidden flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[22px]">medical_services</span>
              </div>
              <h1 className="text-xl font-bold text-primary tracking-tight">HAPMS</h1>
            </div>

            <header className="space-y-1">
              <h2 className="text-xl font-bold text-on-surface">Staff Login</h2>
              <p className="text-sm text-on-surface-variant">Enter your credentials to access the portal</p>
            </header>

            <button className="w-full h-11 flex items-center justify-center gap-3 border border-outline-variant rounded-xl bg-white text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-all active:scale-[0.98]">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>

            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-outline-variant"></div>
              <span className="absolute bg-white px-4 text-xs font-semibold text-outline uppercase">Or with Email</span>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-on-surface-variant" htmlFor="email">Hospital Email Address</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] group-focus-within:text-primary transition-colors">alternate_email</span>
                  <input
                    className="w-full h-11 pl-10 pr-4 bg-white border border-outline-variant rounded-xl text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    id="email"
                    name="email"
                    placeholder="name@hospital.org"
                    required
                    type="email"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-on-surface-variant" htmlFor="password">Password</label>
                  <a className="text-xs font-semibold text-primary hover:underline" href="#">Forgot Password?</a>
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] group-focus-within:text-primary transition-colors">lock</span>
                  <input
                    className="w-full h-11 pl-10 pr-12 bg-white border border-outline-variant rounded-xl text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    type={showPassword ? 'text' : 'password'}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/20" id="remember" type="checkbox" />
                <label className="text-xs text-on-surface-variant cursor-pointer select-none" htmlFor="remember">Remember this device for 30 days</label>
              </div>
              <button
                className="w-full h-11 bg-primary text-white rounded-xl text-sm font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                type="submit"
              >
                Login to Portal
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </form>

            <footer className="text-center">
              <p className="text-xs text-on-surface-variant">New staff member? <a className="text-primary font-semibold hover:underline" href="#">Request access</a></p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
