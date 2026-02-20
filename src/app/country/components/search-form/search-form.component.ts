import { Component, inject, input, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'country-search-form',
  imports: [ReactiveFormsModule],
  templateUrl: './search-form.component.html',
  styles: ``
})
export class SearchFormComponent {
  private formBuilder = inject(FormBuilder);
  placeholder = input<string>();
  submit = output<string>();

  countryForm = this.formBuilder.group({
    search: ['']
  })

  handleSubmit() {
    if (this.countryForm.controls.search.value)
    this.submit.emit(this.countryForm.controls.search.value);
  }
}
