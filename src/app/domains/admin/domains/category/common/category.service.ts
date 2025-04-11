import { Injectable, inject } from '@angular/core';
import { BaseService } from '../../../../../core/services/base.service';
import { CategoryResponse } from './category.model';

@Injectable()
export class CategoryService {
  private $base = inject(BaseService);

  getCategory(){
    return this.$base.get('category');
  }
}
