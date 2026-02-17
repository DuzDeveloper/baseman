# ❓ Preguntas Frecuentes (FAQ)

## 📚 General

### ¿Qué es esta mini app?

Es una aplicación descentralizada (dApp) que permite a los usuarios mintear NFTs gratuitos en la red Base. Solo pagas el gas fee (muy bajo en Base).

### ¿Por qué Base?

Base es una Layer 2 de Ethereum que ofrece:
- ⚡ Transacciones rápidas (2 segundos)
- 💰 Gas fees muy bajos (~$0.01-0.10)
- 🔒 Seguridad de Ethereum
- 🌐 Ecosistema creciente

### ¿Es realmente gratis?

El mint es gratis, pero pagas:
- Gas fees (muy bajos en Base, ~$0.01-0.10)
- Deployment del contrato (~$2-5 una sola vez)

## 🛠️ Desarrollo

### ¿Qué tecnologías usa?

- **Frontend**: Next.js 15, React 19, TypeScript
- **Blockchain**: Solidity (OpenZeppelin), Base
- **Web3**: wagmi, viem, OnchainKit
- **Estilos**: Tailwind CSS
- **Deployment**: Vercel

### ¿Necesito saber Solidity?

No necesariamente. El contrato ya está listo. Solo necesitas:
1. Desplegarlo en Remix
2. Copiar la dirección
3. Configurar la mini app

### ¿Puedo personalizar el contrato?

Sí, puedes modificar:
- Nombre y símbolo del NFT
- Max supply
- Lógica de mint (agregar whitelist, precio, etc.)
- Metadatos

### ¿Cómo agrego metadatos a los NFTs?

