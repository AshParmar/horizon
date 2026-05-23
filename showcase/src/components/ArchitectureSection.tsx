"use client";

import { motion } from "framer-motion";
import { Mail, FileText, Users, BrainCircuit, GitBranch, CalendarDays, TableProperties, FileSpreadsheet } from "lucide-react";

const nodes = [
  { id: 1, icon: Mail, label: "Gmail Monitor", desc: "Auto-downloads incoming resumes", type: "standard" },
  { id: 2, icon: FileText, label: "Extract Resume", desc: "PDF/TXT parsed to structured data", type: "standard" },
  { id: 3, icon: Users, label: "Enrich Profiles", desc: "LinkedIn API + Groq LLM fallback", type: "standard" },
  { id: 4, icon: BrainCircuit, label: "AI Scoring", desc: "Groq evaluates vs job criteria", type: "standard" },
  { id: 5, icon: GitBranch, label: "Decision Point", desc: "Score >= Threshold?", type: "decision" },
  { id: 6, icon: CalendarDays, label: "Schedule Interviews", desc: "Creates Google Calendar events", type: "branch-yes" },
  { id: 7, icon: TableProperties, label: "All Candidates DB", desc: "Google Sheets Export", type: "branch-no" },
  { id: 8, icon: FileSpreadsheet, label: "Interview Schedule", desc: "Shortlisted candidates export", type: "branch-yes" },
];

export default function ArchitectureSection() {
  return (
    <section id="pipeline" className="py-24 px-6 relative border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">State Machine Architecture</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Powered by LangGraph, the pipeline executes an 8-node state machine with conditional routing, orchestrating 4 Composio toolsets and Groq LLM inference.
          </p>
        </div>

        {/* Pipeline Visualization */}
        <div className="relative max-w-4xl mx-auto py-10">
          
          <div className="flex flex-col items-center gap-6 relative z-10">
            {/* Sequential Steps (1-4) */}
            {nodes.slice(0, 4).map((node, i) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="node-connector flex flex-col items-center w-full max-w-md"
              >
                <div className="w-full glass-panel rounded-xl p-5 flex items-center gap-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-12 h-12 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center border border-[var(--border-highlight)] shrink-0 text-[var(--accent-primary)]">
                    <node.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{node.id}. {node.label}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{node.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Decision Node (5) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-6 node-connector flex flex-col items-center w-full max-w-md"
            >
              <div className="w-full relative glass-panel rounded-xl p-5 flex items-center justify-center border-yellow-500/30 bg-yellow-500/5">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-500/20 border border-yellow-500/50 rounded flex items-center justify-center rotate-45"></div>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-500/20 border border-yellow-500/50 rounded flex items-center justify-center rotate-45"></div>
                
                <div className="text-center">
                  <GitBranch className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-yellow-100">{nodes[4].label}</h3>
                  <p className="text-sm text-yellow-200/70">{nodes[4].desc}</p>
                </div>
              </div>
            </motion.div>

            {/* Branches Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-12 relative">
              {/* Connecting SVG lines for branches */}
              <svg className="hidden md:block absolute -top-12 left-0 w-full h-12 pointer-events-none" preserveAspectRatio="none">
                <path d="M 50% 0 L 50% 20 L 25% 20 L 25% 48" fill="none" stroke="var(--accent-success)" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 50% 0 L 50% 20 L 75% 20 L 75% 48" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeDasharray="4 4" />
              </svg>

              {/* YES Branch */}
              <div className="flex flex-col gap-6">
                <div className="text-center font-mono text-sm text-[var(--accent-success)] mb-2 bg-[var(--accent-success)]/10 rounded-full py-1 px-3 w-max mx-auto border border-[var(--accent-success)]/20">
                  ✅ Score &gt;= 5.0 (Shortlist)
                </div>
                {[nodes[5], nodes[7]].map((node, i) => (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="w-full glass-panel rounded-xl p-5 flex items-center gap-4 border-[var(--accent-success)]/30 bg-[var(--accent-success)]/5"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center border border-[var(--border-highlight)] shrink-0 text-[var(--accent-success)]">
                      <node.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{node.id}. {node.label}</h3>
                      <p className="text-sm text-[var(--text-secondary)]">{node.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* NO Branch */}
              <div className="flex flex-col gap-6">
                <div className="text-center font-mono text-sm text-[var(--text-tertiary)] mb-2 bg-white/5 rounded-full py-1 px-3 w-max mx-auto border border-white/10">
                  ❌ Score &lt; 5.0 (Reject)
                </div>
                {(() => {
                  const NodeIcon = nodes[6].icon;
                  return (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                      className="w-full glass-panel rounded-xl p-5 flex items-center gap-4 opacity-70"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center border border-[var(--border-highlight)] shrink-0 text-[var(--text-secondary)]">
                        <NodeIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{nodes[6].id}. {nodes[6].label}</h3>
                        <p className="text-sm text-[var(--text-secondary)]">{nodes[6].desc}</p>
                      </div>
                    </motion.div>
                  );
                })()}
                <div className="text-center mt-4 text-sm text-[var(--text-secondary)] italic">
                  * Skips scheduling, goes directly to DB export.
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
