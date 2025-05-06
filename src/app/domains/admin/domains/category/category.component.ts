import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CategoryService } from './common/category.service';
import { GridComponent } from '../../shared/grid/grid.component';
import { GridService } from '../../shared/grid/common/grid.service';
import { IColumn } from '../../shared/grid/common/column.models';

@Component({
  selector: 'app-category',
  imports: [GridComponent],
  providers: [
    CategoryService,
    {
      provide: GridService,
      useClass: CategoryService,
    },
  ],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoryComponent {
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
      field: 'description',
      header: 'Description',
    },
    {
      field: 'createdDate',
      header: 'Created date',
      type: 'date'
    },
    {
      field: 'photo',
      header: 'Photo',
      type: 'image'
    },
  ];
}
