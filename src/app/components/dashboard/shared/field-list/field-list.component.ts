import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Field } from 'src/app/interfaces/field';

@Component({
  selector: 'app-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.scss']
})
export class FieldListComponent implements OnInit {
  @Input() listArray: Field[] = [];
  @Input() listActiveIndex: number | null = null;
  @Output() buttonAddClickFunc = new EventEmitter<number>();
  @Output() buttonEditClickFunc = new EventEmitter<number>();
  @Output() buttonDeleteClickFunc = new EventEmitter<number>();
  viewIcon: string = '../../../../assets/icons/view.svg';
  editIcon: string = '../../../../assets/icons/edit.svg';
  deleteIcon: string = '../../../../assets/icons/delete.svg';
  buttonAddFieldText: string = 'Add field';
  buttonAddFieldType: string = 'Primary';
  buttonAddFieldHTMLType: string = 'button';

  buttonEditClickIndex(i: number): void {
    this.buttonEditClickFunc.emit(i);
  }
  
  buttonDeleteClickIndex(i: number): void {
    this.buttonDeleteClickFunc.emit(i);
  }

  buttonAddClick(): void {
    this.buttonAddClickFunc.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
