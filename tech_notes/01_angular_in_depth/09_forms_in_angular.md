# Forms in Angular

- There are 2 possibilities: Reactive vs. Template-Driven
- Most professionals prefer Reactive forms because they are more scalable and easier to test

| Feature         | Reactive                     | Template-driven               |
| --------------- | ---------------------------- | ----------------------------- |
| Source of truth | TS/code                      | HTML/template                 |
| data flow       | sync                         | async                         |
| validation      | functions in ts              | directives in html `required` |
| complexity      | good for large/complex forms | better for simple ones        |

## Building blocks

- `FormControl`: tracks value and validation of a single input
- `FormGroup`: a group of `FormControls`
- `FormBuilder`: A helper service to help creating groups and controls

## Reactive Forms (Modern)

- Import `ReactiveFormsModule` in the standalone component

### Step 1: Define the forms on the component

```ts
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";

@Component({
  //   ...
  imports: [
    // ...
    ReactiveFormsModule,
  ],
})
export class ProfileComponent {
  profileForm = new FormGroup({
    // kind of similar to zod
    firstName: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
  });

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    }
  }
}
```

### Step 2: Bind to the HTML

```html
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
  <label>First name</label>
  <input formControlName="firstName" />

  <label>Email</label>
  <input formControlName="email" />

  <button type="submit" [disabled]="profile.invalid">Submit</button>
</form>
```

### Step 3: Validation

- `FormControl` offers:
  - `touched`: user clicked in and out of the field
  - `dirty`: user changed the value
  - `invalid`: value fails validation

```html
@if (profileForm.get("email")?.invalid && profileForm.get("email")?.touched) {
<span class="error">Enter a valid email</span>
}
```
