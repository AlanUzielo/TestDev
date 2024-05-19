import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaSalasComponent } from './vista-salas.component';

describe('VistaSalasComponent', () => {
  let component: VistaSalasComponent;
  let fixture: ComponentFixture<VistaSalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaSalasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaSalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
