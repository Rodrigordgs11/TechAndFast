import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientAreaPage } from './client-area.page';

describe('ClientAreaPage', () => {
  let component: ClientAreaPage;
  let fixture: ComponentFixture<ClientAreaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClientAreaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
