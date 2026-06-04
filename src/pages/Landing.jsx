import { Link } from 'react-router-dom'

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const Icon = {
  Grid: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
    </svg>
  ),
  Clipboard: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      <path strokeLinecap="round" d="M9 12h6M9 16h4"/>
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  ),
  Chart: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
      <polyline strokeLinecap="round" strokeLinejoin="round" points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  Trophy: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 4h10v2a5 5 0 01-10 0V4zM4 4h3v2a3 3 0 01-3-3V4zM20 4h-3v2a3 3 0 003-3V4zM10 11l2 3 2-3M12 14v4M9 18h6"/>
    </svg>
  ),
  Target: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  Brain: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c0-1.5 1.5-3 3-3 2 0 3 1.5 3 3 1 0 2 1 2 2.5S19 11 18 11c.5 1 .5 2-.5 2.5C18 15 17 16 16 16c0 1.5-1 2-2 2s-2-.5-2-2c-1 0-2-1-2-1.5-1-.5-1-1.5-.5-2.5C8.5 11 8 10 8 8.5S9 6 10 6c0-1.5 1-2 2-2v2z"/>
    </svg>
  ),
  TrendUp: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
      <polyline strokeLinecap="round" strokeLinejoin="round" points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline strokeLinecap="round" strokeLinejoin="round" points="17 6 23 6 23 12"/>
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
      <polyline strokeLinecap="round" strokeLinejoin="round" points="3 8 6.5 11.5 13 5"/>
    </svg>
  ),
}

