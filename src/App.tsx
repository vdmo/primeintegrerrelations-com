/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  ExternalLink, 
  FileText, 
  Archive, 
  Info, 
  Menu, 
  X,
  ChevronRight,
  Database,
  Globe
} from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { publications, Publication } from './data/publications';
import { cn } from '@/lib/utils';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'HOME', path: '/', icon: <Globe className="w-3 h-3" /> },
    { name: 'ARCHIVE', path: '/archive', icon: <Archive className="w-3 h-3" /> },
    { name: 'RESEARCHERS', path: '/about', icon: <Info className="w-3 h-3" /> },
  ];

  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-foreground bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="group">
              <span className="font-heading text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
                PRIME INTEGER RELATIONS
              </span>
            </Link>
            <div className="hidden lg:block">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                {['RESEARCH', ...pathSegments].join(' / ')}
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-[11px] font-bold tracking-widest transition-colors hover:text-accent",
                  location.pathname === item.path 
                    ? "text-accent border-b-2 border-accent pb-1" 
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="h-4 w-[1px] bg-border" />
            <span className="text-[10px] font-bold text-muted-foreground">V2.46</span>
          </div>

          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="rounded-none border">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const PaperRow = ({ paper, isSelected, onSelect }: { paper: Publication, isSelected: boolean, onSelect: () => void }) => (
  <div 
    onClick={onSelect}
    className={cn(
      "group px-4 py-4 border-b cursor-pointer transition-colors",
      isSelected 
        ? "bg-blue-50/50 border-l-4 border-l-accent" 
        : "hover:bg-muted/50 border-l-4 border-l-transparent"
    )}
  >
    <div className="flex justify-between items-start mb-1">
      <span className="font-mono text-[10px] text-muted-foreground">
        {paper.arXiv || paper.source || paper.id}
      </span>
      <span className="font-mono text-[10px] text-muted-foreground">{paper.year}</span>
    </div>
    <h3 className="font-heading text-[15px] font-bold leading-snug text-foreground group-hover:text-accent transition-colors">
      {paper.title}
    </h3>
  </div>
);

const ArchivePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedRange, setSelectedRange] = useState<[number, number] | null>(null);
  
  const filteredPapers = publications.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          paper.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          paper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    let matchesType = true;
    if (selectedType !== 'All') {
      if (selectedType === 'arXiv Publications') matchesType = paper.type === 'arXiv';
      else if (selectedType === 'Books & Monographs') matchesType = paper.type === 'Book Chapter';
      else if (selectedType === 'Conference Records') matchesType = paper.type === 'Conference';
      else if (selectedType === 'Manuscript Archive') matchesType = false;
      else matchesType = paper.type === selectedType;
    }

    const matchesRange = !selectedRange || (paper.year >= selectedRange[0] && paper.year <= selectedRange[1]);
    
    return matchesSearch && matchesType && matchesRange;
  });

  const [selectedPaper, setSelectedPaper] = useState<Publication | null>(filteredPapers[0] || null);

  useEffect(() => {
    if (filteredPapers.length > 0 && (!selectedPaper || !filteredPapers.find(p => p.id === selectedPaper.id))) {
      setSelectedPaper(filteredPapers[0]);
    }
  }, [filteredPapers]);

  const categories = ['All', 'arXiv', 'Book Chapter', 'Conference'];

  return (
    <div className="flex flex-col h-[calc(100vh-64px-32px)] overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
      {/* Search & Filter Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-muted border-b">
        <div className="flex items-center gap-4 flex-grow max-w-xl">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="FILTER BY KEYWORD..." 
            className="bg-transparent border-none text-[11px] font-mono tracking-wider w-full outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedType(cat);
                setSelectedRange(null);
              }}
              className={cn(
                "text-[10px] font-bold tracking-widest px-2 py-1 transition-colors",
                selectedType === cat ? "text-accent border-b-2 border-accent" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-grow flex overflow-hidden">
        {/* Sidebar / Collections */}
        <div className="hidden lg:flex w-64 flex-col border-r bg-secondary p-6 overflow-y-auto">
          <section className="mb-10">
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Collections</h3>
            <div className="space-y-1">
              {['All Collections', 'arXiv Publications', 'Books & Monographs', 'Conference Records', 'Manuscript Archive'].map(item => (
                <button 
                  key={item} 
                  onClick={() => {
                    setSelectedType(item === 'All Collections' ? 'All' : item);
                    setSelectedRange(null);
                  }}
                  className={cn(
                    "block w-full text-left py-2 text-[13px] border-b border-transparent transition-all",
                    (selectedType === item || (item === 'All Collections' && selectedType === 'All')) ? "text-accent border-accent" : "hover:border-accent hover:text-accent"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
          <section className="mb-10">
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Timeline</h3>
            <div className="space-y-1">
              {[
                { label: '2011 - 2015', range: [2011, 2015] },
                { label: '2006 - 2010', range: [2006, 2010] },
                { label: '2001 - 2005', range: [2001, 2005] }
              ].map(item => (
                <button 
                  key={item.label} 
                  onClick={() => setSelectedRange(item.range as [number, number])}
                  className={cn(
                    "block w-full text-left py-2 text-[13px] transition-all",
                    selectedRange?.[0] === item.range[0] ? "text-accent font-bold" : "hover:text-accent"
                  )}
                >
                  {item.label}
                </button>
              ))}
              {selectedRange && (
                <button 
                  onClick={() => setSelectedRange(null)}
                  className="block w-full text-left py-2 text-[11px] text-accent hover:underline font-mono"
                >
                  CLEAR TIMELINE
                </button>
              )}
            </div>
          </section>
        </div>

        {/* List */}
        <div className="w-full md:w-1/2 lg:w-[400px] border-r flex flex-col bg-white overflow-hidden">
          <div className="px-6 py-2 bg-muted/50 border-b flex justify-between text-[10px] font-bold text-muted-foreground tracking-tighter">
            <span>DOCUMENT ID</span>
            <span>YEAR</span>
          </div>
          <ScrollArea className="flex-1">
            <div className="flex flex-col">
              {filteredPapers.map((paper) => (
                <PaperRow 
                  key={paper.id} 
                  paper={paper} 
                  isSelected={selectedPaper?.id === paper.id}
                  onSelect={() => setSelectedPaper(paper)}
                />
              ))}
              {filteredPapers.length === 0 && (
                <div className="p-8 text-center text-muted-foreground font-mono text-xs">
                  NO RECORDS FOUND
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Preview */}
        <div className="hidden md:flex flex-1 flex-col bg-white overflow-y-auto p-12">
          {selectedPaper ? (
            <div className="max-w-2xl">
              <span className="inline-block font-mono text-[10px] text-accent uppercase tracking-[0.3em] mb-8">
                Selected Archive Document
              </span>
              <h1 className="font-heading text-3xl font-bold leading-[1.1] mb-6">
                {selectedPaper.title}
              </h1>
              <div className="flex items-center gap-2 text-sm italic text-muted-foreground mb-8 pb-4 border-b">
                <span>{selectedPaper.authors.join(' & ')}</span>
                <div className="w-1 h-1 rounded-full bg-border" />
                <span>Central Queensland University</span>
              </div>
              
              <div className="space-y-6 mb-12">
                <p className="text-[14px] leading-relaxed text-foreground/80 font-sans">
                  {selectedPaper.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  {selectedPaper.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="rounded-none border-border px-2 py-0 text-[10px] uppercase font-mono">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="rounded-none px-8 h-12 text-[12px] font-bold tracking-widest bg-accent hover:bg-accent/90">
                  <a href={selectedPaper.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    ACCESS FULL TEXT <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
                {selectedPaper.arXiv && (
                  <Button variant="outline" className="rounded-none px-6 h-12 text-[11px] font-mono border-2">
                    arXiv:{selectedPaper.arXiv}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-50">
              <FileText className="w-16 h-16 mb-4 stroke-1" />
              <p className="font-mono text-sm">SELECT A RECORD TO PREVIEW</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const HomePage = () => (
  <div className="py-24 space-y-32">
    <section className="relative">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-block border-l-4 border-accent pl-6 py-2">
            <span className="text-[12px] font-mono uppercase tracking-[0.4em] text-muted-foreground">Research Archive v2.4</span>
          </div>
          <h1 className="font-heading text-6xl font-bold tracking-tighter leading-[0.95]">
            UNIVERSAL <br />
            STRUCTURES IN <br />
            <span className="text-accent italic">PRIME RELATIONS</span>
          </h1>
          <p className="max-w-md text-lg text-muted-foreground leading-relaxed">
            A centralized digital repository for the irreducible theory of complex systems through arithmetic-based self-organization.
          </p>
          <div className="flex gap-4 pt-4">
            <Link
              to="/archive"
              className={cn(
                buttonVariants({
                  size: "lg",
                  className:
                    "rounded-none px-10 h-14 bg-accent hover:bg-accent/90 text-[12px] font-bold tracking-[0.2em]",
                })
              )}
            >
              OPEN ARCHIVE
            </Link>
            <Link
              to="/about"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className:
                    "rounded-none px-10 h-14 border-2 text-[12px] font-bold tracking-[0.2em]",
                })
              )}
            >
              BIOGRAPHY
            </Link>
          </div>
        </motion.div>
        <div className="relative">
          <div className="aspect-[4/5] bg-card overflow-hidden border-[16px] border-white shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1000" 
              alt="Mathematical Abstract"
              className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-1000" 
            />
          </div>
          <div className="absolute -bottom-12 -right-12 w-64 p-8 bg-accent text-white hidden xl:block shadow-xl">
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-2 block">Latest Update</span>
            <p className="text-[14px] font-heading font-medium leading-tight">
              Added archive entries for the 2011 hierarchical network publications.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="border-y-2 border-foreground py-20 bg-white">
      <div className="grid md:grid-cols-3 gap-16">
        <div className="space-y-4">
          <span className="font-mono text-[10px] text-accent font-bold">01/ IRREDUCIBILITY</span>
          <h3 className="text-xl font-heading font-bold">Atomic Logic</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Defining the fundamental particles of systemic interaction through the lens of prime integer dynamics.
          </p>
        </div>
        <div className="space-y-4">
          <span className="font-mono text-[10px] text-accent font-bold">02/ FRACTALS</span>
          <h3 className="text-xl font-heading font-bold">Geometric Bias</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Mapping self-similar growth behaviors in decentralized network structures.
          </p>
        </div>
        <div className="space-y-4">
          <span className="font-mono text-[10px] text-accent font-bold">03/ OPTIMIZATION</span>
          <h3 className="text-xl font-heading font-bold">Inherent Key</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Leveraging architectural complexity to unlock the optimization of high-dimensional systems.
          </p>
        </div>
      </div>
    </section>

    <section className="bg-secondary p-20 text-center">
      <div className="max-w-2xl mx-auto space-y-8">
        <blockquote className="font-heading text-4xl font-bold leading-tight italic">
          "The complexity of a system is not a barrier to optimization, but the key that unlocks it."
        </blockquote>
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          V. Korotkikh & G. Korotkikh • Central Queensland University
        </div>
      </div>
    </section>
  </div>
);

const AboutPage = () => (
  <div className="py-24 space-y-24 max-w-5xl mx-auto">
    <div className="space-y-6 text-center">
      <Badge variant="outline" className="rounded-none border-accent text-accent font-mono tracking-widest px-4">FACULTY PROFILE</Badge>
      <h1 className="font-heading text-6xl font-bold tracking-tighter">RESEARCH LEADERSHIP</h1>
      <Separator className="w-24 mx-auto bg-accent h-1" />
    </div>

    <div className="grid md:grid-cols-2 gap-20 items-start">
      <div className="space-y-12">
        <section className="space-y-6">
          <div className="border-l-4 border-accent pl-6">
            <h2 className="text-3xl font-heading font-bold italic">Founding Researchers</h2>
            <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest mt-2">Theory & Fundamental Principles</p>
          </div>
          
          <div className="space-y-8">
            <div className="group">
              <h3 className="text-xl font-bold mb-2 transition-colors group-hover:text-accent">Victor Korotkikh</h3>
              <p className="text-muted-foreground text-[14px] leading-relaxed">
                A primary architect of the irreducible theory of complex systems. Victor's research at Central Queensland University 
                established the mathematical link between prime integer relations and autonomous self-organization in high-dimensional spaces.
              </p>
            </div>

            <div className="group">
              <h3 className="text-xl font-bold mb-2 transition-colors group-hover:text-accent">Galina Korotkikh</h3>
              <p className="text-muted-foreground text-[14px] leading-relaxed">
                Co-founder of the Prime Relations framework. Galina specializes in the computational modeling of fractal geometric 
                patterns occurring within prime number distributions, bridging the gap between pure mathematics and applied complexity.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6 pt-12 border-t">
          <div className="border-l-4 border-accent pl-6">
            <h2 className="text-3xl font-heading font-bold italic">Grigori Korotkikh</h2>
            <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest mt-2">Leading Innovations & Operations</p>
          </div>
          <p className="text-muted-foreground text-[14px] leading-relaxed">
            Leading the foundations and prime integer relations technical innovative operations. Grigori oversees the translation of 
            theoretical complex system principles into functional technical frameworks, ensuring the scalability and practical application 
            of the archive's core intelligence.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted border font-mono text-[10px] leading-tight">
              <span className="block font-bold mb-1">STRATEGIC PILLAR</span>
              TECHNICAL FOUNDATIONS LEADERSHIP
            </div>
            <div className="p-4 bg-muted border font-mono text-[10px] leading-tight">
              <span className="block font-bold mb-1">FOCUS AREA</span>
              INNOVATIVE PRIME OPERATIONS
            </div>
          </div>
        </section>
      </div>

      <div className="space-y-12">
        <div className="aspect-[3/4] bg-muted grayscale border-8 border-white shadow-xl overflow-hidden relative">
          <img 
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000" 
            alt="Scientific Collaboration" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
        </div>

        <div className="p-10 bg-foreground text-card space-y-6">
          <Globe className="w-10 h-10 text-accent-foreground" />
          <h3 className="font-heading text-2xl font-bold">Global Impact</h3>
          <p className="text-sm font-medium leading-relaxed opacity-80">
            From the rockhampton labs of CQU to international arXiv visibility, the Korotkikh research legacy 
            remains an open-source beacon for those exploring the irreducible heart of complexity.
          </p>
          <div className="pt-6 flex justify-between items-end border-t border-white/20">
            <span className="font-mono text-[10px] uppercase opacity-50 tracking-widest">Active Indexing v2.46</span>
            <Database className="w-4 h-4 opacity-30" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-foreground text-white border-t">
    <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] tracking-widest uppercase opacity-80">
      <div className="flex items-center gap-6">
        <span>DATABASE STATUS: CONNECTED</span>
        <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
        <span>RECORDS: 842</span>
      </div>
      <div className="flex gap-8">
        <span>WWW.PRIMEINTEGERRELATIONS.COM</span>
        <span>INDEXED: 100%</span>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-accent selection:text-white">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 sm:px-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
