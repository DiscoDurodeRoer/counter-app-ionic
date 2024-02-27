import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';
import { By } from '@angular/platform-browser';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('change num', () => {

    const buttonUp = fixture.debugElement.query(By.css('#button-up'));
    const buttonDown = fixture.debugElement.query(By.css('#button-down'));

    buttonUp.nativeElement.click();

    expect(component.num).toBe(1);

    buttonUp.nativeElement.click();

    expect(component.num).toBe(2);

    for (let i = 0; i < 100; i++) {
      buttonUp.nativeElement.click();
    }

    expect(component.num).toBe(102);

    for (let i = 0; i < 100; i++) {
      buttonDown.nativeElement.click();
    }

    expect(component.num).toBe(2);


  });

  it('min', () => {

    const buttonUp = fixture.debugElement.query(By.css('#button-up'));

    for (let i = 0; i < component.MAX; i++) {
      buttonUp.nativeElement.click();
    }

    expect(component.num).toBe(component.MAX);

    buttonUp.nativeElement.click();

    expect(component.num).toBe(component.MAX);


  });

  it('max', () => {

    const buttonUp = fixture.debugElement.query(By.css('#button-up'));
    const buttonDown = fixture.debugElement.query(By.css('#button-down'));

    buttonUp.nativeElement.click();

    expect(component.num).toBe(1);

    buttonDown.nativeElement.click();

    buttonDown.nativeElement.click();

    expect(component.num).toBe(component.MIN);
  });
});
