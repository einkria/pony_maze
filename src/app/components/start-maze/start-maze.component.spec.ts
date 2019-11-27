import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartMazeComponent } from './start-maze.component';

describe('StartMazeComponent', () => {
  let component: StartMazeComponent;
  let fixture: ComponentFixture<StartMazeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartMazeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartMazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
