import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBlogPostComponent } from './search-blog-post.component';

describe('SearchBlogPostComponent', () => {
  let component: SearchBlogPostComponent;
  let fixture: ComponentFixture<SearchBlogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBlogPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
