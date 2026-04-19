export interface GhostState {
  isPossessed: boolean;
  score: number;
  safeZone: boolean;
  screenTimeLeft: number; // in seconds
  activeCurse: 'none' | 'glitch' | 'fake_call' | 'latency';
}

export const MOCK_STATE: GhostState = {
  isPossessed: false,
  score: 1250,
  safeZone: true,
  screenTimeLeft: 300,
  activeCurse: 'none',
};
