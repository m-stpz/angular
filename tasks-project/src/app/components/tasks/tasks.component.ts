import { Component, inject, signal } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Task } from '../../types/task.type';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [
    TaskItemComponent,
    ModalComponent,
    // ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  private readonly tasksService = inject(TasksService);
  tasks = this.tasksService.tasks;
  private fb = inject(FormBuilder); // fb = formBuilder

  editForm = this.fb.group({
    text: ['', [Validators.required]],
    day: ['', [Validators.required]],
    reminder: [false],
  });

  // parent holds the truth of which tasks is being edited
  selectedTask = signal<Task | null>(null);

  openEditModal(task: Task) {
    this.selectedTask.set(task);
    this.editForm.patchValue(task);
  }

  onCloseModal() {
    this.selectedTask.set(null);
  }

  // since the modal is just a shell, the editing lives within the tasks
  onSave() {
    if (this.editForm.invalid) {
      return;
    }

    const original = this.selectedTask();
    const updatedTask = { ...original, ...this.editForm.value } as Task;

    this.tasksService.updateTask(updatedTask);
    this.onCloseModal();
  }
}
