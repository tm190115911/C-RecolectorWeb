import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoleccionEspecialComponent } from './recoleccion-especial.component';

describe('RecoleccionEspecialComponent', () => {
  let component: RecoleccionEspecialComponent;
  let fixture: ComponentFixture<RecoleccionEspecialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoleccionEspecialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoleccionEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
