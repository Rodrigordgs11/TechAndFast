import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PackDetailPage } from './pack-detail.page';

describe('PackDetailPage', () => {
  let component: PackDetailPage;
  let fixture: ComponentFixture<PackDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PackDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
