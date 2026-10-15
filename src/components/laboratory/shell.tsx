import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowUpRight, FlaskConical, Github, Linkedin, Moon, Sun, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import photo from '@/assets/student-photo.png.asset.json';
import { student } from '@/data/student';
export function Header() {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => { const preference = localStorage.getItem('ds-theme') === 'dark'; setDark(preference); document.documentElement.classList.toggle('dark', preference); }, []);
  function toggle() { const next = !dark; setDark(next); document.documentElement.classList.toggle('dark', next); localStorage.setItem('ds-theme', next ? 'dark' : 'light'); }
  return <header className="site-header"><div className="header-inner"><Link to="/" className="brand"><span className="brand-symbol"><FlaskConical size={22}/></span><span>DS<span className="brand-light"> / LAB</span></span></Link><nav className={menu ? 'main-nav mobile-open' : 'main-nav'} aria-label="Main navigation"><Link to="/" activeOptions={{ exact: true }} onClick={() => setMenu(false)}>Home</Link><Link to="/lab" onClick={() => setMenu(false)}>Laboratory</Link><Link to="/modules" onClick={() => setMenu(false)}>Modules</Link><a href={student.githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13}/></a></nav><div className="header-actions"><span className="semester-chip">SEMESTER 05</span><Button variant="ghost" size="icon" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} title="Change theme" onClick={toggle}>{dark ? <Sun/> : <Moon/>}</Button><Button variant="ghost" size="icon" className="mobile-menu-button" aria-label="Toggle navigation" onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</Button></div></div></header>;
}
export function Footer() {
 return <footer className="site-footer"><div><Link to="/" className="footer-brand"><FlaskConical size={17}/> Data Science Laboratory</Link><p>© 2026 Harshavardhan Reddy V. · Mohan Babu University</p></div><div className="footer-links"><a href={student.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18}/></a><a href={student.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn search"><Linkedin size={18}/></a><Link to="/lab">Laboratory <ArrowUpRight size={14}/></Link></div></footer>;
}
export function PageHeading({ title, subtitle, profile = false }: { title: string; subtitle: string; profile?: boolean }) {
 return <div className="page-heading"><div><p className="eyebrow"><span className="blue-dash"/> YOUR PERSONAL LEARNING LAB</p><h1>{title}</h1><p className="page-subtitle">{subtitle}</p></div>{profile && <Button variant="outline" asChild className="profile-shortcut"><Link to="/profile"><img src={photo.url} alt=""/><span><small>STUDENT PROFILE</small><strong>Harshavardhan Reddy V.</strong></span><ArrowRight size={17}/></Link></Button>}</div>;
}
