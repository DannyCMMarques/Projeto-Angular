import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessaoContainerComponent } from './sessao-container.component';

describe('SessaoContainerComponent', () => {
  let component: SessaoContainerComponent;
  let fixture: ComponentFixture<SessaoContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessaoContainerComponent]
    });
    fixture = TestBed.createComponent(SessaoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
