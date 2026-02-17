# 🚀 Guía de Inicio Rápido

## ¡Bienvenido! 👋

Esta es tu mini app para mintear NFTs gratis en Base. Sigue estos pasos para ponerla en marcha.

## 📦 Lo que necesitas

- [ ] Ubuntu Linux (que ya tienes ✅)
- [ ] Node.js 18+ instalado
- [ ] Wallet de Ethereum (MetaMask o Coinbase Wallet)
- [ ] ETH en Base Sepolia (del faucet)

## ⚡ Start en 5 Pasos

### 1️⃣ Instalar Dependencias

\`\`\`bash
cd nft-mint-miniapp
npm install
\`\`\`

### 2️⃣ Desplegar el Contrato NFT

1. Abre [remix.ethereum.org](https://remix.ethereum.org)
2. Crea archivo \`FreeNFT.sol\`
3. Copia el código de \`contracts/FreeNFT.sol\`
4. Compila (versión 0.8.20+)
5. Despliega en Base Sepolia con estos parámetros:
   - name: \`"Mi NFT Gratis"\`
   - symbol: \`"MNFT"\`
   - baseTokenURI: \`""\` (déjalo vacío por ahora)
   - maxSupply: \`1000\`
6. **Copia la dirección del contrato** 📋

**¿Necesitas ayuda?** Lee: [CONTRACT_DEPLOYMENT.md](CONTRACT_DEPLOYMENT.md)

### 3️⃣ Configurar Variables de Entorno

\`\`\`bash
# Copiar el ejemplo
cp .env.example .env.local

# Editar con tu editor favorito
nano .env.local
# o
code .env.local
# o
vim .env.local
\`\`\`

Completa:
\`\`\`env
NEXT_PUBLIC_PROJECT_NAME="Mi NFT Mint App"
NEXT_PUBLIC_ONCHAINKIT_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x_tu_contrato_aqui
NEXT_PUBLIC_CHAIN_ID=84532
\`\`\`

**¿Dónde obtengo el API Key?**
1. Ve a [portal.cdp.coinbase.com](https://portal.cdp.coinbase.com/)
2. Crea una cuenta
3. Crea un proyecto
4. Copia el API Key

### 4️⃣ Ejecutar Localmente

\`\`\`bash
npm run dev
\`\`\`

Abre tu navegador en: http://localhost:3000

¡Prueba mintear un NFT! 🎨

### 5️⃣ Desplegar a Producción

\`\`\`bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
\`\`\`

**¿Necesitas más detalles?** Lee: [DEPLOYMENT.md](DEPLOYMENT.md)

## 📚 Documentación Completa

- **[README.md](README.md)** - Documentación completa
- **[CONTRACT_DEPLOYMENT.md](CONTRACT_DEPLOYMENT.md)** - Cómo desplegar el contrato
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Cómo desplegar la mini app
- **[FAQ.md](FAQ.md)** - Preguntas frecuentes
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guía de contribución

## 🆘 ¿Problemas?

### Error: "Cannot find module..."

\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Error: "Network mismatch"

1. Abre MetaMask
2. Cambia a Base Sepolia
3. Recarga la página

### Error: Variables de entorno no configuradas

\`\`\`bash
# Verifica que el archivo existe
ls -la .env.local

# Verifica el setup
bash scripts/verify-setup.sh
\`\`\`

### La app no carga

\`\`\`bash
# Limpia el build
rm -rf .next

# Vuelve a ejecutar
npm run dev
\`\`\`

## 🎯 Próximos Pasos

Una vez que funcione localmente:

1. ✅ Despliega a Vercel
2. ✅ Firma el manifest de Farcaster
3. ✅ Publica en Base App
4. ✅ Comparte en redes sociales

## 💡 Tips

- **Testea primero**: Usa Base Sepolia antes de ir a mainnet
- **Guarda tu seed phrase**: Nunca la compartas
- **Lee la documentación**: Está muy completa
- **Pregunta**: Si tienes dudas, abre un issue

## 🎨 Personalización Rápida

### Cambiar colores

Edita \`components/MintNFT.tsx\`, línea ~120:

\`\`\`tsx
className="bg-gradient-to-br from-blue-500 to-purple-600"
// Cambia blue-500 y purple-600 por los colores que quieras
\`\`\`

### Cambiar textos

Busca en \`components/MintNFT.tsx\` y modifica los strings:

\`\`\`tsx
<h1>Mint tu NFT Gratis 🎨</h1>
// Cambia por tu texto
\`\`\`

### Agregar logo

1. Pon tu imagen en \`public/logo.png\`
2. Agrégala en el componente:

\`\`\`tsx
<img src="/logo.png" alt="Logo" className="w-20 h-20" />
\`\`\`

## 📞 Soporte

- **Bugs**: Abre un [issue](../../issues)
- **Preguntas**: Lee el [FAQ](FAQ.md)
- **Comunidad**: [Discord de Base](https://discord.gg/base)

---

**¡A construir! 🚀**

Hecho con ❤️ para Base
