import { Link } from '@tanstack/react-router';
import { ArrowUpRight, ChevronRight, FileSpreadsheet, Globe2, Sparkles, Layers3, ChartNoAxesCombined, Clock3, BookOpen } from 'lucide-react';
import { experiments, type Experiment } from '@/data/experiments';
const icons = [FileSpreadsheet, Globe2, Sparkles, Layers3, ChartNoAxesCombined, Clock3];
export function ExperimentList({ items = experiments, compact = false }: { items?: Experiment[]; compact?: boolean }) {
 return <div className={compact ? 'experiment-list compact-list' : 'experiment-list'}>{items.map((experiment, index) => { const Icon = icons[index % icons.length] ?? FileSpreadsheet; return <Link key={experiment.id} to="/lab/$experimentId" params={{ experimentId: experiment.id }} className={`experiment-row experiment-tone-${index % 6}`}><span className="experiment-icon"><Icon size={22}/></span><div className="experiment-info"><span className="eyebrow">EXPERIMENT {experiment.id.padStart(2, '0')}</span><h3>{experiment.title}</h3>{!compact && <p>{experiment.summary}</p>}</div><span className="section-count"><BookOpen size={14}/>{experiment.sections.length} practical sections</span><ChevronRight className="row-chevron" size={19}/></Link>; })}</div>;
}
export function SectionTitle({ title, count }: { title: string; count?: string }) {
 return <div className="section-title"><h2>{title} {count && <span>{count}</span>}</h2><Link to="/lab">View all experiments <ArrowUpRight size={15}/></Link></div>;
}
