import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { ChangeDetectionStrategy } from '@angular/core';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let checkboxElement: HTMLInputElement;
  let titleElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoComponent ]
    })
    .overrideComponent(TodoComponent, {
        set: {  changeDetection: ChangeDetectionStrategy.Default  }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    checkboxElement = fixture.debugElement.nativeElement.querySelector('input');
    titleElement = fixture.nativeElement.querySelector('.todo-title');
    component.todo = { id: '123', title: 'test', isCompleted: false };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display todo', () => {
      expect(titleElement.innerText.trim()).toEqual('test');
  })

  it('should display a unchecked checkbox', () => {
      expect(checkboxElement.checked).toBe(false);
  })

  it('should display a checked checkbox', () => {
    component.todo = { id: '123', title: 'test', isCompleted: true };
    fixture.detectChanges();    
    expect(checkboxElement.checked).toBe(true);
  })

  it('should not have the CSS class "completed" when Todo is not completed', () => {      
    expect(titleElement.classList).not.toContain('completed');
  })

  it('should not have the CSS class "completed" when Todo is completed', () => {
    component.todo = { id: '123', title: 'test', isCompleted: true };
    fixture.detectChanges();      
    expect(titleElement.classList).toContain('completed');
  })

  it('should emit "remove" with the Todo Id on the button click', () => {
    const buttonElement: HTMLElement = fixture.debugElement.nativeElement.querySelector('button');
    let idToRemove: string;
    component.remove.subscribe(response => idToRemove = response);
    buttonElement.click();
    expect(idToRemove).toBe('123');
  });

  it('should emit "markComplete" with toggle checked on the checkbox click', () => {
    let isCompleted: boolean;
    component.markComplete.subscribe(response => isCompleted = response);
    checkboxElement.click();
    expect(isCompleted).toBe(!component.todo.isCompleted);
  });
});
