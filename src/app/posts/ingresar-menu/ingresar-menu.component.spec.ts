import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarMenuComponent } from './ingresar-menu.component';

describe('IngresarMenuComponent', () => {
  let component: IngresarMenuComponent;
  let fixture: ComponentFixture<IngresarMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresarMenuComponent]
    });
    fixture = TestBed.createComponent(IngresarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
