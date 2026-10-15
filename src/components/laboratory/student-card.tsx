import { GraduationCap, Github, Linkedin, ArrowUpRight, BadgeCheck } from 'lucide-react';
import { student } from '@/data/student';
import photo from '@/assets/student-photo.png.asset.json';
import { Button } from '@/components/ui/button';
export function StudentCard() {
  return <section className="student-card" aria-label="Student academic ID card">
    <div className="id-header"><span className="flex items-center gap-2"><GraduationCap size={19}/> STUDENT ACADEMIC ID</span><span className="id-active"><BadgeCheck size={14}/> Semester 05</span></div>
    <div className="id-body"><img className="id-photo" src={photo.url} alt="Harshavardhan Reddy V."/><div className="id-details"><p className="eyebrow">MOHAN BABU UNIVERSITY</p><h2>{student.name}</h2><p className="roll-number">{student.rollNumber}</p><div className="id-grid">{[['Branch', student.branch], ['Semester', student.semester], ['Subject', student.subject], ['Subject code', student.subjectCode], ['Assistant professor', student.professor], ['University', student.university]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></div></div>
    <div className="id-socials"><Button variant="ghost" asChild><a href={student.githubUrl} target="_blank" rel="noreferrer"><Github/> <span><small>GITHUB</small>{student.github}</span><ArrowUpRight/></a></Button><Button variant="ghost" asChild><a href={student.linkedinUrl} target="_blank" rel="noreferrer"><Linkedin/><span><small>LINKEDIN</small>{student.linkedin}</span><ArrowUpRight/></a></Button></div>
  </section>;
}
