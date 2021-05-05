
import { Directive, Input, OnInit, Self } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime } from 'rxjs/operators';
import { SearchConfigService } from '../services/search-config.service';


@UntilDestroy()
@Directive({
  selector: '[appFormSearchStorage]'
})
export class FormSearchStorageDirective<T> implements OnInit {
  @Input() formControl: FormControl;

  constructor(
    private searchConfig: SearchConfigService<T>
  ) { }

  ngOnInit(): void {
    this.setInitialValue();
    this.listenToFormChanges();
  }

  private setInitialValue(): void {
    const initialValue = this.searchConfig.getInitialValue();
    this.formControl.patchValue(initialValue);
  }

  private listenToFormChanges(): void {
    this.formControl.valueChanges.pipe(
      debounceTime(300),
      untilDestroyed(this)
    ).subscribe(search => this.searchConfig.updateSearch(search));
  }
}
