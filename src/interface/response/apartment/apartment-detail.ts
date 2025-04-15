interface CommentByApartmentResponse {
  id: string;
  content: string;
  isPrivate: boolean;
  likeCount: number;
  username: string;
  createdAt: Date;
}

export interface ApartmentDetailResponse {
  contractPeriod: string;
  contractPeriodAnnouncementDate?: Date;
  contractPeriodExpiredDat?: Date;
  announcementName: string;
  announcementDate?: Date;
  announcementType: string;
  numberOfUnits: number;
  block: string;
  businessDistrict: string;
  isCapitalArea: boolean;
  monthlyRent?: number;
  leaseDeposit?: number;
  housingType: string;
  regionalOffice: string;
  totalHouseholds: number;
  viewCount: number;
  commentCount: number;
  subsidy: string;
  initialPayment: number;
  contractDeposit: number;
  midPayment: number;
  remainingBalance: number;
  likeCount: number;
  comments?: CommentByApartmentResponse[];
}
