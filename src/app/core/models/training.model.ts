export interface Training {
  trainingId?: number | string;
  trainingName: string;
  trainingDesc: string;
  topicCovered?: string;
  displayName: string;
  image: string;
  displayOrder: number;
  categoryId?: number;
  duration?: string;
  modules?: number;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
