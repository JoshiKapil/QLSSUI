export interface Trainer {
  trainerId?: number | string;
  name: string;
  mobile: string;
  email: string;
  address?: string;
  company?: string;
  isActive?: boolean;
}
