import { Component, OnInit, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RegionResponse } from '../../domains/regions/common/regions.model';
import { markAsDirty } from '../../../../core/utils/util';
import { GridService } from './common/grid.service';
import { IColumn } from './common/column.models';
import { DatePipe } from '@angular/common';
import { DeepValuePipe } from '../../../../core/pipes/deep-value.pipe';

@Component({
  selector: 'app-grid',
  imports: [
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzModalModule,
    TranslocoPipe,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzPopconfirmModule,
    DatePipe,
    DeepValuePipe
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent implements OnInit {
  title = input.required<string>();
  columns = input.required<IColumn[]>();

  private $data = inject(GridService);
  // private $cdr = inject(ChangeDetectorRef);
  private $fb = inject(FormBuilder);
  // data$!: Observable<CategoryResponse[]>;
  data = signal<any[]>([]);
  isVisible = false;
  editingDataId: number = -1;

  get isEditing() {
    return this.editingDataId > 0;
  }

  form = this.$fb.group({
    name: ['', Validators.required],
    code: [0, Validators.required],
  });

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.$data.getAll().subscribe((res) => {
      this.data.set(res);
    });
  }

  delete(id: number) {
    this.$data.delete(id).subscribe((res) => {
      if (res) {
        this.data.update((prev) => {
          return prev.filter((item) => item.id !== id);
        });
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      markAsDirty(this.form);
      return;
    }
    const value = this.form.value;
    if (this.isEditing) {
      this.update(value);
      return;
    }
    this.create(value);
  }

  handleCancel() {
    this.closeModal();
  }

  handleEdit(item: any) {
    this.editingDataId = item.id;
    this.form.patchValue(item);
    this.openModal();
  }

  closeModal() {
    this.isVisible = false;
    this.editingDataId = -1;
    this.form.reset();
  }

  openModal() {
    this.isVisible = true;
  }

  private create(
    value: Partial<{
      name: string | null;
      code: number | null;
    }>,
  ) {
    this.$data.create(value).subscribe((res) => {
      if (res) {
        // this.data.set([...this.data(), res])
        this.data.update((prev) => {
          return [...prev, res];
        });
        this.closeModal();
      }
    });
  }

  private update(
    value: Partial<{
      name: string | null;
      code: number | null;
    }>,
  ) {
    this.$data
      .update(this.editingDataId, value)
      .subscribe((res: RegionResponse) => {
        if (res) {
          const editingData = this.data().find((i) => i.id === res.id);
          if (editingData) {
            editingData.name = res.name;
            editingData.code = res.code;

            // this.data.update(()=>{
            //   return [...this.data().filter(s=>s.id !== res.id), editingData]
            // })
          }
          this.closeModal();
        }
      });
  }
}
