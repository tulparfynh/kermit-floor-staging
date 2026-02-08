export type ConsentDecision = 'accepted' | 'rejected';

export interface ConsentState {
  decision: ConsentDecision;
  decidedAt: string;
  version: number;
}

