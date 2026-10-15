import { describe, expect, it } from 'vitest';
import { experiments, practicalCount } from '@/data/experiments';
import { student } from '@/data/student';
import { splitModulePages } from '@/data/modules';

describe('Personal laboratory requirements', () => {
  it('contains the six requested experiments and section counts', () => {
    expect(experiments.map(item => item.sections.length)).toEqual([3, 2, 4, 3, 7, 7]);
    expect(practicalCount).toBe(26);
  });
  it('uses the requested roll number', () => { expect(student.rollNumber).toBe('24102a030074'); });
  it('uses the requested semester', () => { expect(student.semester).toBe('5th'); });
  it('uses the requested subject code', () => { expect(student.subjectCode).toBe('2410ds006'); });
  it('uses the requested professor', () => { expect(student.professor).toBe('S BOSU BABU'); });
  it('uses the requested GitHub identity', () => { expect(student.githubUrl).toBe('https://github.com/harshav-web'); });
  it('splits added module notes into readable pages', () => {
    expect(splitModulePages('First page\n\n---\n\nSecond page')).toEqual(['First page', 'Second page']);
  });
});