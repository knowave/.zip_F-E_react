export interface FetchApartmentQuery {
  page: number;
  take: number;
  supplyAreaName?: string;
  startDate?: Date;
  endDate?: Date;
}
