import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './add-edit-user/add-user.component';
import { UsersService } from './services/users.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["id", "nome", "sobrenome", "email", "dataNasc", "genero", "educacao", "empresa", "experiencia", "cidade", "excluir"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllUsers();
  }

  constructor(private dialog: MatDialog, private service: UsersService, private coreService: CoreService) { }


  openAddEditUserForm() {
    const dialogRef = this.dialog.open(AddUserComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllUsers();
        }
      }
    });
  }

  getAllUsers() {
    this.service.getAllUsers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.dataSource.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log

    });
  }

  // ngAfterViewInit(){
  //   // this.dataSource = new MatTableDataSource();
  //   // this.dataSource.paginator = this.paginator;
  // }

  deletarUsuario(id: number) {
    if (confirm('Você deseja mesmo excluir esse usuário? Está ação é irreversível'))
      this.service.deleteUsuario(id).subscribe({
        next: (res) => {
          this.coreService.openSnackBar('Usuário deletado com sucesso!', 'Pronto')
          setTimeout(() => {
            window.location.reload()
          }, 2501);
        },
        error: console.log
      })
  }

  editUsuario(data: any) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllUsers();
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



