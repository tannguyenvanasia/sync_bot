export const KEYWORD = {
  ASIA_GIRL: 'asia girl',
  JAPAN_GIRL: 'japan girl',
  CHINA_GIRL: 'china girl',
  VIETNAM_GIRL: 'vietnam girl',
  GOODGIRL: 'goodgirl',
} as const;

export type KeywordValue = (typeof KEYWORD)[keyof typeof KEYWORD];

export function getRandomKeyword(): KeywordValue {
  const values = Object.values(KEYWORD);
  return values[Math.floor(Math.random() * values.length)];
}
