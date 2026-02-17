# 🚀 Guía Rápida: 5 Pasos para Convertir basecultmint

## Paso 1: Clonar y Preparar (2 min)

```bash
cd ~/Escritorio
git clone https://github.com/DuzDeveloper/basecultmint.git
cd basecultmint
npm install
```

## Paso 2: Copiar Archivos del Juego (1 min)

Descarga y copia estos archivos a tu proyecto:

```bash
# Crear carpeta contracts
mkdir -p contracts

# Copiar archivos (desde donde los descargaste)
cp ~/Descargas/BlueSkyBirdGame.sol contracts/
cp ~/Descargas/BlueSkyBirdGame.tsx components/
cp ~/Descargas/contract-abi.ts lib/         # ⚠️ REEMPLAZA el existente
cp ~/Descargas/page.tsx app/                 # ⚠️ REEMPLAZA el existente
```

### Archivos a copiar:
- ✅ `contracts/BlueSkyBirdGame.sol` (NUEVO)
- ✅ `components/BlueSkyBirdGame.tsx` (NUEVO)
- ✅ `lib/contract-abi.ts` (REEMPLAZAR)
- ✅ `app/page.tsx` (REEMPLAZAR)

## Paso 3: Desplegar Smart Contract (5 min)

1. Abre [Remix](https://remix.ethereum.org)
2. Crea archivo `BlueSkyBirdGame.sol`
3. Pega el código del contrato
4. **Compilar**: Solidity 0.8.22
5. **Deploy**: 
   - Environment: Injected Provider
   - Network: Base Mainnet (Chain ID: 8453)
   - Click "Deploy"
6. **Copiar dirección**: `0x...` ✍️

## Paso 4: Configurar Variables (1 min)

```bash
cd ~/Escritorio/basecultmint

# Editar .env.local
nano .env.local
```

Actualiza estos valores:

```env
NEXT_PUBLIC_PROJECT_NAME="Blue Sky Bird"
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0xDIRECCION_DEL_CONTRATO_DESPLEGADO
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_ONCHAINKIT_API_KEY=tu_api_key_de_coinbase
```

**Obtener API Key**: [portal.cdp.coinbase.com](https://portal.cdp.coinbase.com/)

## Paso 5: Ejecutar (30 seg)

```bash
npm run dev
```

Abre: http://localhost:3000

## ✅ ¡Listo! Ahora tienes:

- 🎮 Juego Flappy Bird funcionando
- ⛓️ Transacción requerida para jugar
- 💙 Colores azules editables
- 📊 Scores guardados on-chain
- 🏆 Leaderboard global

---

## 🎨 Personalización Rápida

### Cambiar Colores

Edita `components/BlueSkyBirdGame.tsx` línea 17:

```typescript
const CONFIG = {
  skyColor: '#TU_COLOR',    // Cielo
  birdColor: '#TU_COLOR',   // Pájaro
  pipeColor: '#TU_COLOR',   // Tuberías
  groundColor: '#TU_COLOR', // Suelo
};
```

### Ajustar Dificultad

```typescript
const CONFIG = {
  gravity: 0.6,        // Subir = más difícil
  jumpStrength: -10,   // Bajar = más difícil
  pipeGap: 200,        // Bajar = más difícil
  pipeSpeed: 3,        // Subir = más difícil
};
```

---

## 🌐 Deploy a Internet

```bash
# Commit cambios
git add .
git commit -m "Convert to Blue Sky Bird game"
git push origin main

# Vercel desplegará automáticamente
```

Actualiza variables en Vercel:
- Settings → Environment Variables
- Cambia `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` por la nueva

---

## 📊 Comparación

| Antes (basecultmint) | Después (Blue Sky Bird) |
|---------------------|------------------------|
| Mint NFT gratuito | Juego Flappy Bird |
| Botón "Mint" | Botón "Start Game" |
| Crea NFT | Guarda score on-chain |
| 1 transacción al mint | 2 transacciones (start + end) |

---

## 🆘 Problemas Comunes

**Error: "Module not found"**
```bash
# Verifica que los archivos estén en las carpetas correctas
ls components/BlueSkyBirdGame.tsx
ls contracts/BlueSkyBirdGame.sol
```

**Error: "Contract not found"**
```bash
# Verifica .env.local
cat .env.local | grep CONTRACT
```

**El juego no arranca**
```bash
# Limpia y reinstala
rm -rf .next node_modules
npm install
npm run dev
```

---

## 📱 Resultado Final

Tu URL: `https://basecultmint.vercel.app`

Usuarios pueden:
1. Conectar wallet
2. Click "Start Game" → Transacción en Base
3. Jugar Flappy Bird
4. Score guardado automáticamente on-chain
5. Competir en leaderboard global