// ── Phone Mockup ──────────────────────────────────────────────────────────────
const PHONE_STATS = [
  { label: 'Total Profit', value: '+$340', color: 'text-green-400' },
  { label: 'Win Rate',     value: '68%',   color: 'text-[#00d4aa]' },
  { label: 'Total Bets',   value: '24',    color: 'text-white' },
  { label: 'Units Won',    value: '+4.2',  color: 'text-green-400' },
]
const PHONE_BETS = [
  { desc: 'Chiefs -3.5',  book: 'DraftKings', pl: '+$45.45', win: true  },
  { desc: 'Lakers ML',    book: 'FanDuel',    pl: '-$50.00', win: false },
  { desc: 'Over 214.5',   book: 'BetMGM',     pl: '+$90.90', win: true  },
]

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-56 sm:w-64 select-none">
      {/* Layered glow */}
      <div className="absolute -inset-6 bg-[#00d4aa]/20 rounded-[3rem] blur-3xl" />
      <div className="absolute -inset-2 bg-[#00d4aa]/10 rounded-[3rem] blur-xl" />
      <div className="absolute inset-0 bg-purple-600/10 rounded-[3rem] blur-2xl translate-y-4" />

      {/* Phone frame */}
      <div className="relative bg-[#08080f] rounded-[2.8rem] border border-white/15 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
        {/* Side buttons */}
        <div className="absolute left-[-3px] top-24 w-[3px] h-8 bg-white/10 rounded-l-sm" />
        <div className="absolute left-[-3px] top-36 w-[3px] h-12 bg-white/10 rounded-l-sm" />
        <div className="absolute right-[-3px] top-28 w-[3px] h-14 bg-white/10 rounded-r-sm" />

        {/* Dynamic island */}
        <div className="flex justify-center pt-4 pb-1">
          <div className="w-24 h-6 bg-black rounded-full flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-[#1a1a2e] rounded-full" />
            <div className="w-3 h-3 bg-[#1a1a2e] rounded-full" />
          </div>
        </div>

        {/* Screen */}
        <div className="bg-[#0f0f1a] px-3.5 pb-5 pt-2 space-y-2.5">
          {/* App header */}
          <div className="flex items-center justify-between">
            <span className="text-[#00d4aa] text-[11px] font-black tracking-tight">Settled</span>
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white text-[7px] font-bold">JK</span>
            </div>
          </div>

          {/* Greeting */}
          <div>
            <p className="text-white text-[10px] font-bold leading-tight">Good evening 👋</p>
            <p className="text-gray-600 text-[8px]">June 2026 · 24 bets logged</p>
          </div>

          {/* P&L hero */}
          <div className="bg-gradient-to-br from-[#00d4aa]/15 to-transparent rounded-xl border border-[#00d4aa]/15 p-2.5 text-center">
            <p className="text-gray-500 text-[8px] mb-0.5">Total Profit</p>
            <p className="text-green-400 text-xl font-black leading-none">+$340</p>
            <p className="text-gray-600 text-[7px] mt-0.5">↑ 68% win rate</p>
          </div>

          {/* Stat grid */}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { l: 'Bets', v: '24' },
              { l: 'Units', v: '+4.2' },
              { l: 'ROI',   v: '+12%' },
            ].map(s => (
              <div key={s.l} className="bg-[#1a1a2e] rounded-lg p-1.5 text-center border border-white/[0.04]">
                <p className="text-gray-600 text-[7px]">{s.l}</p>
                <p className="text-[#00d4aa] text-[10px] font-bold">{s.v}</p>
              </div>
            ))}
          </div>

          {/* Recent bets */}
          <p className="text-gray-600 text-[8px] font-semibold uppercase tracking-wide">Recent Bets</p>
          <div className="space-y-1.5">
            {PHONE_BETS.map(b => (
              <div key={b.desc} className="bg-[#1a1a2e] rounded-lg px-2 py-1.5 flex items-center justify-between border border-white/[0.04]">
                <div className="min-w-0">
                  <p className="text-white text-[9px] font-semibold leading-none">{b.desc}</p>
                  <p className="text-gray-600 text-[7px] mt-0.5">{b.book}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className={`text-[8px] font-bold ${b.win ? 'text-green-400' : 'text-red-400'}`}>{b.pl}</span>
                  <span className={`text-[7px] px-1 py-px rounded font-bold ${b.win ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {b.win ? 'W' : 'L'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom nav */}
          <div className="bg-[#1a1a2e] rounded-xl px-2 py-2 flex justify-around items-center border border-white/[0.04]">
            {[
              { Icon: Icon.Grid,      active: true },
              { Icon: Icon.Clipboard, active: false },
              { Icon: Icon.Calendar,  active: false },
              { Icon: Icon.Chart,     active: false },
              { Icon: Icon.Trophy,    active: false },
            ].map(({ Icon: I, active }, i) => (
              <span key={i} className={`${active ? 'text-[#00d4aa]' : 'text-gray-700'}`} style={{ transform: 'scale(0.65)' }}>
                <I />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Feature Card ──────────────────────────────────────────────────────────────
function FeatureCard({ IconComp, title, desc, gradient }) {
  return (
    <div className="group bg-[#1a1a2e] rounded-2xl p-7 border border-white/5 hover:border-white/10 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 text-white shadow-lg`}>
        <IconComp />
      </div>
      <h3 className="text-white font-bold text-lg mb-2 tracking-tight">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

// ── Step Card ─────────────────────────────────────────────────────────────────
function StepCard({ step, title, desc, IconComp }) {
  return (
    <div className="relative bg-[#1a1a2e] rounded-2xl p-7 border border-white/5 shadow-lg hover:border-white/10 hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
      <div className="text-[80px] font-black text-white/[0.03] absolute top-2 right-4 select-none leading-none">{step}</div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center text-[#00d4aa]">
          <span className="text-xs font-black">{step}</span>
        </div>
        <div className="flex-1 h-px bg-white/5" />
      </div>
      <h3 className="text-white font-bold text-lg mb-2 tracking-tight">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

// ── Testimonial Card ──────────────────────────────────────────────────────────
const T_GRADIENTS = ['from-violet-500 to-purple-700', 'from-blue-500 to-indigo-700', 'from-teal-400 to-emerald-600']

function TestimonialCard({ initials, name, role, quote, index }) {
  return (
    <div className="bg-[#1a1a2e] rounded-2xl p-7 border border-white/5 shadow-lg hover:border-white/10 hover:shadow-xl transition-all hover:-translate-y-0.5 duration-300 flex flex-col gap-5">
      {/* Stars */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} viewBox="0 0 12 12" className="w-3.5 h-3.5 text-yellow-400" fill="currentColor">
            <path d="M6 1l1.3 2.7L10.5 4l-2.2 2.2.5 3.3L6 8l-2.8 1.5.5-3.3L1.5 4l3.2-.3z"/>
          </svg>
        ))}
      </div>
      <p className="text-gray-300 text-sm leading-relaxed flex-1">"{quote}"</p>
      <div className="flex items-center gap-3 pt-1 border-t border-white/5">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${T_GRADIENTS[index]} flex items-center justify-center text-white text-xs font-bold shadow-lg shrink-0`}>
          {initials}
        </div>
        <div>
          <p className="text-white text-sm font-semibold leading-tight">{name}</p>
          {role && <p className="text-gray-600 text-xs">{role}</p>}
        </div>
        <div className="ml-auto flex items-center gap-1 text-green-400 text-xs font-semibold bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
          <Icon.Check />
          Verified
        </div>
      </div>
    </div>
  )
}

// ── Landing ───────────────────────────────────────────────────────────────────
export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white overflow-x-hidden">

      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[#00d4aa]/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      {/* ── Nav ── */}
      <nav className="relative flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#00d4aa] rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none">
              <polyline stroke="#0f0f1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="2 10 5 7 8 9 13 4"/>
            </svg>
          </div>
          <span className="text-white font-black text-xl tracking-tight">Settled</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="text-gray-400 hover:text-white text-sm font-medium transition-colors hidden sm:block">
            Sign In
          </Link>
          <Link
            to="/betlog"
            className="bg-[#00d4aa] text-[#0f0f1a] font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-[#00bfa0] hover:scale-105 transition-all shadow-lg shadow-[#00d4aa]/20"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#00d4aa]/8 border border-[#00d4aa]/20 rounded-full px-4 py-1.5 text-[#00d4aa] text-xs font-semibold mb-8 shadow-lg shadow-[#00d4aa]/5">
          <span className="w-1.5 h-1.5 bg-[#00d4aa] rounded-full animate-pulse" />
          AI-powered betting coach · Powered by Claude
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tighter mb-6">
          Don't Settle for<br />
          <span className="bg-gradient-to-r from-[#00d4aa] to-emerald-400 bg-clip-text text-transparent">
            Random Picks.
          </span>
        </h1>

        <p className="text-gray-400 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          Track, analyze, and understand your betting history like never before.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-20">
          <Link
            to="/betlog"
            className="bg-[#00d4aa] text-[#0f0f1a] font-bold px-9 py-4 rounded-2xl text-base hover:bg-[#00bfa0] transition-all hover:scale-105 shadow-xl shadow-[#00d4aa]/25"
          >
            Get Started Free
          </Link>
          <Link
            to="/dashboard"
            className="border border-white/15 text-white font-semibold px-8 py-4 rounded-2xl text-base hover:bg-white/5 hover:border-white/25 transition-all"
          >
            See How It Works →
          </Link>
        </div>

        {/* Phone */}
        <div className="flex justify-center">
          <PhoneMockup />
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="relative border-y border-white/[0.06] py-12 bg-gradient-to-r from-[#1a1a2e]/60 via-[#1a1a2e]/80 to-[#1a1a2e]/60 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { stat: '10,000+', label: 'Bets Tracked' },
              { stat: '73%',     label: 'Improve their ROI' },
              { stat: '+12%',    label: 'Avg ROI improvement' },
            ].map(({ stat, label }, i) => (
              <div key={stat} className="relative">
                {i < 2 && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-white/10" />}
                <p className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#00d4aa] to-emerald-400 bg-clip-text text-transparent">{stat}</p>
                <p className="text-gray-500 text-xs sm:text-sm mt-1.5 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative max-w-6xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <p className="text-[#00d4aa] text-xs font-bold uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">Everything in one place</h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto">Stop guessing. Start knowing exactly where your money goes and why.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <FeatureCard
            IconComp={Icon.Target}
            title="Bet Tracking"
            gradient="from-[#00d4aa] to-emerald-600"
            desc="Log every bet in seconds across all sportsbooks in one place. Every result, every dollar, always in sync."
          />
          <FeatureCard
            IconComp={Icon.Brain}
            title="AI Pattern Analysis"
            gradient="from-violet-500 to-purple-700"
            desc="Find out which sports, bet types, and situations actually make you money. Let Claude analyze your history."
          />
          <FeatureCard
            IconComp={Icon.TrendUp}
            title="Bankroll Coaching"
            gradient="from-blue-500 to-indigo-700"
            desc="Set limits, hit goals, and get coaching based on your personal patterns — not generic advice."
          />
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="relative max-w-6xl mx-auto px-6 pb-28">
        <div className="text-center mb-16">
          <p className="text-[#00d4aa] text-xs font-bold uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Get your edge in 3 steps</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StepCard step="01" title="Log your bets" desc="Add each bet as you make it — sport, odds, wager, result. Takes under 10 seconds." />
          <StepCard step="02" title="See your patterns" desc="The dashboard and calendar show exactly where you win, where you bleed, and why." />
          <StepCard step="03" title="Let AI coach you" desc="Claude analyzes your history and surfaces the specific insights that will move your ROI." />
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="relative max-w-6xl mx-auto px-6 pb-28">
        <div className="text-center mb-16">
          <p className="text-[#00d4aa] text-xs font-bold uppercase tracking-widest mb-3">Social Proof</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">Bettors who found their edge</h2>
          <p className="text-gray-500 text-base">Real results from real bettors who stopped guessing.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <TestimonialCard
            initials="MR" name="Mike R." role="NFL & NBA bettor" index={0}
            quote="Settled told me I was 2-11 betting NBA underdogs. I had no idea. Cut them out and my ROI jumped 8%."
          />
          <TestimonialCard
            initials="JT" name="Jordan T." role="Sharp bettor, 3 yrs" index={1}
            quote="The coaching feature stops me from chasing losses. I hit my daily goal and actually stop now."
          />
          <TestimonialCard
            initials="CM" name="Chris M." role="Recreational bettor" index={2}
            quote="Finally an app that shows me MY data, not just someone else's picks."
          />
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="max-w-6xl mx-auto px-6 pb-28">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 p-14 md:p-24 text-center">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00d4aa]/10 via-[#1a1a2e] to-purple-900/20" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#00d4aa]/10 rounded-full blur-[80px]" />
          <div className="absolute -bottom-20 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[60px]" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-[#00d4aa]/10 border border-[#00d4aa]/20 rounded-full px-4 py-1.5 text-[#00d4aa] text-xs font-semibold mb-6">
              Free forever · No credit card
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              Ready to find your edge?
            </h2>
            <p className="text-gray-400 text-base mb-10 max-w-md mx-auto leading-relaxed">
              Join thousands of bettors who track smarter, bet smarter, and win smarter with Settled.
            </p>
            <Link
              to="/betlog"
              className="inline-block bg-white text-[#0f0f1a] font-black px-12 py-4 rounded-2xl text-base hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#00d4aa] rounded-md flex items-center justify-center">
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none">
                <polyline stroke="#0f0f1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="2 10 5 7 8 9 13 4"/>
              </svg>
            </div>
            <span className="text-white font-black tracking-tight">Settled</span>
          </div>
          <p className="text-gray-600 text-xs">© 2026 Settled. Bet smarter, not harder.</p>
          <div className="flex gap-6">
            {[
              { to: '/dashboard', label: 'Dashboard' },
              { to: '/betlog',    label: 'Bet Log' },
              { to: '/coach',     label: 'Coach' },
            ].map(({ to, label }) => (
              <Link key={to} to={to} className="text-gray-600 hover:text-gray-300 text-xs font-medium transition-colors">{label}</Link>
            ))}
          </div>
        </div>
      </footer>

    </div>
  )
}
