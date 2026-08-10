export interface TrainingFeedback {
  feedbackId?: number;
  userId?: number | string;
  userName?: string;
  createdAt?: string;
  feedbackDate?: string;
  trainerId: number;
  trainingId: number;
  trainingName?: string;
  trainerName?: string;
  overallExperience: number;
  trainerKnowledge: number;
  contentPresentation: number;
  satisfaction: number;
  likedMost: string;
  suggestions: string;
  usefulness: string;
  recommend: boolean;
}
