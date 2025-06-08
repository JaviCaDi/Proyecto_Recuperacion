import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionArbitrosComponent } from './gestion-arbitros.component';

describe('GestionArbitrosComponent', () => {
  let component: GestionArbitrosComponent;
  let fixture: ComponentFixture<GestionArbitrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionArbitrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionArbitrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
