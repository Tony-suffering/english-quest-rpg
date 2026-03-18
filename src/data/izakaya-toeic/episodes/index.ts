import ep001 from './ep-001';
import ep002 from './ep-002';
import ep003 from './ep-003';
import ep004 from './ep-004';
import ep005 from './ep-005';
import ep006 from './ep-006';
import ep007 from './ep-007';
import ep008 from './ep-008';
import ep009 from './ep-009';
import ep010 from './ep-010';
import ep011 from './ep-011';
import ep012 from './ep-012';
import ep013 from './ep-013';
import ep014 from './ep-014';
import ep015 from './ep-015';
import ep016 from './ep-016';
import ep017 from './ep-017';
import ep018 from './ep-018';
import ep019 from './ep-019';
import ep020 from './ep-020';
import { IzakayaEpisode } from '../types';

export const EPISODES: IzakayaEpisode[] = [
  ep001, ep002, ep003, ep004, ep005,  // Part 2 基礎
  ep006, ep007, ep008,                // Part 3 基礎
  ep009, ep010,                       // Part 2 応用
  ep011, ep012,                       // Part 3 応用 & Part 4 入門
  ep013, ep014, ep015, ep016,         // 意図問題・模試・先読み・留守電
  ep017, ep018, ep019, ep020,         // グラフィック・アナウンス・800点突破・マスターの秘密
];

export const EPISODE_MAP = Object.fromEntries(
  EPISODES.map(ep => [ep.id, ep])
) as Record<string, IzakayaEpisode>;

export function getEpisode(id: string): IzakayaEpisode | undefined {
  return EPISODE_MAP[id];
}

export function getNextEpisode(currentId: string): IzakayaEpisode | undefined {
  const current = EPISODE_MAP[currentId];
  if (!current?.nextEpisodeId) return undefined;
  return EPISODE_MAP[current.nextEpisodeId];
}

export function getPreviousEpisode(currentId: string): IzakayaEpisode | undefined {
  const current = EPISODE_MAP[currentId];
  if (!current?.previousEpisodeId) return undefined;
  return EPISODE_MAP[current.previousEpisodeId];
}
