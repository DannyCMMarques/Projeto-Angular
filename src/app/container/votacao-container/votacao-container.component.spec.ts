import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotacaoContainerComponent } from './votacao-container.component';

describe('VotacaoContainerComponent', () => {
  let component: VotacaoContainerComponent;
  let fixture: ComponentFixture<VotacaoContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VotacaoContainerComponent]
    });
    fixture = TestBed.createComponent(VotacaoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
