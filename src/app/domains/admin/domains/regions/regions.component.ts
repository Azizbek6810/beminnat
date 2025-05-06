import { Component, OnInit, inject, signal } from '@angular/core';
import { RegionsService } from './common/regions.service';
import { DITokens } from '../../../../core/utils/di.tokens';
import { BaseService } from '../../../../core/services/base.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RegionRequest, RegionResponse } from './common/regions.model';
import { markAsDirty } from '../../../../core/utils/util';
import { GridComponent } from '../../shared/grid/grid.component';
import { GridService } from '../../shared/grid/common/grid.service';
import { IColumn } from '../../shared/grid/common/column.models';

@Component({
  selector: 'app-regions',
  imports: [GridComponent],
  templateUrl: './regions.component.html',
  styleUrl: './regions.component.scss',
  providers: [
    { provide: DITokens.API_ENDPOINT, useValue: 'http://localhost:4200' },
    { provide: GridService, useClass: RegionsService },
    RegionsService,
    BaseService,
  ],
})
export default class RegionsComponent {
  readonly columns: IColumn[] = [
    {
      field: 'id',
      header: 'ID',
    },
    {
      field: 'name',
      header: 'Name',
    },
    {
      field: 'code',
      header: 'Code',
    },
    {
      field: 'country.name',
      header: 'Country',
    },
  ];
}
