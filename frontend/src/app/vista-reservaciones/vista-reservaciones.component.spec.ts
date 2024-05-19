import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaReservacionesComponent } from './vista-reservaciones.component';

describe('VistaReservacionesComponent', () => {
  let component: VistaReservacionesComponent;
  let fixture: ComponentFixture<VistaReservacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaReservacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaReservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
