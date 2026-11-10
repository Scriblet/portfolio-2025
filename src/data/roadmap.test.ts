import { describe, expect, it } from 'vitest';
import { roadmapGroups, roadmapStats, roadmapWaves } from './roadmap';

describe('roadmap data', () => {
  const groups = roadmapGroups();
  const allWaves = [
    ...groups.activeWaves,
    ...groups.upcomingWaves,
    ...groups.shippedWaves,
  ];

  it('distribui cada onda em exatamente uma faixa', () => {
    expect(allWaves).toHaveLength(roadmapWaves.length);
    expect(new Set(allWaves.map((wave) => wave.id)).size).toBe(
      roadmapWaves.length,
    );
  });

  it('mantém o status das ondas coerente com a faixa', () => {
    for (const wave of groups.activeWaves) {
      expect(wave.status).toBe('in-progress');
    }
    for (const wave of groups.upcomingWaves) {
      expect(wave.status).toBe('pending');
    }
    for (const wave of groups.shippedWaves) {
      expect(wave.status).toBe('done');
    }
  });

  it('não mistura itens concluídos na faixa "a seguir"', () => {
    for (const wave of groups.upcomingWaves) {
      for (const item of wave.items) {
        expect(item.status).toBe('pending');
      }
    }
  });

  it('não tem PRDs inacabados em ondas entregues', () => {
    for (const wave of groups.shippedWaves) {
      for (const item of wave.items) {
        expect(item.issuesDone).toBe(item.issuesTotal);
      }
    }
  });

  it('soma os mesmos totais de issues do roadmapStats', () => {
    const stats = roadmapStats();
    const { active, upcoming, shipped } = groups;

    expect(active.issuesTotal + upcoming.issuesTotal + shipped.issuesTotal).toBe(
      stats.issuesTotal,
    );
    expect(active.issuesDone + upcoming.issuesDone + shipped.issuesDone).toBe(
      stats.issuesDone,
    );
  });

  it('conta PRDs abertos apenas entre os não concluídos', () => {
    const openItems = roadmapWaves
      .flatMap((wave) => wave.items)
      .filter((item) => item.status !== 'done');

    expect(groups.active.openPrds + groups.upcoming.openPrds).toBe(
      openItems.length,
    );
  });
});
