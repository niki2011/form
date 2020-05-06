import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';


import { ListCoinsComponent } from './list-coins.component';

describe('SearchComponent', () => {
  let component: ListCoinsComponent;
  let fixture: ComponentFixture<ListCoinsComponent>;

  const coins = [
    { id: '01coin', symbol: 'zoc', name: '01coin' },
    { id: '02-token', symbol: 'o2t', name: 'O2 Token' },
    { id: '0cash', symbol: 'zch', name: '0cash' }
  ];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListCoinsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCoinsComponent);
    component = fixture.componentInstance;
    component.coinsList = coins;
    component.loadMore = () => {
      component.coinsList.push({ id: '01coin', symbol: 'zoc', name: '01coin' });
    };
    fixture.detectChanges();
  });

  it('list component should create', () => {
    expect(component).toBeTruthy();
  });

  it('list component should have length 4', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('tbody').children.length).toBe(4);
  });

  it('list component should have length 5 after load more', () => {
    const compiled = fixture.nativeElement;
    // component.loadMore();
    compiled.querySelector('.load_more').click();
    fixture.detectChanges();
    expect(compiled.querySelector('tbody').children.length).toBe(5);
  });
});
