# Modals in Angular

## 1. Create the shell component & layout

- The modal should be a "dumb" component. It only knows to display a box and tell the parent it's closing

```ts
@Component({
  selector: "app-modal",
  standalone: true,
  template: "./modal.component.html",
  styleUrl: "./modal.component.css",
})
export class ModalComponent {
  @Output() closeMe = new EventEmitter<void>();

  onClose() {
    this.closeMe.emit();
  }
}
```

```html
<div class="modal-backdrop" (click)="onClose()">
  <div class="modal-content" (click)="$event.stopPropagation()">
    <!-- this is like {children} -->
    <ng-content></ng-content>
  </div>
</div>
```

### ng-content (In React: {children})

- Directive that allows to send content from a parent to a child
- Useful to build reusable, dynamic components
- Acts as a placeholder in a child component's template

```html
<!-- child layout -->
<div>
  <ng-content></ng-content>
</div>
```

```html
<!-- parent html -->
<app-card>
  <p>Hello</p>
</app-card>
```

### Multiple ng-content

- It's possible to have multiple `ng-content` tags in a single component
- You can use selectors to determine which content goes where

```html
<!-- child -->
<div class="child-container">
  <header>
    <ng-content select="[header]"></ng-content>
  </header>
  <main>
    <ng-content></ng-content>
  </main>
  <footer>
    <ng-content select="[footer]"></ng-content>
  </footer>
</div>
```

```html
<!-- parent -->
<app-child>
  <div header>This is the header</div>
  <p>Main content</p>
  <div footer></div>
</app-child>
```

## 2. Manage the state (from the parent)

- The parent holds the source of truth
- It decides if the modal is open and what data is inside it using a singal

```ts
export class Parent {
  selectedItem = signal<Item | null>(null);

  openEditModal(item: Item) {
    this.selectedItem.set(item);
  }

  closeModal() {
    this.selectedItem.set(null);
  }
}
```

## 3. Trigger from the child

- The child lets the parent know when the edit button is clicked

```html
<!-- child -->
<button (click)="onEdit($event)">Edit</button>
```

## 4. Assemble in the parent

```html
@for(item of items(); track item.id) {
<!--  -->
<app-item [item]="item" (edit)="openEditModal($event)">
  <!--  -->
</app-item>
}
<!--  -->
@if(selectedTask(); as activeTask){
<!--  -->
<app-modal (closeMe)="closeModal()">
  <!-- item info -->
  <button (click)="closeModal()">Done</button>
</app-modal>
}
```

## 5. Modal styles

```css
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  min-width: 400px;
}
```
