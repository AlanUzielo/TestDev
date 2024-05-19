import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaReservacionComponent } from './vista-reservacion.component';

describe('VistaReservacionComponent', () => {
  let component: VistaReservacionComponent;
  let fixture: ComponentFixture<VistaReservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaReservacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaReservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
