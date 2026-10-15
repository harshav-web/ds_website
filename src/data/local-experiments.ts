import type { Experiment } from './experiments';
export const storageKey = 'ds-personal-experiments';
export function readExperiments(): Experiment[] {
 try { const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]'); if (!Array.isArray(value)) return []; return value.filter((item): item is Experiment => item && typeof item.id === 'string' && typeof item.title === 'string' && typeof item.summary === 'string' && Array.isArray(item.sections)); } catch { return []; }
}
