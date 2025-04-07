import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlEvent,
  TouchedChangeEvent,
  UntypedFormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent implements OnInit {
  @Input({ required: true }) control!: AbstractControl;
  // @Input({ required: true }) form!: UntypedFormGroup;
  // @Input({ required: true }) controlName!: string;
  // get control(): AbstractControl {
  //   return this.form.get(this.controlName)!;
  // }
  constructor(private $cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // this.control.events.subscribe((event: ControlEvent) => {
    //   if (event instanceof TouchedChangeEvent) {
    //     if (event.touched) {
    //       this.$cdr.markForCheck();
    //     }
    //   }
    // });

    // this.control.valueChanges.subscribe(() => {
    //   this.$cdr.markForCheck();
    // });
  }
}
