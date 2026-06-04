import { Link } from 'react-router-dom'

// ── Phone mockup ─────────────────────────────────────────────────────────────
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-52 sm:w-60">
      {/* Glow */}
      <div className="absolute inset-0 bg-[#00d4aa]/20 rounded-[2.5rem] blur-2xl scale-110" />
      {/* Frame */}
      <div className="relative bg-[#0a0a14] rounded-[2.5rem] border-2 border-white/10 overflow-hidden shadow-2xl">
        {/* Notch */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-20 h-5 bg-[#0f0f1a] rounded-full border border-white/10" />
        </div>
        {/* Screen content */}
        <div className="bg-[#0f0f1a] px-3 pb-6 pt-2 space-y-3">
          {/* Header */}
          <p className="text-white text-xs font-bold">Dashboard</p>
          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { label: 'Total Profit', value: '+$340', color: 'text-green-400' },
              { label: 'Win Rate',     value: '68%',   color: 'text-[#00d4aa]' },
              { label: 'Total Bets',   value: '24',    color: 'text-white' },
              { label: 'Units Won',    value: '+4.2',  color: 'text-green-400' },
            ].map(s => (
              <div key={s.label} className="bg-[#1a1a2e] rounded-lg p-2">
                <p className="text-gray-600 text-[8px]">{s.label}</p>
                <p className={`${s.color} text-xs font-bold`}>{s.value}</p>
              </div>
            ))}
          </div>
          {/* Mini bet cards */}
          <div className="space-y-1.5">
            {[
              { desc: 'Chiefs -3.5',    pl: '+$45.45', result: 'Win',    color: 'text-green-400' },
              { desc: 'Lakers ML',      pl: '-$50.00', result: 'Loss',   color: 'text-red-400' },
              { desc: 'Over 214.5',     pl: '+$90.90', result: 'Win',    color: 'text-green-400' },
            ].map(b => (
              <div key={b.desc} className="bg-[#1a1a2e] rounded-lg px-2.5 py-1.5 flex items-center justify-between">
                <div>
                  <p className="text-white text-[9px] font-medium">{b.desc}</p>
                  <span className={`text-[8px] px-1 py-0.5 rounded-full font-medium ${
                    b.result === 'Win'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>{b.result}</span>
                </div>
                <p className={`text-[9px] font-bold ${b.color}`}>{b.pl}</p>
              </div>
            ))}
          </div>
          {/* Bottom nav bar */}
          <div className="bg-[#1a1a2e] rounded-xl flex justify-around py-2 mt-1">
            {['⊞','📋','📅','📈','🏆'].map((icon, i) => (
              <span key={i} className={`text-xs ${i === 0 ? 'text-[#00d4aa]' : 'text-gray-600'}`}>{icon}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Feature card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/5 border-t-2 border-t-[#00d4aa] flex flex-col gap-3">
      <span className="text-3xl">{icon}</span>
      <h3 className="text-white font-bold text-lg">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

// ── Testimonial card ─────────────────────────────────────────────────────────
const AVATAR_COLORS = ['bg-violet-500', 'bg-blue-500', 'bg-teal-600']

function TestimonialCard({ initials, name, quote, index }) {
  return (
    <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/5 flex flex-col gap-4">
      <p className="text-gray-300 text-sm leading-relaxed">"{quote}"</p>
      <div className="flex items-center gap-3 mt-auto">
        <div className={`w-9 h-9 rounded-full ${AVATAR_COLORS[index]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
          {initials}
        </div>
        <p className="text-white text-sm font-semibold">{name}</p>
      </div>
    </div>
  )
}

// ── Landing page ─────────────────────────────────────────────────────────────
export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white overflow-x-hidden">

      {/* ── Minimal nav ── */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <span className="text-[#00d4aa] font-bold text-xl">Settled</span>
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors hidden sm:block">
            Sign In
          </Link>
          <Link
            to="/betlog"
            className="bg-[#00d4aa] text-[#0f0f1a] font-bold px-4 py-2 rounded-xl text-sm hover:bg-[#00bfa0] transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 text-center">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 bg-[#00d4aa]/10 border border-[#00d4aa]/20 rounded-full px-4 py-1.5 text-[#00d4aa] text-xs font-semibold mb-8">
          <span className="w-1.5 h-1.5 bg-[#00d4aa] rounded-full animate-pulse" />
          AI-powered betting coach
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
          Don't Settle for<br />
          <span className="text-[#00d4aa]">Random Picks.</span>
        </h1>

        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Track, analyze, and understand your betting history like never before.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <Link
            to="/betlog"
            className="bg-[#00d4aa] text-[#0f0f1a] font-bold px-8 py-4 rounded-2xl text-base hover:bg-[#00bfa0] transition-all hover:scale-105 shadow-lg shadow-[#00d4aa]/20"
          >
            Get Started Free
          </Link>
          <Link
            to="/dashboard"
            className="border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl text-base hover:bg-white/5 transition-colors"
          >
            See How It Works →
          </Link>
        </div>

        {/* Phone mockup */}
        <div className="flex justify-center">
          <PhoneMockup />
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y border-white/5 bg-[#1a1a2e]/50 py-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { stat: '10,000+', label: 'Bets Tracked' },
              { stat: '73%',     label: 'of users improve their ROI' },
              { stat: '+12%',    label: 'Average ROI improvement' },
            ].map(({ stat, label }) => (
              <div key={stat}>
                <p className="text-[#00d4aa] text-2xl sm:text-3xl md:text-4xl font-black">{stat}</p>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Everything in one place</h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">Stop guessing. Start knowing exactly where your money goes and why.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FeatureCard
            icon="🎯"
            title="Bet Tracking"
            desc="Log every bet in seconds across all sportsbooks in one place. Every result, every dollar, always in sync."
          />
          <FeatureCard
            icon="🧠"
            title="AI Pattern Analysis"
            desc="Find out which sports, bet types, and situations actually make you money. Let Claude analyze your history."
          />
          <FeatureCard
            icon="📈"
            title="Bankroll Coaching"
            desc="Set limits, hit goals, and get coaching based on your personal patterns — not generic advice."
          />
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Get your edge in 3 steps</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { step: '01', title: 'Log your bets', desc: 'Add each bet as you make it — sport, odds, wager, result. Takes under 10 seconds.' },
            { step: '02', title: 'See your patterns', desc: 'The dashboard and calendar show exactly where you win, where you bleed, and why.' },
            { step: '03', title: 'Let AI coach you', desc: 'Claude analyzes your history and surfaces the specific insights that will move your ROI.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="relative bg-[#1a1a2e] rounded-2xl p-6 border border-white/5">
              <p className="text-5xl font-black text-white/5 absolute top-4 right-5 select-none leading-none">{step}</p>
              <p className="text-[#00d4aa] text-sm font-bold mb-3">{step}</p>
              <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Bettors who found their edge</h2>
          <p className="text-gray-500 text-base">Real results from real bettors who stopped guessing.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <TestimonialCard
            initials="MR" name="Mike R." index={0}
            quote="Settled told me I was 2-11 betting NBA underdogs. I had no idea. Cut them out and my ROI jumped 8%."
          />
          <TestimonialCard
            initials="JT" name="Jordan T." index={1}
            quote="The coaching feature stops me from chasing losses. I hit my daily goal and actually stop now."
          />
          <TestimonialCard
            initials="CM" name="Chris M." index={2}
            quote="Finally an app that shows me MY data, not just someone else's picks."
          />
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#00d4aa]/20 via-[#1a1a2e] to-[#1a1a2e] border border-[#00d4aa]/20 p-12 md:p-20 text-center">
          {/* Background glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00d4aa]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Ready to find your edge?
            </h2>
            <p className="text-gray-400 text-base mb-10 max-w-lg mx-auto">
              Join thousands of bettors who track smarter, bet smarter, and win smarter with Settled.
            </p>
            <Link
              to="/betlog"
              className="inline-block bg-white text-[#0f0f1a] font-black px-10 py-4 rounded-2xl text-base hover:bg-gray-100 transition-all hover:scale-105"
            >
              Get Started Free
            </Link>
            <p className="text-gray-600 text-xs mt-4">No credit card required. Free forever.</p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[#00d4aa] font-bold">Settled</span>
          <p className="text-gray-600 text-xs">© 2026 Settled. Bet smarter, not harder.</p>
          <div className="flex gap-5">
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">App</Link>
            <Link to="/betlog"    className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Bet Log</Link>
            <Link to="/coach"     className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Coach</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
