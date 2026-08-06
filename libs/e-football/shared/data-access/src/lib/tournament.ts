export interface TournamentTeam {
  readonly id: number;
  readonly country: string;
  readonly countryCode: string;
  readonly flag: string;
  readonly owner: string;
}

export const TOURNAMENT_TEAMS: readonly TournamentTeam[] = [
  {
    id: 1,
    country: 'Portugal',
    countryCode: 'POR',
    flag: '🇵🇹',
    owner: 'SK',
  },
  {
    id: 2,
    country: 'Brazil',
    countryCode: 'BRA',
    flag: '🇧🇷',
    owner: 'Vivek',
  },
  {
    id: 3,
    country: 'England',
    countryCode: 'ENG',
    flag:
      '\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}',
    owner: 'Dipin',
  },
  {
    id: 4,
    country: 'Spain',
    countryCode: 'ESP',
    flag: '🇪🇸',
    owner: 'Ram',
  },
  {
    id: 5,
    country: 'Argentina',
    countryCode: 'ARG',
    flag: '🇦🇷',
    owner: 'Calvin',
  },
  {
    id: 6,
    country: 'Croatia',
    countryCode: 'CRO',
    flag: '🇭🇷',
    owner: 'Jithin',
  },
  {
    id: 7,
    country: 'France',
    countryCode: 'FRA',
    flag: '🇫🇷',
    owner: 'Abhijith',
  },
  {
    id: 8,
    country: 'Mexico',
    countryCode: 'MEX',
    flag: '🇲🇽',
    owner: 'Suhail',
  },
];
