
export type Page = 
  | 'landing' 
  | 'intro'
  | 'ch1_scene1'
  | 'ch1_decision'
  | 'ch2_scene1'
  | 'ch2_decision'
  | 'ch34_scene1'
  | 'ch34_decision'
  | 'ch5_scene1'
  | 'ch5_decision'
  | 'epilogue'
  | 'final'
  | 'failure'
  | 'success_feedback'; // Added success feedback state

export interface Decision {
  chapterId: string;
  selectedChoice: 'A' | 'B' | '';
  reasoningText: string;
  requiredKeywords: string[];
  keywordsFound: string[];
}

export interface DecisionLog extends Decision {
    studentId: string;
    timestamp: string;
}

export interface SuccessInfo {
    title: string;
    reason: string;
    aiFeedback: string;
    nextPage: Page;
}

export interface FailureInfo {
    title: string;
    reason: string;
    aiFeedback: string;
    returnTo: Page;
}

// For state persistence
export interface AppState {
    currentPage: Page;
    decisions: Decision[];
}
