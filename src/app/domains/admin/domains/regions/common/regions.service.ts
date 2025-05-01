import { Injectable, inject } from '@angular/core';
import { BaseService } from '../../../../../core/services/base.service';
import { RegionRequest, RegionResponse } from './regions.model';

@Injectable()
export class RegionsService {
  private $base = inject(BaseService);

  getRegions() {
    return this.$base.get<RegionResponse[]>('./data/regions.json');
  }

  updateRegion(id: number, data: RegionRequest) {
    return this.$base.put<RegionResponse>(`regions/${id}`, data);
  }

  createRegion(data: RegionRequest) {
    return this.$base.post<RegionResponse>(`regions`, data);
  }

  deleteRegion(id: number) {
    return this.$base.delete<RegionResponse>(`regions/${id}`);
  }
}
