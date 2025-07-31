import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsResumoComponent } from './tags-resumo.component';

describe('TagsResumoComponent', () => {
  let component: TagsResumoComponent;
  let fixture: ComponentFixture<TagsResumoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagsResumoComponent]
    });
    fixture = TestBed.createComponent(TagsResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
