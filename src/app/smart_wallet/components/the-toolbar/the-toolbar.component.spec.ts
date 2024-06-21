import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheToolbarComponent } from './the-toolbar.component';

describe('TheToolbarComponent', () => {
  let component: TheToolbarComponent;
  let fixture: ComponentFixture<TheToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TheToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
