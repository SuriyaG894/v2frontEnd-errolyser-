import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewErrorComponent } from './add-new-error.component';

describe('AddNewErrorComponent', () => {
  let component: AddNewErrorComponent;
  let fixture: ComponentFixture<AddNewErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
