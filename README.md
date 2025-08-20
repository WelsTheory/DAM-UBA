# 📱 Sistema de Monitoreo de Dispositivos IoT

## 🎯 Descripción del Proyecto
Sistema web desarrollado con Angular Ionic para el monitoreo y control de dispositivos IoT con sensores de temperatura y válvulas controlables remotamente.

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Docker
- Docker Compose

### Pasos para ejecutar el proyecto

1. **Navegar al directorio del proyecto:**
   ```bash
   cd /app-dam/
   ```

2. **Iniciar la aplicación:**
   ```bash
   docker compose up
   ```

3. **Acceder a la aplicación:**
   - Abrir navegador web
   - Ir a la URL: `http://localhost:8100`

4. **Credenciales de acceso:**
   - **Usuario:** `Test`
   - **Password:** `1234`

---

## 📖 Manual de Usuario

### 🏠 Página Principal (Home)
Una vez autenticado, será redirigido a `localhost:8100/home` donde encontrará:

![Página Principal](/app-dam/doc/img/imagen1.png)

#### Características de la página principal:
- **Visualización de 6 dispositivos** en formato de tarjetas
- Cada tarjeta muestra:
  - **Nombre del dispositivo**
  - **Ubicación**
  - **Temperatura actual**
  - **Estado visual** (imagen que cambia según el estado de la válvula)

#### Botones por dispositivo:
- **"Más Mediciones"**: Accede al historial de mediciones
- **"Detalles"**: Muestra información detallada del dispositivo

#### Controles globales:
- **"Encender Todos"**: Activa todas las válvulas simultáneamente
- **"Apagar Todos"**: Desactiva todas las válvulas simultáneamente

### 💡 Control de Válvulas

![Estados de Dispositivos](/app-dam/doc/img/imagen2.png)

- **Encender Todos**: Al presionar este botón, se encienden todas las válvulas de los dispositivos y las imágenes cambian para reflejar el estado activo
- **Apagar Todos**: Al presionar este botón, se apagan todas las válvulas y las imágenes vuelven al estado inactivo

### 📊 Página de Mediciones

![Historial de Mediciones](/app-dam/doc/img/imagen3.png)

Al presionar **"Más Mediciones"** se accede a una página que muestra:

#### Sección superior:
- **Última medición** en formato destacado y de mayor tamaño
- Valor actual de temperatura

#### Sección central:
- **Historial completo de mediciones** ordenado cronológicamente
- **Formato**: De la más reciente a la más antigua
- **Datos mostrados**: 
  - Fecha y hora de registro
  - Valor de la medición

#### Navegación:
- **Botón "Home"** en la parte inferior para regresar a la página principal

### 🔧 Página de Detalles del Dispositivo

![Detalles del Dispositivo](/app-dam/doc/img/imagen4.png)

Al presionar **"Detalles"** se accede a una vista detallada que incluye:

#### Información del dispositivo (lado izquierdo):
- **Ubicación** del dispositivo
- **Estado de la válvula** (Abierta/Cerrada)
- **Última medición registrada** con:
  - Fecha y hora
  - Valor de temperatura

#### Visualización (lado derecho):
- **Imagen del dispositivo** que refleja el estado actual de la válvula
- Cambia dinámicamente según esté activado o desactivado

#### Controles individuales:
- **"Abrir Válvula"**: 
  - Activa la válvula del dispositivo
  - Cambia la imagen al estado activo
  - Registra la acción en el historial
- **"Cerrar Válvula"**: 
  - Desactiva la válvula del dispositivo
  - Cambia la imagen al estado inactivo
  - Registra la acción en el historial

#### Navegación:
- **"Más Mediciones"**: Accede al historial de mediciones del dispositivo
- **"Home"**: Regresa a la página principal

----

## 🔄 Sistema de Generación de Datos

El backend cuenta con un sistema automatizado de generación de mediciones que simula el comportamiento de sensores IoT reales.

### Configuración del Backend (`index.js`)


```javascript
// Inicia la generación periódica de mediciones
setTimeout(() => {
    console.log('Iniciando generación periódica de mediciones...');
    setInterval(() => {
        console.log('Generando nuevas mediciones...');
        generarMediciones();
    }, 300000); // cada 5 minutos (300,000 ms)
}, 10000); // retraso inicial de 10 segundos
```

-----

### Funcionamiento del Sistema:

