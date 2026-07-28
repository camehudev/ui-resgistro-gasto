import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { inject, OnInit } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, TableModule, ButtonModule, DialogModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})

export class UsuarioComponent implements OnInit {

  private usuarioService = inject(UsuarioService);
  private fb = inject(FormBuilder);

  usuarios: Usuario[] = [];
  usuarioForm!: FormGroup;
  modoEdicao = false;
  idUsuarioEmEdicao: number | null = null;
  dialogUserVisible: boolean = false;

  ngOnInit(): void {

    this.usuarioForm = new FormGroup({
        nome: new FormControl<string | null>(null),
        email: new FormControl<string | null>(null),
        senha: new FormControl<string | null>(null)
    });

    this.inicializarFormulario();
    this.carregarUsuarios();
  }

  inicializarFormulario(): void {
    this.usuarioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  carregarUsuarios(): void {
    this.usuarioService.listar().subscribe({
      next: (dados) => this.usuarios = dados,
      error: (err) => console.error('Erro ao carregar usuários:', err)
    });
  }

  salvar(): void {
    if (this.usuarioForm.invalid) return;

    const usuario: Usuario = this.usuarioForm.value;

    if (this.modoEdicao && this.idUsuarioEmEdicao) {
      usuario.id = this.idUsuarioEmEdicao;
    }

    this.usuarioService.salvar(usuario).subscribe({
      next: () => {
        this.carregarUsuarios();
        this.resetarFormulario();
      },
      error: (err) => console.error('Erro ao salvar usuário:', err)
    });
  }

  editar(usuario: Usuario): void {
    this.modoEdicao = true;
    this.idUsuarioEmEdicao = usuario.id ?? null;
    this.usuarioForm.patchValue({
      nome: usuario.nome,
      email: usuario.email,
      senha: '' // Por segurança, não preenchemos a senha ao editar
    });
  }

  deletar(id: number | undefined): void {
    if (!id) return;
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.usuarioService.deletar(id).subscribe({
        next: () => this.carregarUsuarios(),
        error: (err) => console.error('Erro ao deletar usuário:', err)
      });
    }
  }

  resetarFormulario(): void {
    this.usuarioForm.reset();
    this.modoEdicao = false;
    this.idUsuarioEmEdicao = null;
  }

  showDialogUser(){
    this.dialogUserVisible = true;
  }
}
