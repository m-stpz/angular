import { Component, inject, signal } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Task } from '../../types/task.type';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-tasks',
  imports: [
    TaskItemComponent,
    ModalComponent,
    ReactiveFormsModule,
    ButtonComponent,
    NgStyle,
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
  showModal = signal(false);

  onDeleteTask(id: Task['id']) {
    this.tasksService.deleteTask(id);
  }

  onToggleReminder(id: Task['id']) {
    this.tasksService.toggleTaskReminder(id);
  }

  openCreateModal() {
    this.selectedTask.set(null);
    this.editForm.reset();
    this.showModal.set(true);
  }

  openEditModal(task: Task) {
    this.selectedTask.set(task);
    this.editForm.patchValue(task);
    this.showModal.set(true);
  }

  // since the modal is just a shell, the editing lives within the tasks
  onSave() {
    if (this.editForm.invalid) {
      return;
    }

    const formData = this.editForm.value as Task;

    if (this.selectedTask()) {
      // edit mode
      const original = this.selectedTask();
      const updatedTask = { ...original, ...formData } as Task;
      this.tasksService.updateTask(updatedTask);
    } else {
      // create
      this.tasksService.createTask(formData);
    }

    this.onCloseModal();
  }

  onCloseModal() {
    this.showModal.set(false);
    this.selectedTask.set(null);
  }
}
