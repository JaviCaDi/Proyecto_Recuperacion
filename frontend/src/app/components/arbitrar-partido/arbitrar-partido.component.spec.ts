import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbitrarPartidoComponent } from './arbitrar-partido.component';

describe('ArbitrarPartidoComponent', () => {
  let component: ArbitrarPartidoComponent;
  let fixture: ComponentFixture<ArbitrarPartidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbitrarPartidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArbitrarPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
