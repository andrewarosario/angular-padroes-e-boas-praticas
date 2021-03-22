import { AbstractControl } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

export function formChangesUntilDestroyed(
  component: any,
  form: AbstractControl
): Observable<any> {
  return form.valueChanges.pipe(untilDestroyed(component));
}
