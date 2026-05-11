import { Component, effect, inject, input, output, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'country-search-form',
  imports: [ReactiveFormsModule],
  templateUrl: './search-form.component.html',
  styles: ``
})
export class SearchFormComponent {
  placeholder = input<string>();
  submit = output<string>();
  value = signal('');

  debounceTime = effect((onCleanup) => {
    const value = this.value();
    console.log('🚀 ~ SearchFormComponent ~ value:', value);
    const timeout = setTimeout(() => {
      this.submit.emit(value);
    }, 500);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
