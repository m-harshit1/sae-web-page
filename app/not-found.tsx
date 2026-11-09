import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-carbon-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden scanlines">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-apex-red/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-torque-orange/5 rounded-full blur-3xl" />

      <div className="max-w-md w-full bg-[#1E2025]/50 border border-white/10 p-8 rounded-xl text-center space-y-6 glass-panel backdrop-blur-md relative z-10">
        <div className="w-16 h-16 bg-apex-red/10 border border-apex-red/35 rounded-full flex items-center justify-center mx-auto text-apex-red font-mono font-black text-2xl tracking-tighter animate-pulse">
          404
        </div>
        
        <div className="space-y-2">
          <h1 className="font-heading font-black text-2xl uppercase tracking-tight text-white">
            PAGE / NODE NOT FOUND
          </h1>
          <p className="text-slate-400 font-sans text-xs leading-relaxed">
            The coordinates or blueprint files you requested could not be located in our chapter database. It may have been archived or moved during shakedown.
          </p>
        </div>

        <div className="bg-carbon-900/60 p-4 border border-white/5 rounded-lg text-left font-mono text-[10px] text-slate-500 space-y-1">
          <span className="font-bold text-white block uppercase text-[9px]">Diagnostic Log</span>
          <span>Status: ROUTE_UNRESOLVED</span>
          <span className="block">Target Node: localhost:3000/undefined</span>
        </div>

        <Link 
          href="/?tab=home"
          className="inline-block w-full bg-apex-red hover:bg-apex-red/90 text-white font-mono text-xs font-bold uppercase py-3.5 rounded transition-all shadow-lg shadow-apex-red/15"
        >
          Return to Cockpit Home
        </Link>
      </div>
    </div>
  );
}
