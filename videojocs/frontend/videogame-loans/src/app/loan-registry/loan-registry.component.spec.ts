import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRegistryComponent } from './loan-registry.component';

describe('LoanRegistryComponent', () => {
  let component: LoanRegistryComponent;
  let fixture: ComponentFixture<LoanRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanRegistryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
