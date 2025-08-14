import { Component, OnInit, OnDestroy } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../listado-dispositivos/dispositivo';
import { Router } from '@angular/router';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonToolbar, IonHeader, IonTitle, IonItem, IonAvatar, IonIcon, IonLabel, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { leaf, restaurant, flower, home, bed, hardwareChip } from 'ionicons/icons';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonList,
    IonItem,
    IonAvatar,
    IonIcon,
    IonLabel,
    IonButton,
    CommonModule,
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class HomePage implements OnInit {
  dispositivos: any[] = []; // Para almacenar dispositivos
  private sub!: Subscription;

  constructor(
    private dispositivoService: DispositivoService, // Servicio para cargar dispositivos
    private router: Router 
  ) {}

  // Método que se ejecuta al inicializar el componente
  async ngOnInit() {
    try {
      const dispositivos = await this.dispositivoService.getDispositivos();
  
      // Para cada dispositivo, traemos la última medición y estado de válvula
      this.dispositivos = await Promise.all(
        dispositivos.map(async (d: Dispositivo) => {
          let medicionActual = '—';
          let estadoValvula = null;
  
          try {
            const mediciones = await this.dispositivoService.getMediciones(d.dispositivoId);
            medicionActual = mediciones.length > 0 ? mediciones[0].valor : '—';
          } catch (err) {
            console.error(`Error cargando mediciones para dispositivo ${d.dispositivoId}`, err);
          }
  
          try {
            const estadoResponse = await this.dispositivoService.getEstadoValvula(d.dispositivoId);
            estadoValvula = estadoResponse.estado; // true o false
          } catch (err) {
            console.error(`Error cargando estado válvula para dispositivo ${d.dispositivoId}`, err);
          }
  
          return { 
            ...d, 
            medicionActual, 
            estadoValvula 
          };
        })
      );
      this.sub = this.dispositivoService.valveState$.subscribe(change => {
        if (change) {
          this.dispositivos = this.dispositivos.map(d =>
            d.dispositivoId === change.id
              ? { ...d, estadoValvula: change.estado }
              : d
          );
        }
      });
    } 
    catch (error) {
      console.error('Error al cargar dispositivos:', error);
    }
  }

  async ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe(); // 👈 Aquí cerramos la suscripción
    }
  }

  // Encender todos los dispositivos
async encenderTodos() {
  try {
    await Promise.all(
      this.dispositivos.map(async (d) => {
        try {
          await this.dispositivoService.abrirValvula(d.dispositivoId);
          d.estadoValvula = true; // Actualiza localmente
        } catch (err) {
          console.error(`Error encendiendo válvula ${d.dispositivoId}`, err);
        }
      })
    );
  } catch (err) {
    console.error('Error al encender todas las válvulas', err);
  }
}

// Apagar todos los dispositivos
async apagarTodos() {
  try {
    await Promise.all(
      this.dispositivos.map(async (d) => {
        try {
          await this.dispositivoService.cerrarValvula(d.dispositivoId);
          d.estadoValvula = false; // Actualiza localmente
        } catch (err) {
          console.error(`Error apagando válvula ${d.dispositivoId}`, err);
        }
      })
    );
  } catch (err) {
    console.error('Error al apagar todas las válvulas', err);
  }
}

  

  // Método para navegar a la página de detalles de un dispositivo
  verDetalle(dispositivoId: number) {
    console.log(`Ver detalle del dispositivo: ${dispositivoId}`);
    this.router.navigate([`/dispositivo`, dispositivoId]);
  }

  verMediciones(dispositivoId: number) {
    console.log(`Ver mediciones del dispositivo: ${dispositivoId}`);
    this.router.navigate([`/dispositivo`, dispositivoId, 'mediciones']);
  }
  
}

