# Proyecto en Ionic

Este es un proyecto desarrollado con Ionic Framework. A continuación se describen los requisitos previos, la instalación, la sincronización y cómo montar la aplicación en un dispositivo Android o iOS.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes elementos:

- [Node.js](https://nodejs.org/en/download/) (versión LTS recomendada).
- [Ionic CLI](https://ionicframework.com/docs/cli) instalado globalmente. Esto se puede hacer ejecutando el comando `npm install -g @ionic/cli` en tu terminal.
- **Android Studio**, que es necesario para el desarrollo y pruebas en dispositivos Android.
- **Java JDK y Java SDK**, que deben estar instalados y configurados en tu sistema.
- **Xcode** (solo para macOS), que es necesario para el desarrollo y pruebas en dispositivos iOS.

## Instalación del Proyecto

Para comenzar a trabajar en el proyecto, primero instala las dependencias con `npm install`. Una vez que las dependencias estén instaladas, puedes iniciar el servidor local usando `ionic serve`, lo que abrirá la aplicación en tu navegador y permitirá visualizar los cambios en tiempo real.

Si realizas modificaciones en el código, deberás ejecutar `ionic build` para compilar los cambios, seguido de `ionic cap copy` para copiar los archivos al proyecto nativo. Finalmente, usa `ionic cap sync` para sincronizar el proyecto con Android e iOS.

## Montar Aplicación Android

Para montar la aplicación en un dispositivo Android, asegúrate de tener **Android Studio**, **Java JDK** y **Java SDK** instalados, además de configurar las variables de entorno necesarias. Luego, abre el proyecto en Android Studio ejecutando `ionic cap open android` desde la raíz del proyecto. Conecta tu dispositivo Android en modo desarrollador y activa las opciones de depuración USB. Tu dispositivo debería aparecer en Android Studio, listo para ejecutar la aplicación.

Además, puedes generar un instalador (APK) desde Android Studio. Para hacerlo, ve al menú `Build`, selecciona `Generate Signed Bundle/APK` y sigue las instrucciones para crear el APK.

## Montar Aplicación iOS

Para montar la aplicación en un dispositivo iOS, debes ejecutar el comando `ionic cap open ios` desde la raíz del proyecto en una terminal. Esto abrirá el proyecto en Xcode. Una vez dentro de Xcode:

1. Dirígete al apartado **App** y selecciona la opción **Signing & Capabilities**.
2. Elige el **Team** al cual quieres aplicar el proyecto. Si estás realizando pruebas, puedes seleccionar el **Team personal**.
3. En la parte superior de Xcode, selecciona el dispositivo en el que deseas ejecutar la aplicación. Se recomienda usar un **dispositivo físico** para obtener resultados más precisos.
4. Haz clic en **Run** para ejecutar la aplicación en tu dispositivo.
5. una ves instalda la app debera ir a **configuracion** luego a **general** luego a **Admon. de dispositivos y VPN** luego al apartado de **APP DEL DESARROLLADOR** donde seleccionara el correo del team registrado en xcode, aprobar la app para su uso en el dispositivo y ya podra abrir la app.

## Contribuciones

Las contribuciones son bienvenidas. Abre un issue o envía un pull request para discutir cambios o mejoras.

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).
