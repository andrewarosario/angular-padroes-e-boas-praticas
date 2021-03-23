import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CardComponent } from './card.component';

@Component({
  template: `<app-card>Hello World</app-card>`,
})
class TestHostComponent {}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent, TestHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show ng-content content', () => {
    const testFixture = TestBed.createComponent(TestHostComponent);

    const de: DebugElement = testFixture.debugElement.query(By.css('fieldset'));
    const el: HTMLElement = de.nativeElement;

    expect(el.textContent).toEqual('Hello World');
  });
});
