import { ExternalLink, GitBranch } from 'lucide-react';
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
    tags: ['React', 'Solana', 'Web3'],
    localPort: 5174
  },
  {
    id: 'solana-faucet',
    name: 'Solana Faucet',
    description: 'A devnet token airdrop interface for Solana developers.',
    tags: ['React', 'Solana', 'Web3'],
    localPort: 5175
  },
  {
    id: 'music-db',
    name: 'Music DB',
    description: 'An album and artist database explorer.',
    tags: ['React', 'API', 'UI'],
    localPort: 3000 
  },
  {
    id: 'nba',
    name: 'NBA Insights',
    description: 'A dedicated app for tracking basketball teams and articles.',
    tags: ['React', 'Sports'],
    localPort: 3001
  },
  {
    id: 'the-daily-news',
    name: 'The Daily News',
    description: 'A news aggregator and article reading platform.',
    tags: ['React', 'Redux', 'News'],
    localPort: 3002
  },
  {
    id: 'who-pays-the-bill',
    name: 'Who Pays The Bill',
    description: 'A fun utility application to randomize and decide who picks up the check.',
    tags: ['React', 'State Management'],
    localPort: 3003
  },
  {
    id: 'advice-app',
    name: 'Advice App',
    description: 'A simple application fetching random pieces of advice.',
    tags: ['React', 'API'],
    localPort: 5173
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <header className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Project Showcase</h1>
        <p className="text-lg text-gray-600">A centralized directory of my React applications.</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
          >
            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
            <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100 mt-auto">
              {/* Replace localhost links with production URLs once deployed */}
              <a 
                href={`/${project.id}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors"
              >
                <ExternalLink size={16} />
                View App
              </a>
              <a 
                href={`https://github.com/gauravkarakoti/react/tree/main/${project.id}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                <GitBranch size={16} />
                Source
              </a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}