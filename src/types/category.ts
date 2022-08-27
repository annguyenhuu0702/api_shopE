export interface category {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  name: string;
  description: string;
  isDisplayedOnHeader: boolean;
  slug: string;
  thumbnail: string;
  categoryTypeId: number | null;
  categoryType?: any;
  parentId?: number | null;
  parent?: any;
  children?: any;
  productCategories?: any;
}

export interface categoryDto {
  thumbnail?: string;
  slug: string;
  title: string;
  name: string;
  description: string;
  isDisplayedOnHeader: boolean;
  categoryTypeId: number;
  parentId?: number | null;
}
