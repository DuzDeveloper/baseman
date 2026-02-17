# 🎮 Blue Sky Bird Game - Modificación de basecultmint

Paquete completo para convertir tu repositorio [basecultmint](https://github.com/DuzDeveloper/basecultmint) en un juego tipo Flappy Bird con transacciones on-chain en Base.

## 📦 Contenido del Paquete

```
basecultmint-mod/
├── contracts/
│   └── BlueSkyBirdGame.sol         # Smart contract del juego
├── components/
│   └── BlueSkyBirdGame.tsx         # Componente React del juego
├── lib/
│   └── contract-abi.ts             # ABI del contrato
├── app/
│   └── page.tsx                    # Página principal actualizada
├── QUICK_START.md                  # ⭐ Guía rápida de 5 pasos
├── GAME_SETUP.md                   # Guía detallada completa
├── convert-to-game.sh              # Script de conversión
└── .env.local.example              # Ejemplo de configuración
```

## 🚀 Inicio Rápido (5 pasos - 10 minutos)

### 1. Clonar tu repositorio

```bash
cd ~/Escritorio
git clone https://github.com/DuzDeveloper/basecultmint.git
cd basecultmint
npm install
```

### 2. Copiar archivos del juego

```bash
# Crear carpeta contracts
mkdir -p contracts

# Copiar archivos desde este paquete
cp /ruta/a/descarga/contracts/BlueSkyBirdGame.sol contracts/
cp /ruta/a/descarga/components/BlueSkyBirdGame.tsx components/
cp /ruta/a/descarga/lib/contract-abi.ts lib/
cp /ruta/a/descarga/app/page.tsx app/
```

### 3. Desplegar contrato en Base

1. Abre https://remix.ethereum.org
2. Carga `contracts/BlueSkyBirdGame.sol`
3. Compila (Solidity 0.8.22)
4. Despliega en Base Mainnet
5. Copia la dirección: `0x...`

### 4. Configurar variables

```bash
# Editar .env.local
nano .env.local
```

Actualiza:
```env
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0xTU_CONTRATO_AQUI
NEXT_PUBLIC_ONCHAINKIT_API_KEY=tu_api_key
```

### 5. Ejecutar

```bash
npm run dev
```

Abre http://localhost:3000

## ✨ ¿Qué Cambia?

| Antes | Después |
|-------|---------|
| NFT Mint App | Juego Flappy Bird |
| Botón "Mint NFT" | Botón "Start Game" |
| Crea NFT gratis | Juega y guarda score |
| 1 transacción | 2 transacciones (start/end) |
| MintNFT.tsx | BlueSkyBirdGame.tsx |
| FreeNFT.sol | BlueSkyBirdGame.sol |

## 🎨 Personalización

### Colores (Editable)

En `components/BlueSkyBirdGame.tsx` línea 17:

```typescript
const CONFIG = {
  skyColor: '#87CEEB',      // Azul cielo
  birdColor: '#0066FF',     // Azul pájaro
  pipeColor: '#0047AB',     // Azul oscuro
  groundColor: '#4169E1',   // Azul royal
};
```

### Dificultad (Editable)

```typescript
const CONFIG = {
  gravity: 0.6,            // ↑ Más difícil
  jumpStrength: -10,       // ↓ Más difícil
  pipeGap: 200,           // ↓ Más difícil
  pipeSpeed: 3,           // ↑ Más difícil
};
```

## 🎮 Cómo Funciona

1. **Usuario conecta wallet** (Coinbase/MetaMask)
2. **Click "Start Game"** → Transacción `startGame()` en Base
3. **Usuario juega** → Controla el pájaro (click/tap/space)
4. **Game Over** → Transacción automática `endGame(score)`
5. **Score guardado** → Registrado on-chain en Base

## 📊 Smart Contract Features

- ✅ Registro de partidas on-chain
- ✅ Estadísticas por jugador
- ✅ Leaderboard global (top 10)
- ✅ Score tracking completo
- ✅ Transacciones ultra baratas (~$0.001 en Base)

## 🌐 Deploy a Producción

```bash
git add .
git commit -m "Convert to Blue Sky Bird game"
git push origin main
```

Vercel desplegará automáticamente (si ya está configurado).

**Actualizar en Vercel:**
- Settings → Environment Variables
- Cambiar `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` a la nueva dirección

## 📁 Estructura del Proyecto Final

```
basecultmint/
├── contracts/
│   ├── BlueSkyBirdGame.sol      # ← NUEVO
│   └── FreeNFT.sol              # (mantener como referencia)
├── components/
│   ├── BlueSkyBirdGame.tsx      # ← NUEVO
│   ├── MintNFT.tsx              # (mantener como referencia)
│   └── providers.tsx            # Sin cambios
├── lib/
│   ├── contract-abi.ts          # ← ACTUALIZADO
│   └── wagmi.ts                 # Sin cambios
├── app/
│   ├── page.tsx                 # ← ACTUALIZADO
│   ├── layout.tsx               # Sin cambios
│   └── globals.css              # Sin cambios
├── package.json                 # Sin cambios
└── .env.local                   # ← ACTUALIZAR variables
```

## 🔧 Requisitos

- ✅ Node.js 18+
- ✅ npm o yarn
- ✅ Wallet con ETH en Base (para desplegar contrato)
- ✅ Coinbase OnchainKit API Key

## 💰 Costos

- **Deploy contrato**: ~$0.50-2 USD (una sola vez)
- **Cada partida**: ~$0.001 USD (usuario paga el gas)
- **Hosting**: Gratis (Vercel)

## 📚 Documentación

- **QUICK_START.md** - Guía rápida visual
- **GAME_SETUP.md** - Guía detallada completa
- **convert-to-game.sh** - Script automatizado

## 🆘 Soporte

**Problemas comunes:**

1. **"Module not found"** → Verifica que copiaste todos los archivos
2. **"Contract not found"** → Verifica la dirección en `.env.local`
3. **"Transaction failed"** → Usuario necesita ETH en Base

**Estructura de ayuda:**
1. Lee `QUICK_START.md` primero
2. Si necesitas más detalles, lee `GAME_SETUP.md`
3. Usa `convert-to-game.sh` para automatizar

## 🎯 Resultado Final

Tu app en: `https://basecultmint.vercel.app`

Usuarios podrán:
- Conectar wallet de Base
- Jugar Flappy Bird on-chain
- Competir en leaderboard global
- Ver sus estadísticas
- Todo registrado en Base blockchain

## 📄 Licencia

MIT - Usa libremente para tu proyecto

---

**Construido con ❤️ para Base**

🔗 [Base Docs](https://docs.base.org) | 🎮 [Juega](https://basecultmint.vercel.app) | 💬 [Repo Original](https://github.com/DuzDeveloper/basecultmint)
