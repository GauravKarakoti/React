import { ExternalLink, GitBranch, Terminal } from 'lucide-react';
import './App.css';

interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  localPort: number;
}

const projects: Project[] = [
  {
    id: 'solana-launchpad',
    name: 'Solana Token Launchpad',
    description: 'A platform to create and launch SPL tokens on the Solana blockchain.',
    tags: ['Solana', 'Web3'],
    localPort: 5174
  },
  {
    id: 'solana-faucet',
    name: 'Solana Faucet',
    description: 'A devnet token airdrop interface for Solana developers.',
    tags: ['Solana', 'Web3'],
    localPort: 5175
  },
  {
    id: 'music-db',
    name: 'Music DB',
    description: 'An album and artist database explorer.',
    tags: ['API', 'UI'],
    localPort: 3000 
  },
  {
    id: 'nba',
    name: 'NBA Insights',
    description: 'A dedicated app for tracking basketball teams and articles.',
    tags: ['Sports'],
    localPort: 3001
  },
  {
    id: 'the-daily-news',
    name: 'The Daily News',
    description: 'A news aggregator and article reading platform.',
    tags: ['Redux', 'News'],
    localPort: 3002
  },
  {
    id: 'who-pays-the-bill',
    name: 'Who Pays The Bill',
    description: 'A fun utility application to randomize and decide who picks up the check.',
    tags: ['State Management'],
    localPort: 3003
  },
  {
    id: 'advice-app',
    name: 'Advice App',
    description: 'A simple application fetching random pieces of advice.',
    tags: ['API'],
    localPort: 5173
  },
  {
    id: 'library',
    name: 'Library',
    description: 'A library that manages books.',
    tags: ['Props'],
    localPort: 3004
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 sm:p-8 font-sans selection:bg-indigo-500/30 relative z-0 overflow-hidden">
      {/* Ambient Background Gradient */}
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.15),rgba(255,255,255,0))]"></div>

      <header className="max-w-6xl mx-auto mb-16 text-center pt-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-semibold mb-6 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
          <Terminal size={16} />
          <span>Developer Portfolio</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          React Project Showcase
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
          A centralized directory of my latest React mini applications.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-12">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="group relative bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] flex flex-col h-full hover:-translate-y-1.5"
          >
            <h2 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-indigo-400 transition-colors">
              {project.name}
            </h2>
            <p className="text-slate-400 mb-6 flex-grow leading-relaxed text-sm sm:text-base">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map(tag => (
                <span 
                  key={tag} 
                  className="bg-slate-950 text-slate-300 text-xs px-3 py-1 rounded-full font-medium border border-slate-800 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-3 pt-5 border-t border-slate-800/80 mt-auto">
              <a 
                href={`/${project.id}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 rounded-xl transition-all hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]"
              >
                <ExternalLink size={16} />
                View App
              </a>
              <a 
                href={`https://github.com/gauravkarakoti/react/tree/main/projects/${project.id}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-xl transition-all hover:text-white border border-slate-700 hover:border-slate-600"
                aria-label="View Source"
              >
                <GitBranch size={16} />
              </a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}