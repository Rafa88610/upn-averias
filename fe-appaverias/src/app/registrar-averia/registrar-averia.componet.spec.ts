import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAveriaComponent } from './registrar-averia.component';

describe('LoginComponent', () => {
  let component: RegistrarAveriaComponent;
  let fixture: ComponentFixture<RegistrarAveriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarAveriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarAveriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
