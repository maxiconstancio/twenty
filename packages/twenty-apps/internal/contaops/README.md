# ContaOps para Twenty

Primera base de una aplicación para la gestión interna de un estudio contable.
El código está preparado para el SDK 2.46.0 del repositorio; todavía requiere
compilación e instalación en una instancia de desarrollo para validar el flujo.

## Modelo inicial

| Necesidad | Representación |
| --- | --- |
| Clientes | Empresas de Twenty, con un campo CUIT agregado por ContaOps. Para una persona física, usar una ficha de empresa como cliente y vincular su contacto en Personas. |
| Contactos | Personas de Twenty vinculadas al cliente. |
| Responsables | Miembros del espacio de trabajo, relacionados con cada obligación. |
| Tareas | Tareas nativas de Twenty para el trabajo diario, vinculadas a la ficha del cliente. |
| Vencimientos | Objeto Obligación contable: nombre, cliente, período, fecha, responsable y estado. |

Cada registro representa una obligación de un cliente para un período: por
ejemplo, “Liquidación mensual”, cliente “Cliente de prueba”, período “2026-10”.
Una obligación del siguiente período es otro registro, para conservar el historial.

Estados: Pendiente → Esperando documentación → En preparación → En revisión →
Completada. El usuario puede pasar directamente al estado que corresponda.
La vista “Obligaciones por vencimiento” muestra cliente, período, fecha,
responsable y estado, ordenada por fecha ascendente. Las fechas se cargan
manualmente; esta aplicación no calcula calendarios fiscales.

## Preparación y validación

Requisitos: Node 24.5 compatible, Yarn 4 y una instancia de Twenty compatible
con el SDK. Ejecutar los comandos desde esta carpeta:

```powershell
yarn install
yarn typecheck
yarn twenty --help
```

Consultar la ayuda de la CLI instalada para conectar la instancia de desarrollo
y sincronizar la aplicación. No publicar en producción antes de probar:

1. Instalar la aplicación y verificar el campo CUIT en Empresas.
2. Crear un cliente de prueba y asignarle un contacto.
3. Crear una obligación, elegir cliente y responsable, y cargar período y fecha.
4. Verificar las relaciones inversas en el cliente y en el miembro del equipo.
5. Crear una segunda obligación con otra fecha y verificar el orden de la vista.
6. Cambiar el estado hasta Completada y confirmar que el historial permanece.
7. Crear y completar una tarea nativa vinculada al cliente.

El rol definido aquí es el rol técnico de la aplicación, sin acceso a registros;
no concede permisos a los usuarios del estudio. Esos permisos se configuran en
Twenty y deben verificarse con los perfiles que se utilicen para la prueba.

## Decisiones pendientes

- Datos y flujos del ContaOps existente, cuya implementación no está en este proyecto.
- Servicios del estudio, plantillas de tareas y reglas de recurrencia.
- Datos adicionales del cliente y responsables principales de su cartera.
- Alertas, vistas de pendientes/vencidos y tablero por responsable.
- Integración y sincronización con el ContaOps existente.

La base no incluye generación recurrente, recordatorios, cálculo tributario ni
integración externa. Las etiquetas están en español como metadatos de la
aplicación; no se modificaron los catálogos de traducción de Twenty.

Los archivos de definición usan exportaciones por defecto porque el constructor
de manifiestos del SDK las exige, igual que los ejemplos del repositorio. Los
identificadores compartidos usan exportaciones nombradas. Mantener todos los
identificadores universales estables entre versiones para conservar los datos.
