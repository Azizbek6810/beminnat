import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CategoryService } from './common/category.service';
import { CategoryResponse } from './common/category.model';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-category',
  imports: [],
  providers: [CategoryService],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export default class CategoryComponent implements OnInit {
  private $category = inject(CategoryService);

  // data$ = this.$category.getCategory();

  data: CategoryResponse[] = [];
  // data = toSignal(this.$category.getCategory())

  ngOnInit(): void {
    this.$category.getCategory().subscribe((res) => {
      this.data = res as CategoryResponse[];
    });
  }
}