#### ⏱️ **Temporización**:
- **Retraso inicial**: 10 segundos después del inicio del servidor
- **Intervalo de ejecución**: Cada 5 minutos (300,000 milisegundos)
- **Proceso continuo**: Se ejecuta indefinidamente mientras el servidor esté activo

#### 📊 **Generación de Datos**:
- **Función `generarMediciones()`**: Crea nuevas mediciones de temperatura de forma aleatoria para simular sensores reales
- **Datos aleatorios**: Cada dispositivo recibe valores de temperatura generados automáticamente
- **Persistencia**: Las mediciones se almacenan en la base de datos para su posterior consulta

#### 🔧 **Propósito**:
- **Simulación realista**: Emula el comportamiento de sensores IoT que envían datos periódicamente
- **Pruebas continuas**: Permite probar la aplicación con datos dinámicos sin necesidad de hardware real
- **Demostración**: Muestra cómo el sistema maneja actualizaciones automáticas de datos

### Ventajas del Sistema:
- ✅ **Automatización completa**: No requiere intervención manual
- ✅ **Datos consistentes**: Genera información regular para todos los dispositivos
- ✅ **Simulación realista**: Reproduce el comportamiento de sensores IoT reales
- ✅ **Facilidad de testing**: Permite probar todas las funcionalidades sin hardware físico

---

## 🛠️ Tecnologías Utilizadas
- **Framework**: Angular + Ionic
- **Containerización**: Docker & Docker Compose
- **Base de datos**: SQL

### Configuración del Backend (`index.js`)

## 📁 Estructura del Proyecto
```
/app-dam/
├── src/
├── docker-compose.yml
├── doc/
│   └── img/
│       ├── home-page.png
│       ├── device-states.png
│       ├── measurements-page.png
│       └── device-details.png
└── README.md
```

## ⚡ Funcionalidades Principales
- ✅ Autenticación de usuarios
- ✅ Monitoreo en tiempo real de dispositivos IoT
- ✅ Control remoto de válvulas
- ✅ Historial de mediciones
- ✅ Interfaz responsive
- ✅ Actualizaciones automáticas de estado
- ✅ Control masivo de dispositivos

## 👥 Autor(es)
[Nombre del estudiante/equipo]

## 📝 Notas Adicionales
- La aplicación se actualiza automáticamente para reflejar los cambios de estado en tiempo real
- Todas las acciones de control quedan registradas en el sistema
- La interfaz es completamente responsive y funciona en dispositivos móviles

---

*Proyecto Final - [Materia] - [Año Académico]*

## ⚡ Funcionalidades Principales
- ✅ Autenticación de usuarios
- ✅ Monitoreo en tiempo real de dispositivos IoT
- ✅ Control remoto de válvulas
- ✅ Historial de mediciones
- ✅ Interfaz responsive
- ✅ Actualizaciones automáticas de estado
- ✅ Control masivo de dispositivos

## 👥 Autor(es)
Williams Limonchi Sandoval

## 📝 Notas Adicionales
- La aplicación se actualiza automáticamente para reflejar los cambios de estado en tiempo real
- Todas las acciones de control quedan registradas en el sistema
- La interfaz es completamente responsive y funciona en dispositivos móviles

---

*Proyecto Final - DAM - 2025*


# Desarrollo de aplicaciones multiplataforma. Especialización IoT. FIUBA

## Clase 01
    Single Page Application
    Angular
      Componentes
      Bindings

## Clase 02
    Angular
      Pipes
      Servicios
      Directivas
        *ngIf
        *ngFor
        *ngSwitch

## Clase 03
    Comunicación entre componentes
    Ciclo de vida Angular
    App Híbridas vs Nativas

## Clase 04
    Ionic
    Ciclo de vida ionic
    Ionic Native
    Web Api vs Web Service
    Rest vs SOAP
    Express - Middleware

## Clase 05
    CORS
    MySql Pool
    Services con HTTP
    Observables
    Promesas
    Async-Await

## Clase 06
    Interceptors
    Guard
    Router

## Clase 07
    Reactive Forms

## Clase 08
    Realización y entrega de TP final

## Condición de aprobación
    Entrega del trabajo final en la clase 8 (19/08/2025) o antes del (26/08/2025 23:59)

> **Nota:** Los ejercicios resueltos y los de la clase se encuentran sin la carpeta node_modules, por lo tanto si desean correr alguno de ellos se deberán parar en la carpeta y ejecutar el comando **npm install**
