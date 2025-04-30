import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CategoryService } from './common/category.service';
import { CategoryResponse } from './common/category.model';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { TranslocoPipe } from '@jsverse/transloco';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { markAsDirty } from '../../../../core/utils/util';

@Component({
  selector: 'app-category',
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
  ],
  providers: [CategoryService],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoryComponent implements OnInit {
  private $category = inject(CategoryService);
  private $cdr = inject(ChangeDetectorRef);
  private $fb = inject(FormBuilder);
  data$!: Observable<CategoryResponse[]>;
  data = signal<CategoryResponse[]>([]);
  isVisible = false;
  editingDataId: number = -1;

  // category: CategoryResponse[] = [];
  // data = toSignal(this.$category.getCategory())

  get isEditing() {
    return this.editingDataId > 0;
  }

  form = this.$fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    // this.data$ = this.$category.getCategory();
    this.$category.getCategories().subscribe((res) => {
      this.data.set(res);
    });

    // this.$category.getCategory().subscribe((res) => {
    //   this.category = res as CategoryResponse[];
    // });
  }

  delete(id: number) {
    this.$category.deleteCategory(id).subscribe((res) => {
      if (res) {
        this.data.update((prev) => {
          return prev.filter((item) => +item.id !== id);
        });
        // this.data$ = this.data$.pipe(
        //   map((d) => {
        //     return d.filter((item) => +item.id !== id);
        //   }),
        // );
        // this.$cdr.markForCheck();
      }
    });
    // this.$category.deleteCategory(id).subscribe((res) => {
    //   if (res) {
    //     this.getAll();
    //   }
    // });
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

  handleEdit(item: CategoryResponse) {
    this.editingDataId = +item.id;
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
    value: Partial<{ name: string | null; description: string | null }>,
  ) {
    this.$category.createCategory(value).subscribe((res) => {
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
    value: Partial<{ name: string | null; description: string | null }>,
  ) {
    this.$category
      .updateCategory(this.editingDataId, value)
      .subscribe((res: CategoryResponse) => {
        if (res) {
          const editingData = this.data().find((i) => i.id === res.id);
          if (editingData) {
            editingData.name = res.name;
            editingData.description = res.description;

            // this.data.update(()=>{
            //   return [...this.data().filter(s=>s.id !== res.id), editingData]
            // })
          }
          this.closeModal();
        }
      });
  }
}
