# Cuidapp · versión web

Réplica navegable de la app Flutter de [Cuidapp](../Cuidapp) en un solo
archivo HTML, pensada para publicarse en **https://cuidapp.ggabor.online**.

Tiene dos modos, elegidos automáticamente por [firebase-config.js](firebase-config.js):

| Modo | Cuándo | Dónde viven los datos |
|---|---|---|
| Demo local | `window.CUIDAPP_FIREBASE = null` | `localStorage` del navegador; se regeneran cada día |
| Firebase | `window.CUIDAPP_FIREBASE = { apiKey, … }` | Firestore + Firebase Auth, con las reglas de `Cuidapp/firestore.rules` |

Un usuario sin `@` se convierte en `usuario@cuidapp.ggabor.online`, porque
Firebase Auth exige un correo. Así el acceso de prueba es simplemente
**`test` / `cuidapp123`**.

## Desarrollo local

```bash
node serve.js 8090      # http://localhost:8090
```

## Publicación (GitHub Pages)

Sigue el mismo patrón que `planificador.ggabor.online`:

1. Crear el repositorio `gaborgasko-code/cuidapp` en GitHub (vacío).
2. `git push -u origin main` desde esta carpeta (el remoto ya está configurado).
3. En el repositorio: *Settings → Pages → Deploy from a branch → main / (root)*.
   El archivo `CNAME` fija el dominio `cuidapp.ggabor.online`.
4. En el DNS de `ggabor.online` (Namecheap): registro **CNAME** `cuidapp` →
   `gaborgasko-code.github.io`.
5. Cuando GitHub emita el certificado, activar *Enforce HTTPS*.

## Conectar con Firebase (la base de datos "de verdad")

Desde la carpeta `Cuidapp/`:

```bash
npx firebase-tools login
npx firebase-tools projects:create cuidapp-<sufijo> --display-name Cuidapp
npx firebase-tools use cuidapp-<sufijo>

# Firestore + reglas + índices (la primera vez pide elegir región: europe-west1)
npx firebase-tools firestore:databases:create "(default)" --location europe-west1
npx firebase-tools deploy --only firestore:rules,firestore:indexes

# App web y su configuración → pegar en cuidapp_web/firebase-config.js
npx firebase-tools apps:create web cuidapp-web
npx firebase-tools apps:sdkconfig web
```

En la consola de Firebase, activar **Authentication → Método de acceso →
Correo electrónico/contraseña** (no hay comando de CLI para esto).

### Datos y cuentas de prueba

El script [`functions/scripts/seed-production.mjs`](../Cuidapp/functions/scripts/seed-production.mjs)
crea el domicilio de demostración, el cuadrante, el plan de cuidados, las
cámaras, la conversación, los turnos de los próximos 3 días y dos cuentas:

| Usuario | Contraseña | Rol |
|---|---|---|
| `test` (= test@cuidapp.ggabor.online) | `cuidapp123` | familiar |
| `ana` (= ana@cuidapp.ggabor.online) | `cuidapp123` | cuidadora |

Necesita credenciales de administrador (cualquiera de las dos):

- `GOOGLE_APPLICATION_CREDENTIALS=<clave JSON de una cuenta de servicio>`
- `gcloud auth application-default login`

```bash
npm --prefix functions run build
node functions/scripts/seed-production.mjs --project cuidapp-<sufijo> --yes-production
```

Es idempotente: se puede relanzar cada día para materializar los turnos si no
están desplegadas las Cloud Functions (que requieren el plan Blaze).
