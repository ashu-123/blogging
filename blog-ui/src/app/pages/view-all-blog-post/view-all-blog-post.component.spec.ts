import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllBlogPostComponent } from './view-all-blog-post.component';

describe('ViewAllBlogPostComponent', () => {
  let component: ViewAllBlogPostComponent;
  let fixture: ComponentFixture<ViewAllBlogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllBlogPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAllBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
