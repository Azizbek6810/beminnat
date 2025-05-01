import { Component } from '@angular/core';
import { RegionsService } from './common/regions.service';
import { HttpClient } from '@angular/common/http';
import { DITokens } from '../../../../core/utils/di.tokens';
import { BaseService } from '../../../../core/services/base.service';

@Component({
  selector: 'app-regions',
  imports: [],
  templateUrl: './regions.component.html',
  styleUrl: './regions.component.scss',
  providers: [
    { provide: DITokens.API_ENDPOINT, useValue: 'http://localhost:4200' },
    RegionsService,
    BaseService,
  ],
})
export default class RegionsComponent {
  constructor(
    private $data: RegionsService,
  ) {
    $data.getRegions().subscribe((res) => {});
  }
}
