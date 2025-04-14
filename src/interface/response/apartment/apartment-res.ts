export interface ApartmentResponse {
  id?: string;
  contractPeriod: string;
  contractPeriodAnnouncementDate?: Date;
  contractPeriodExpiredDate?: Date;
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
  //   images: ApartmentImage[];
  //   likes: Like[];
  //   comments: Comment[];
}
