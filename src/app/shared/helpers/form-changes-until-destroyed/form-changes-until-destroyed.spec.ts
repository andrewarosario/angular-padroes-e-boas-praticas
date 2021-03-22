import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { finalize } from 'rxjs/operators';
import { formChangesUntilDestroyed } from './form-changes-until-destroyed';

describe('formChangesUntilDestroyed', () => {
  it('should unsubscribe from the component form', () => {
    @UntilDestroy()
    @Component({ template: '' })
    class MockComponent {
      disposed = false;
      form = new FormControl('');

      subscription = formChangesUntilDestroyed(this, this.form)
        .pipe(
          finalize(() => this.disposed = true)
        )
        .subscribe();
    }

    TestBed.configureTestingModule({
      declarations: [MockComponent]
    });

    const fixture = TestBed.createComponent(MockComponent);

    expect(fixture.componentInstance.disposed).toBeFalsy();
    fixture.destroy();
    expect(fixture.componentInstance.disposed).toBeTruthy();
  });
});
