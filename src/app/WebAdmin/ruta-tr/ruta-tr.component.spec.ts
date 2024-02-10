import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaTRComponent } from './ruta-tr.component';

describe('RutaTRComponent', () => {
  let component: RutaTRComponent;
  let fixture: ComponentFixture<RutaTRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaTRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutaTRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
