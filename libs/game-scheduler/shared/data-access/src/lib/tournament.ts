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
    country: 'FC 26',
    countryCode: 'F26',
    flag: '⚽',
    owner: 'Weekend League',
  },
  {
    id: 2,
    country: 'Valorant',
    countryCode: 'VAL',
    flag: '🎯',
    owner: 'Tactical Night',
  },
  {
    id: 3,
    country: 'Chess',
    countryCode: 'CHS',
    flag: '♟️',
    owner: 'Rapid Arena',
  },
  {
    id: 4,
    country: 'Rocket League',
    countryCode: 'RKL',
    flag: '🚗',
    owner: 'Boost Cup',
  },
  {
    id: 5,
    country: 'Cricket',
    countryCode: 'CKT',
    flag: '🏏',
    owner: 'Powerplay Clash',
  },
  {
    id: 6,
    country: 'NBA 2K',
    countryCode: 'NBA',
    flag: '🏀',
    owner: 'Court Session',
  },
  {
    id: 7,
    country: 'Call of Duty',
    countryCode: 'COD',
    flag: '🎮',
    owner: 'Squad Queue',
  },
  {
    id: 8,
    country: 'Table Tennis',
    countryCode: 'TTN',
    flag: '🏓',
    owner: 'Office Ladder',
  },
];
