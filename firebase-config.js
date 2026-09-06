// Configuración del proyecto Firebase de Cuidapp.
//
// Con `null`, la web funciona en modo demo local (datos solo en el navegador).
// Para conectarla a Firebase, sustituye `null` por el objeto que devuelve:
//
//   firebase apps:sdkconfig web --project <id-del-proyecto>
//
// (o el panel de Firebase: Configuración del proyecto → Tus apps → SDK config).
// Estas claves NO son secretas: identifican el proyecto; la seguridad la
// imponen las reglas de Firestore y Firebase Auth.
window.CUIDAPP_FIREBASE = null;

// Dominio que se añade a los usuarios sin "@": "test" → test@cuidapp.ggabor.online
window.CUIDAPP_USERNAME_DOMAIN = 'cuidapp.ggabor.online';
