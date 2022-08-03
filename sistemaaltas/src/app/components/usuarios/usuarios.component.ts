import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { CustomToastComponent } from '../custom-toast/custom-toast.component';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {

  tituloModal = '';
  accionModal = ''; 

  estados!: any;
  estadoActual!: number;
  ciudades!: any;
  usuarioTipos!: any;

  mensaje = '';
  form: FormGroup;
  usuarios!: any;

  displayedColumns: string[] = ['Id', 'Usuario', 'Nombre', 'Dirección', 'Teléfono', 'Codigo Postal','Tipo Usuario','Estado','Ciudad'];
  dataSource = new MatTableDataSource<any>(this.usuarios);
  clickedRows = new Array<any>();

  constructor(private fb: FormBuilder, private apiService: ApiService, public loginService: LoginService, private toast: ToastrService) {
    this.form = fb.group({
      idUsuario: [{value: 0, disabled: true}],
      cUsuario: ['',[Validators.required, Validators.maxLength(16)]],
      contrasena: ['',[Validators.required, Validators.maxLength(16)]],
      confirmarContrasena: ['',[Validators.required, Validators.maxLength(16)]],
      nombre: ['',[Validators.required, Validators.maxLength(45)]],
      direccion: ['',[Validators.required, Validators.maxLength(60)]],
      telefono: [0,[Validators.required, Validators.maxLength(12)]],
      codigoPostal: [0,[Validators.required, Validators.maxLength(10)]],
      tipoUsuario: ['',[Validators.required]],
      estado: ['',[Validators.required]],
      ciudad: ['',[Validators.required]]
    })
    if(loginService.tipoUsuario == 1){
      this.displayedColumns.push('Editar');
      this.displayedColumns.push('Eliminar');
    }
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.paginator._intl.lastPageLabel = '';
    this.paginator._intl.firstPageLabel = '';
    this.paginator._intl.nextPageLabel = '';
    this.paginator._intl.previousPageLabel = '';
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){    
    this.apiService.get('usuarios').subscribe(data => {
      this.usuarios = data;
      this.dataSource = new MatTableDataSource<any>(this.usuarios);
      this.dataSource.paginator = this.paginator;
    }, error => {
      this.toast.error('Error al consultar los usuarios');
    }, () => {
      if(this.estados === undefined)
      this.obtenerEstados();
    });
  }

  obtenerEstados(){
    this.apiService.get('estados').subscribe(data => {
      this.estados = data;
    }, error => {
      this.toast.error('Error al consultar los estados');
    }, () => {
      this.obtenerUsuarioTipos();
    });
  }

  obtenerCiudades(){
    let estado = this.form.get('estado')?.value;
    let ciudad = this.form.get('ciudad')?.value;
    if(estado > 0 && (estado != this.estadoActual)){
      this.apiService.get('ciudades/' + estado).subscribe(data => {
        this.ciudades = data;
        this.estadoActual = estado;
      }, error =>{
        this.toast.error('Error al consultar las ciudades');
      }, () => {
        if(this.accionModal == 'editar'){
          this.form.get('ciudad')?.setValue(ciudad);
        }
      });
    }
  }

  obtenerUsuarioTipos(){
    this.apiService.get('usuariotipos').subscribe(data => {
      this.usuarioTipos = data;
    }, error => {
      this.toast.error('Error al consultar los tipos de usuarios');
    });
  }  

  agregarUsuario(){
    this.accionModal = 'agregar';
    this.tituloModal = 'Agregando nuevo usuario';
    this.form.reset();
    this.form.patchValue({
      idUsuario: 0,
      tipoUsuario: 0,
      estado: 0,
      ciudad: 0
    })
  }

  editarUsuario(usuario : any){
    this.accionModal = 'editar';
    this.tituloModal = 'Modificando al usuario: ' + usuario.nombre;    
    this.form.patchValue({
      idUsuario: usuario.idUsuario,
      cUsuario: usuario.cUsuario,
      nombre: usuario.nombre,
      direccion: usuario.direccion,
      telefono: usuario.telefono,
      codigoPostal: usuario.codigoPostal,
      tipoUsuario: usuario.tipoUsuario,
      estado: usuario.estado,
      ciudad: usuario.ciudad,
      contrasena: '1',
      confirmarContrasena: '1'
    })
    this.obtenerCiudades();
  }

  guardarBtn(){
    if(this.accionModal == 'agregar')
    this.guardarUsuario();
    else
    this.actualizarUsuario();
  }

  guardarUsuario(){
    let exito = false;
    let usuarioExistente = 0;
    this.valoresPorDefecto();
    this.usuarios.forEach((usuario: any) => {
      if(this.form.get('cUsuario')?.value == usuario.cUsuario)
      usuarioExistente += 1;
    });
    if(usuarioExistente == 0){
      this.apiService.post('usuarios',this.form.getRawValue()).subscribe((data: any) => {
      exito = data.exito;
      if(exito){
        this.toast.success(data.mensaje, 'Agregando usuario');
        this.obtenerEstados();
      }
    }, error => {
      this.toast.error('Error al agregar el usuario, intentelo de nuevo más tarde');
    }, () => {
      if(exito){ 
        this.obtenerUsuarios();
      }
    });
    }else{
      this.toast.error('Error al agregar el usuario, usuario existente');
    }
  }

  actualizarUsuario(){
    let exito = false;
    let usuarioExistente = 0;
    this.valoresPorDefecto();
    this.usuarios.forEach((usuario: any) => {
      if(this.form.get('cUsuario')?.value == usuario.cUsuario)
      usuarioExistente += 1;
    });
    if(usuarioExistente == 0){
      this.apiService.put('usuarios',this.form.getRawValue()).subscribe((data: any) => {
      exito = data.exito;
      if(exito){
        this.toast.info(data.mensaje, 'Actualizando usuario');
        this.obtenerEstados();
      }
    }, error => {
      this.toast.error('Error al actualizar el usuario, intentelo de nuevo más tarde');
    }, () => {
      if(exito){
        this.obtenerUsuarios();
      }
    });
    }else{
      this.toast.error('Error al actualizar el usuario, usuario existente');
    }    
  }

  confirmarEliminarUsuario(idUsuario: number){
    this.toast.clear();
    let modal = document.getElementById('mod');
    modal!.style.display = "block";
    this.toast.show('¿Seguro que desea eliminar el centro?','Eliminar registro',{
      disableTimeOut: true,
      toastClass: '',
      tapToDismiss: false,
      closeButton: false,
      // @ts-ignore
      buttons: CustomToastComponent.toastButtons,
      toastComponent: CustomToastComponent
    })
    .onAction.subscribe(x => {
      setTimeout(() => {
        if(x.id == '1'){
          this.eliminarUsuario(idUsuario);
        }else{                  
          this.toast.error(x.message)
        }                  
      }, 100);
      modal!.style.display = "none";
    })  
  }

  eliminarUsuario(idUsuario: number){
    let exito = false;
    this.apiService.delete('usuarios',idUsuario).subscribe((data: any) => {
      exito = data.exito;
      if(exito){
        this.toast.error(data.mensaje, 'Eliminando usuario');
        this.obtenerEstados();
      }
    }, error => {
      this.toast.error('Error al eliminar el usuario, intentelo de nuevo más tarde');
    }, () => {
      if(exito){
        this.obtenerUsuarios();
      }
    });
  }

  valoresPorDefecto(){
    if(this.form.get('tipoUsuario')?.value == '0')
    this.form.get('tipoUsuario')?.setValue('3');
    if(this.form.get('estado')?.value == '0')
    this.form.get('estado')?.setValue('1');
    if(this.form.get('ciudad')?.value == '0')
    this.form.get('ciudad')?.setValue('1');
  }
}
