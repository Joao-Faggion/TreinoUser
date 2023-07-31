import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup

  educacao: string[] = [
    'Fundamental',
    'Médio',
    'Médio Completo',
    'Superior Incompleto',
    'Superior Completo',
    'Pós-Graduação'
  ]

  constructor(private builder: FormBuilder,
    private service: UsersService,
    private dialog: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService) {

    this.userForm = this.builder.group({
      nome: this.builder.control('', Validators.required),
      sobrenome: this.builder.control('', Validators.required),
      email: this.builder.control('', Validators.required),
      dataNasc: this.builder.control('', Validators.required),
      genero: this.builder.control('', Validators.required),
      educacao: this.builder.control('', Validators.required),
      empresa: this.builder.control('', Validators.required),
      experiencia: this.builder.control('', Validators.required),
      cidade: this.builder.control('', Validators.required)
    })
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      if (this.data) {
        this.service.atualizarUser(this.data.id, this.userForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Usuário alterado com sucesso!');
            this.dialog.close(true);
          },
          error: (err: any) => {
            console.log(err);
          },
        });

    } else {
      this.service.addUser(this.userForm.value).subscribe({
        next: (val: any) => {
          this.coreService.openSnackBar('Usuário adicionado com sucesso!');
          this.dialog.close(true);
        },
        error: (err: any) => {
          console.log(err);
        }
      },

      )
    }

  }
  }
  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }

}

