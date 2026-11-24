import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import {
  Github,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';
import { validateContactForm } from '../utils/portfolioLogic';

const KATANA_EASE = [0.16, 1, 0.3, 1] as const;

export function ContactPanel() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validation = validateContactForm({ name, email, message });
    if (!validation.valid) {
      setErrors(validation.errors as Record<string, string>);
      setSubmitted(false);
      return;
    }
    setErrors({});
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  const renderSocialIcon = (id: string) => {
    if (id === 'github') return <Github className="w-4 h-4" aria-hidden="true" />;
    if (id === 'linkedin') return <Linkedin className="w-4 h-4" aria-hidden="true" />;
    return <Mail className="w-4 h-4" aria-hidden="true" />;
  };

  return (
    <footer
      id="contact"
      className="scroll-mt-16 relative bg-[#0F172A] dark:bg-[#080B12] text-[#FAF8F5] overflow-hidden border-t border-slate-800 dark:border-[#1E293B] transition-colors duration-300"
    >
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-14 border-b border-slate-800">
          {/* Left: Collaboration Prompt, Motto & Clean Links */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, ease: KATANA_EASE }}
            >
              <p className="font-mono-tech text-xs font-bold tracking-[0.16em] text-[#F472B6] dark:text-[#D4AF37] mb-3">
                04 / CONTACT
              </p>
              <h2 className="font-display text-3xl sm:text-5xl tracking-tight text-white text-balance mb-4">
                Let&apos;s Build Together
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300 max-w-lg mb-8">
                Interested in collaborating on AI/ML projects or discussing
                engineering opportunities? Reach out directly.
              </p>
            </motion.div>

            {/* Japanese Samurai & Sakura Motto Card */}
            <div className="rounded-xl border border-slate-700 dark:border-[#D4AF37]/35 bg-slate-900/70 dark:bg-[#141C2E]/85 p-4 sm:p-5 mb-7">
              <p className="font-mono-tech text-[11px] tracking-wider text-[#F472B6] dark:text-[#E5C158] uppercase">
                一期一会 • ICHIGO ICHIE
              </p>
              <p className="text-sm sm:text-base font-bold text-white mt-1.5 leading-snug">
                Every encounter is a once-in-a-lifetime opportunity.
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                Always open to meaningful engineering conversations and new ideas.
              </p>
            </div>

            {/* Clean Architectural Icon Links for GitHub, LinkedIn, Email */}
            <div className="space-y-3">
              {PORTFOLIO_PROFILE.socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="flex flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 px-4 py-3.5 rounded-xl border border-slate-700/80 dark:border-[#24304A] bg-slate-900/50 dark:bg-[#141C2E]/70 text-[#FAF8F5] hover:border-[#F472B6] dark:hover:border-[#D4AF37] hover:bg-slate-800/80 dark:hover:bg-[#1B253B] transition-colors"
                >
                  <span className="inline-flex items-center gap-2.5 text-sm font-semibold whitespace-nowrap shrink-0">
                    {renderSocialIcon(social.id)}
                    <span>{social.label}</span>
                  </span>
                  <span className="font-mono-tech text-xs text-slate-400 break-all sm:break-normal sm:text-right sm:truncate">
                    {social.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Sleek Inquiry Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.45, delay: 0.08, ease: KATANA_EASE }}
            className="lg:col-span-6 rounded-2xl bg-white dark:bg-[#141C2E] text-[#0F172A] dark:text-[#F8FAFC] border border-slate-200 dark:border-[#24304A] p-6 sm:p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)]"
          >
            <h3 className="font-display text-2xl text-[#0F172A] dark:text-[#F8FAFC] mb-1">
              Send a Message
            </h3>
            <p className="text-sm text-[#475569] dark:text-slate-300 mb-6">
              Drop a note about engineering roles, ML collaborations, or research
              inquiries.
            </p>

            {submitted && (
              <div
                role="status"
                className="mb-5 p-4 rounded-xl border border-[#F472B6] dark:border-[#D4AF37] bg-[#FCE7F3]/50 dark:bg-[#D4AF37]/10 text-[#0F172A] dark:text-[#F8FAFC]"
              >
                <p className="font-bold text-sm">
                  Message recorded for {PORTFOLIO_PROFILE.displayName}.
                </p>
                <p className="text-xs text-[#475569] dark:text-slate-300 mt-1">
                  For immediate follow-up, email {PORTFOLIO_PROFILE.email}.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-slate-200 mb-1.5"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Nair"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#0B0F19] border border-slate-300 dark:border-[#2E3D5C] text-sm text-[#0F172A] dark:text-[#F8FAFC] dark:placeholder:text-slate-500 focus:border-[#0F172A] dark:focus:border-[#D4AF37] focus:bg-white dark:focus:bg-[#0B0F19] transition-colors"
                />
                {errors.name && (
                  <p className="text-xs font-semibold text-[#DC2626] dark:text-[#F87171] mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-slate-200 mb-1.5"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#0B0F19] border border-slate-300 dark:border-[#2E3D5C] text-sm text-[#0F172A] dark:text-[#F8FAFC] dark:placeholder:text-slate-500 focus:border-[#0F172A] dark:focus:border-[#D4AF37] focus:bg-white dark:focus:bg-[#0B0F19] transition-colors"
                />
                {errors.email && (
                  <p className="text-xs font-semibold text-[#DC2626] dark:text-[#F87171] mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-slate-200 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share project details, collaboration ideas, or feedback..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#0B0F19] border border-slate-300 dark:border-[#2E3D5C] text-sm text-[#0F172A] dark:text-[#F8FAFC] dark:placeholder:text-slate-500 focus:border-[#0F172A] dark:focus:border-[#D4AF37] focus:bg-white dark:focus:bg-[#0B0F19] transition-colors"
                />
                {errors.message && (
                  <p className="text-xs font-semibold text-[#DC2626] dark:text-[#F87171] mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#DC2626] dark:bg-[#C9A24D] text-white dark:text-[#0B0F19] text-sm font-bold katana-primary-btn hover:bg-[#B91C1C] dark:hover:bg-[#D4AF37] cursor-pointer"
              >
                <span className="katana-sheen-layer" aria-hidden="true" />
                <span className="katana-notch-tl" aria-hidden="true" />
                <span className="katana-notch-br" aria-hidden="true" />
                <span className="relative z-10 inline-flex items-center gap-2">
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Send Message</span>
                </span>
              </button>
            </form>
          </motion.div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; 2026 {PORTFOLIO_PROFILE.displayName}. All rights reserved.</p>
          <p className="font-mono-tech">
            AI &amp; Machine Learning Engineer
          </p>
        </div>
      </div>
    </footer>
  );
}
