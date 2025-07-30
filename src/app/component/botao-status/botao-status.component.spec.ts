import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoStatusComponent } from './botao-status.component';

describe('BotaoStatusComponent', () => {
  let component: BotaoStatusComponent;
  let fixture: ComponentFixture<BotaoStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotaoStatusComponent]
    });
    fixture = TestBed.createComponent(BotaoStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
