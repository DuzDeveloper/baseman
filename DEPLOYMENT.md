# 🚀 Guía Rápida de Deployment

Esta es una guía paso a paso para desplegar tu mini app de NFT en Base.

## ✅ Checklist Pre-Deployment

Antes de comenzar, asegúrate de tener:

- [ ] Contrato NFT desplegado en Base Sepolia
- [ ] Dirección del contrato copiada
- [ ] API Key de Coinbase Developer Platform
- [ ] Cuenta de Vercel
- [ ] Cuenta de Farcaster

## 📝 Pasos de Deployment

### 1. Preparación Local (5 minutos)

\`\`\`bash
# Instalar dependencias
npm install

# Crear archivo .env.local
cp .env.example .env.local
\`\`\`

Edita \`.env.local\`:
\`\`\`env
NEXT_PUBLIC_PROJECT_NAME="NFT Mint Mini App"
NEXT_PUBLIC_ONCHAINKIT_API_KEY=tu_api_key_de_coinbase
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0xTuContratoAqui
NEXT_PUBLIC_CHAIN_ID=84532
\`\`\`

\`\`\`bash
# Probar localmente
npm run dev
\`\`\`

### 2. Deploy a Vercel (5 minutos)

\`\`\`bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
\`\`\`

Durante el proceso:
- Responde las preguntas del CLI
- Anota la URL que te da (ej: https://tu-app.vercel.app)

### 3. Configurar Variables de Entorno en Vercel (3 minutos)

Ve a tu proyecto en Vercel → Settings → Environment Variables

Agrega:
\`\`\`
NEXT_PUBLIC_PROJECT_NAME = NFT Mint Mini App
NEXT_PUBLIC_ONCHAINKIT_API_KEY = tu_api_key
NEXT_PUBLIC_URL = https://tu-app.vercel.app
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS = 0xTuContrato
NEXT_PUBLIC_CHAIN_ID = 84532
\`\`\`

Después de agregar las variables, redeploy:
\`\`\`bash
vercel --prod
\`\`\`

### 4. Firmar el Manifest (5 minutos)

1. Ve a: https://farcaster.xyz/~/developers/mini-apps/manifest
2. Pega tu dominio: \`tu-app.vercel.app\` (sin https://)
3. Click en "Generate account association"
4. Firma con tu wallet de Farcaster
5. Copia el objeto JSON generado

### 5. Actualizar Configuración (2 minutos)

Edita \`farcaster.config.ts\`:

\`\`\`typescript
accountAssociation: {
  "header": "eyJ0eXAi...", // pega aquí
  "payload": "eyJkb21h...", // pega aquí
  "signature": "0x123..." // pega aquí
}
\`\`\`

Guarda y redeploy:
\`\`\`bash
git add .
git commit -m "Add account association"
git push
\`\`\`

O si usas Vercel CLI:
\`\`\`bash
vercel --prod
\`\`\`

### 6. Verificar (3 minutos)

Ve a: https://base.dev/preview

1. Pega tu URL
2. Verifica que todo se vea bien:
   - ✅ Embeds
   - ✅ Account association
   - ✅ Metadata
3. Prueba el botón "Launch"

### 7. Publicar en Base App (1 minuto)

1. Abre Base App
2. Crea un post con tu URL
3. Publica

¡Listo! 🎉

## 🔍 Verificación Rápida

Tu app debe:
- ✅ Cargar en https://tu-app.vercel.app
- ✅ Permitir conectar wallet
- ✅ Mostrar supply actual
- ✅ Permitir mintear NFT
- ✅ Funcionar en Base App

## ⚡ Comandos Útiles

\`\`\`bash
# Ver logs de Vercel
vercel logs

# Abrir dashboard de Vercel
vercel open

# Ver variables de entorno
vercel env ls

# Agregar variable de entorno
vercel env add NOMBRE_VARIABLE production
\`\`\`

## 🐛 Problemas Comunes

### La app no carga en Base App
- Verifica que el manifest esté firmado
- Asegúrate que todas las URLs sean HTTPS

### Error de red
- Verifica que \`NEXT_PUBLIC_CHAIN_ID\` sea 84532
- Asegúrate de estar en Base Sepolia

### No puedo mintear
- Verifica que la dirección del contrato sea correcta
- Asegúrate de tener ETH en Base Sepolia
- Verifica que no hayas minteado ya

## 📞 Ayuda

Si tienes problemas:
1. Revisa los logs: \`vercel logs\`
2. Verifica en base.dev/preview
3. Prueba en modo incógnito
4. Revisa la consola del navegador (F12)

---

**Tiempo total estimado: ~25 minutos**
