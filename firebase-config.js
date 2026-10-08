// Configuración del proyecto Firebase de Cuidapp (cuidapp-ec254), el mismo que usa
// la app de iPhone Cuidatufamilia. Con `null`, la web funcionaría en modo demo local.
//
// Origen: firebase apps:sdkconfig WEB 1:621051345831:web:b5089d165e7e5846875482 --project cuidapp-ec254
//
// Estas claves NO son secretas: identifican el proyecto; la seguridad la
// imponen las reglas de Firestore y Firebase Auth.
window.CUIDAPP_FIREBASE = {
  apiKey: 'AIzaSyBuuaZvr4rdsUjzvMDdd27s5JDnWs_HslA',
  authDomain: 'cuidapp-ec254.firebaseapp.com',
  projectId: 'cuidapp-ec254',
  storageBucket: 'cuidapp-ec254.firebasestorage.app',
  messagingSenderId: '621051345831',
  appId: '1:621051345831:web:b5089d165e7e5846875482',
};

// Dominio que se añade a los usuarios sin "@": "test" → test@cuidapp.ggabor.online
window.CUIDAPP_USERNAME_DOMAIN = 'cuidapp.ggabor.online';
