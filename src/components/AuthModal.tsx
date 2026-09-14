import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Compass, 
  AlertCircle, 
  Loader2,
  Anchor,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    signInWithGoogle, 
    signOutUser,
    user, 
    loading, 
    error,
    clearError 
  } = useAuth();

  if (!isAuthModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div 
        className="relative w-full max-w-md ocean-glass rounded-2xl sm:rounded-3xl border border-cyan-400/30 p-6 sm:p-8 shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          id="btn-close-auth-modal"
          aria-label="Close Authentication Dialog"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {user ? (
          /* User is already signed in */
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full p-1 bg-gradient-to-tr from-cyan-400 to-blue-500 shadow-lg mb-4">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'Mariner'} 
                  className="w-full h-full rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-cyan-300 font-bold text-xl">
                  {user.displayName?.charAt(0) || 'M'}
                </div>
              )}
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>AUTHENTICATED MARINER</span>
            </div>

            <h2 id="auth-modal-title" className="text-xl font-display font-bold text-white">
              {user.displayName || 'Mariner'}
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5 mb-6">
              {user.email}
            </p>

            <div className="p-4 rounded-xl bg-sky-950/40 border border-cyan-400/20 text-left space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-cyan-200">
                <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Personalized port bookmarks synced with Firebase</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-cyan-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Secure mariner session persisted across devices</span>
              </div>
            </div>

            <button
              onClick={signOutUser}
              disabled={loading}
              id="btn-signout-user"
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs tracking-wider uppercase bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          /* User is not signed in */
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 flex items-center justify-center">
                <Anchor className="w-5 h-5" />
              </div>
              <div>
                <h2 id="auth-modal-title" className="text-lg font-display font-bold text-white">
                  Mariner Authentication
                </h2>
                <p className="text-xs text-slate-400">
                  Sign in with Google to sync your marine sessions
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <div className="flex-1">
                  <span>{error}</span>
                  <button 
                    onClick={clearError}
                    className="block mt-1 text-[11px] underline opacity-80 hover:opacity-100"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3 mb-6 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Access verified ocean telemetry & customizable port bookmarks</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Compass className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Save preferred fishing zones and vessel dispatch logs</span>
              </div>
            </div>

            {/* Continue with Google Button */}
            <button
              onClick={signInWithGoogle}
              disabled={loading}
              id="btn-continue-with-google"
              className="w-full py-3 px-4 rounded-xl font-medium text-sm bg-white text-slate-900 hover:bg-slate-100 active:scale-[0.99] transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-slate-600" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span className="font-semibold text-slate-800">Continue with Google</span>
            </button>

            <p className="text-[11px] text-center text-slate-400 mt-4">
              Protected by Firebase Authentication. Your email is only used for identity session state.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
