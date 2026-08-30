import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  Copy, 
  Check, 
  Server, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Cpu,
  Layers
} from 'lucide-react';

interface RenderDeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RENDER_YAML_CONTENT = `# ==============================================================================
# SAROOJ SATTAR COMMUNITY FORUM - RENDER BLUEPRINT (render.yaml)
# Infrastructure as Code for render.com with Managed PostgreSQL & Node.js
# ==============================================================================

databases:
  # Managed PostgreSQL Database Service on Render
  - name: sarooj-sattar-db
    databaseName: sarooj_sattar_db
    user: sarooj_admin
    plan: standard
    region: singapore # Low latency for Sri Lanka (South Asia)
    ipAllowList: [] # Accepts connections from services inside Render

services:
  # Full-Stack Web Service (Express API + Vite React Frontend)
  - type: web
    name: sarooj-sattar-forum
    runtime: node
    plan: standard
    region: singapore
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3000
      - key: DATABASE_URL
        fromDatabase:
          name: sarooj-sattar-db
          property: connectionString
      - key: GEMINI_API_KEY
        sync: false # Set in Render Dashboard secrets for AI civic triage
`;

export const RenderDeploymentModal: React.FC<RenderDeploymentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [dbStatus, setDbStatus] = useState<{
    databaseMode: string;
    hasDatabaseUrl: boolean;
    serverTime: string;
  } | null>(null);
  const [loadingDb, setLoadingDb] = useState(false);

  useEffect(() => {
    if (isOpen) {
      checkDb();
    }
  }, [isOpen]);

  const checkDb = async () => {
    setLoadingDb(true);
    try {
      const res = await fetch('/api/db/status');
      const data = await res.json();
      setDbStatus(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingDb(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(RENDER_YAML_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-950 text-white p-6 sm:p-7 flex items-center justify-between shrink-0 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-md">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight flex items-center gap-2">
                <span>render.yaml Infrastructure as Code</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 border border-emerald-700">
                  PostgreSQL Managed
                </span>
              </h2>
              <p className="text-xs text-stone-400 font-medium">
                Complete Blueprint Specification for 1-Click Deployment on Render.com
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Live Database Connectivity & Architecture Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Box 1: Managed Postgres */}
            <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-cyan-700" />
                  <span>Managed Database</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-200 text-cyan-900 font-bold">
                  render.com
                </span>
              </div>
              <p className="text-xs text-cyan-950 font-medium">
                Provisioned as <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-cyan-300">sarooj-sattar-db</code> with automated daily backups & SSL pooling.
              </p>
            </div>

            {/* Box 2: Node.js Web Service */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Server className="w-4 h-4 text-emerald-700" />
                  <span>Full-Stack Service</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 font-bold">
                  Node 22 / Express
                </span>
              </div>
              <p className="text-xs text-emerald-950 font-medium">
                Bundled via <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-emerald-300">esbuild</code> into CommonJS standalone container with Vite frontend.
              </p>
            </div>

            {/* Box 3: Runtime State */}
            <div className="p-4 rounded-2xl bg-stone-100 border border-stone-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-stone-600" />
                  <span>Runtime Engine</span>
                </span>
                <button
                  onClick={checkDb}
                  disabled={loadingDb}
                  className="text-[10px] font-bold text-stone-600 hover:text-stone-900 flex items-center gap-1"
                >
                  <RefreshCw className={`w-3 h-3 ${loadingDb ? 'animate-spin' : ''}`} />
                  <span>Check</span>
                </button>
              </div>
              <p className="text-xs text-stone-700 font-medium">
                Engine: <b className="text-stone-900 capitalize">{dbStatus?.databaseMode || 'Active'}</b> • Seamless auto-fallback ensures zero downtime.
              </p>
            </div>

          </div>

          {/* Infrastructure YAML Code Viewer */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-stone-700" />
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider font-mono">
                  render.yaml (Root Configuration)
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono font-bold shadow-xs transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied Blueprint!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-300" />
                    <span>Copy render.yaml</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 shadow-xl">
              <div className="bg-stone-900 px-4 py-2 border-b border-stone-800 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                <span className="text-[11px] font-mono text-stone-400 ml-2">render.yaml</span>
              </div>
              <pre className="p-5 font-mono text-xs text-stone-200 overflow-x-auto leading-relaxed">
                <code>{RENDER_YAML_CONTENT}</code>
              </pre>
            </div>
          </div>

          {/* 3-Step Deployment Guide for Render.com */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <h4 className="font-heading font-extrabold text-stone-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>How to Deploy to Render.com in 3 Easy Steps</span>
            </h4>

            <ol className="list-decimal list-inside space-y-2 text-xs text-stone-700 font-medium">
              <li>
                <b>Push Repository to GitHub / GitLab:</b> Ensure <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-stone-300">render.yaml</code> is at the root of your repo.
              </li>
              <li>
                <b>Create New Blueprint on Render:</b> Navigate to <a href="https://dashboard.render.com/blueprints" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-bold hover:underline inline-flex items-center gap-0.5">Render Dashboard &gt; Blueprints <ExternalLink className="w-3 h-3" /></a> and connect this repository.
              </li>
              <li>
                <b>Approve & Launch:</b> Render will automatically provision the managed PostgreSQL cluster, link the <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-stone-300">DATABASE_URL</code> environment variable, build the client & server, and bring the forum online!
              </li>
            </ol>
          </div>

        </div>

      </div>
    </div>
  );
};
