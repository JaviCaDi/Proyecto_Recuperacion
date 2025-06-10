import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitrarComponent } from './arbitrar-partido.component';

describe('ArbitrarComponent', () => {
  let component: ArbitrarComponent;
  let fixture: ComponentFixture<ArbitrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbitrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArbitrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