1. Crea archivos JSON con la metadata
2. Súbelos a IPFS o tu servidor
3. Configura la \`baseTokenURI\` en el contrato

Ver [CONTRACT_DEPLOYMENT.md](CONTRACT_DEPLOYMENT.md#configurar-metadatos-opcional) para más detalles.

## 🌐 Deployment

### ¿Necesito pagar por Vercel?

No, Vercel tiene un tier gratuito más que suficiente para esta app.

### ¿Puedo usar otro hosting que no sea Vercel?

Sí, puedes usar:
- Netlify
- Railway
- Render
- Tu propio servidor

La app es una aplicación Next.js estándar.

### ¿Cómo actualizo la app después del deployment?

\`\`\`bash
# Haz tus cambios
git add .
git commit -m "feat: actualización X"
git push

# Vercel redeploya automáticamente
# O manualmente:
vercel --prod
\`\`\`

## 🔐 Seguridad

### ¿Es seguro el contrato?

El contrato usa:
- OpenZeppelin (estándar de la industria)
- ERC721 (NFT estándar)
- Modifiers de seguridad (\`require\`)

Pero siempre:
- Haz un audit si vas a producción
- Prueba en testnet primero
- No compartas tu clave privada

### ¿Puedo modificar el contrato después de desplegarlo?

NO. Los contratos son inmutables una vez desplegados.

Puedes:
- ✅ Cambiar \`baseTokenURI\` (si eres owner)
- ❌ Cambiar nombre, símbolo, max supply
- ❌ Cambiar lógica del mint

### ¿Qué pasa si pierdo acceso a mi wallet owner?

Perderás control del contrato. Por eso:
- 🔑 Guarda tu seed phrase segura
- 💾 Haz backups
- 🏦 Considera usar multisig en producción

## 💰 Costos

### ¿Cuánto cuesta todo?

**Testnet (Base Sepolia)**: Gratis
- ETH de faucet es gratis
- Deployment: $0
- Mint: $0

**Mainnet (Base)**: 
- Deployment: ~$2-5
- Mint: ~$0.01-0.10 por usuario
- Vercel: Gratis (tier gratuito)

### ¿Los usuarios pagan por mintear?

Sí, solo el gas fee (~$0.01-0.10 en Base).

El mint es gratis, pero las transacciones blockchain siempre tienen gas fees.

## 🐛 Problemas Comunes

### "Network mismatch" al conectar wallet

**Solución**: 
1. Abre MetaMask
2. Cambia a Base Sepolia (o Base si estás en mainnet)
3. Recarga la página

### "Transaction failed"

**Causas comunes**:
- Sin suficiente ETH para gas
- Ya minteaste (solo 1 por wallet)
- Supply agotado
- Contrato mal configurado

**Solución**: Verifica la causa en BaseScan

### La app no carga en Base App

**Checklist**:
- ✅ Manifest firmado correctamente
- ✅ Todas las URLs son HTTPS
- ✅ Variables de entorno configuradas
- ✅ Verifica en base.dev/preview

### "Already minted"

Solo puedes mintear 1 NFT por wallet. Es una característica de seguridad.

**Solución**: Usa otra wallet si quieres testear.

### El contador no se actualiza

**Posibles causas**:
- Cache del navegador
- RPC lento
- Error en la lectura del contrato

**Solución**:
- Refresca la página
- Verifica en BaseScan
- Chequea la consola del navegador

## 🎨 Personalización

### ¿Puedo cambiar los colores?

Sí, edita las clases de Tailwind en \`components/MintNFT.tsx\`:

\`\`\`tsx
// Cambia esto:
className="bg-gradient-to-br from-blue-500 to-purple-600"

// Por esto:
className="bg-gradient-to-br from-red-500 to-pink-600"
\`\`\`

### ¿Puedo agregar más información?

Sí, el componente \`MintNFT\` es completamente customizable:
- Agrega descripciones
- Muestra roadmap
- Agrega enlaces sociales
- Muestra NFTs minteados
- etc.

### ¿Puedo usar mi propio diseño?

Absolutamente. La app es código abierto. Modifica lo que quieras.

## 📱 Mini Apps

### ¿Qué es una mini app?

Una mini app es una web app ligera que corre dentro de:
- Base App
- Farcaster frames
- Coinbase Wallet

Sin necesidad de instalar nada.

### ¿Solo funciona en Base App?

No, también funciona en:
- Navegador normal (standalone)
- Warpcast
- Cualquier cliente de Farcaster
- Coinbase Wallet (próximamente)

### ¿Cómo publico en Base App?

1. Despliega tu app
2. Firma el manifest
3. Crea un post con tu URL en Base App

Ver [README.md](README.md#publicación-en-base-app) para detalles.

## 🔮 Avanzado

### ¿Puedo agregar una whitelist?

Sí, modifica el contrato:

\`\`\`solidity
mapping(address => bool) public whitelist;

function mint() public {
    require(whitelist[msg.sender], "Not whitelisted");
    // ... resto del código
}

function addToWhitelist(address[] memory addresses) public onlyOwner {
    for (uint i = 0; i < addresses.length; i++) {
        whitelist[addresses[i]] = true;
    }
}
\`\`\`

### ¿Puedo hacer mints pagos?

Sí:

\`\`\`solidity
uint256 public mintPrice = 0.001 ether;

function mint() public payable {
    require(msg.value >= mintPrice, "Insufficient payment");
    // ... resto del código
}
\`\`\`

### ¿Puedo permitir más de un mint por wallet?

Sí, modifica la lógica:

\`\`\`solidity
mapping(address => uint256) public mintCount;
uint256 public maxPerWallet = 3;

function mint() public {
    require(mintCount[msg.sender] < maxPerWallet, "Max mints reached");
    mintCount[msg.sender]++;
    // ... resto del código
}
\`\`\`

### ¿Puedo usar ERC1155 en vez de ERC721?

Sí, pero necesitarías:
1. Cambiar el contrato base
2. Actualizar el ABI
3. Modificar la lógica del frontend

ERC1155 permite múltiples tokens por ID.

## 📞 Soporte

### ¿Dónde pido ayuda?

1. Lee la documentación completa
2. Busca en [Issues](../../issues)
3. Abre un nuevo issue
4. Únete a [Discord de Base](https://discord.gg/base)

### ¿Hay video tutoriales?

Revisa el video que compartiste: https://www.youtube.com/watch?v=vLnugincHAg

### ¿Puedo contratar soporte?

Este es un proyecto open source. No ofrecemos soporte pago.

Pero puedes:
- Contratar un desarrollador freelance
- Pedir ayuda en la comunidad
- Revisar la documentación de Base

## 🚀 Próximos Pasos

### Ya desplegué, ¿ahora qué?

1. **Promociona** tu NFT en redes sociales
2. **Comparte** en Base App y Warpcast
3. **Construye** comunidad
4. **Itera** basado en feedback

### ¿Ideas para mejorar?

- Agregar rarity traits
- Sistema de levels o evolución
- Integrar con un juego
- Agregar utilities (acceso a Discord, etc.)
- Crear un marketplace
- Agregar staking

---

**¿No encontraste tu pregunta?** Abre un [issue](../../issues) o [discussion](../../discussions).
