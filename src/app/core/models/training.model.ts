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
  preTestId?: number | string | null;
  postTestId?: number | string | null;
  chalangeTestId?: number | string | null;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
