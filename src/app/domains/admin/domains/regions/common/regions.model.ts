export interface RegionRequest {
  name: string;
  code: number;
}

export interface RegionResponse extends RegionRequest {
  id: number;
  country: Country;
}

type Country = RegionResponse;
