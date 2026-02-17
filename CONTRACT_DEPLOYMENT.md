# 📜 Guía de Deployment del Contrato NFT

Esta guía te enseña cómo desplegar el contrato NFT en Base Sepolia usando Remix IDE.

## 🎯 Objetivo

Desplegar un contrato NFT ERC721 que permita a los usuarios mintear **un NFT gratis por wallet**.

## 📋 Prerequisitos

1. **Wallet**: MetaMask o Coinbase Wallet instalado
2. **ETH en Base Sepolia**: Obtén testnet ETH del [faucet de Coinbase](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)
3. **Navegador**: Chrome, Firefox o Brave

## 🚀 Paso a Paso

### Paso 1: Preparar el Entorno

#### 1.1 Configurar tu Wallet

1. Abre MetaMask o Coinbase Wallet
2. Agrega la red **Base Sepolia**:
   - **Nombre**: Base Sepolia
   - **RPC URL**: https://sepolia.base.org
   - **Chain ID**: 84532
   - **Símbolo**: ETH
   - **Block Explorer**: https://sepolia.basescan.org

#### 1.2 Obtener ETH de Testnet

1. Ve al [Coinbase Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)
2. Conecta tu wallet
3. Solicita ETH (necesitarás ~0.01 ETH para el deployment)

### Paso 2: Preparar el Contrato

#### 2.1 Abrir Remix IDE

1. Ve a [remix.ethereum.org](https://remix.ethereum.org)
2. En el explorador de archivos, haz click en "+" para crear un nuevo archivo
3. Nómbralo: \`FreeNFT.sol\`

#### 2.2 Copiar el Código del Contrato

Copia todo el contenido del archivo \`contracts/FreeNFT.sol\` de este repositorio y pégalo en Remix.

El contrato se ve así (versión resumida):

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FreeNFT is ERC721, Ownable {
    uint256 private _nextTokenId;
    string private _baseTokenURI;
    uint256 public maxSupply;
    mapping(address => bool) public hasMinted;

    constructor(
        string memory name,
        string memory symbol,
        string memory baseTokenURI,
        uint256 _maxSupply
    ) ERC721(name, symbol) Ownable(msg.sender) {
        _baseTokenURI = baseTokenURI;
        maxSupply = _maxSupply;
    }

    function mint() public {
        require(_nextTokenId < maxSupply, "Max supply reached");
        require(!hasMinted[msg.sender], "You already minted");
        
        uint256 tokenId = _nextTokenId++;
        hasMinted[msg.sender] = true;
        _safeMint(msg.sender, tokenId);
    }
    
    // ... más funciones
}
\`\`\`

### Paso 3: Compilar el Contrato

#### 3.1 Ir al Compilador

1. En el menú lateral izquierdo, click en el ícono de "Solidity Compiler" (segundo ícono)

#### 3.2 Configurar el Compilador

1. **Compiler**: Selecciona versión \`0.8.20\` o superior (ej: 0.8.24)
2. **EVM Version**: Déjalo en \`default\`
3. **Language**: Solidity

#### 3.3 Compilar

1. Click en el botón azul "Compile FreeNFT.sol"
2. Espera a que aparezca el ✅ verde
3. Si hay errores, verifica que copiaste todo el código correctamente

### Paso 4: Desplegar el Contrato

#### 4.1 Ir a Deploy & Run

1. En el menú lateral, click en "Deploy & Run Transactions" (tercer ícono)

#### 4.2 Configurar el Deployment

1. **Environment**: Selecciona \`Injected Provider - MetaMask\`
2. Se abrirá tu wallet - conéctala y asegúrate de estar en **Base Sepolia**
3. **Account**: Verifica que sea tu wallet
4. **Contract**: Selecciona \`FreeNFT\`

#### 4.3 Preparar Parámetros del Constructor

Necesitas proporcionar 4 parámetros:

1. **name** (string): El nombre de tu colección
   - Ejemplo: \`"My Awesome NFT"\`
   - Poner entre comillas

2. **symbol** (string): El símbolo de tu NFT
   - Ejemplo: \`"MNFT"\`
   - Máximo 5 letras, entre comillas

3. **baseTokenURI** (string): URL base para los metadatos
   - Opción simple: \`""\` (vacío por ahora)
   - Opción avanzada: \`"ipfs://TU_CID/"\` o \`"https://tu-dominio.com/metadata/"\`
   - Poner entre comillas

4. **_maxSupply** (uint256): Cantidad máxima de NFTs
   - Ejemplo: \`1000\`
   - SIN comillas (es un número)

**Ejemplo de parámetros:**
\`\`\`
"Base Cult NFT","BCNFT","https://example.com/metadata/",1000
\`\`\`

#### 4.4 Desplegar

1. Pega los parámetros en el campo junto al botón "Deploy"
2. Click en el botón naranja "transact"
3. Se abrirá MetaMask - **revisa el gas fee**
4. Click "Confirmar" en MetaMask
5. **ESPERA** - puede tomar 10-30 segundos

#### 4.5 Verificar el Deployment

1. Cuando termine, verás el contrato en "Deployed Contracts"
2. **COPIA LA DIRECCIÓN** - haz click en el ícono de copiar
3. La dirección se verá así: \`0x1234567890abcdef...\`

**¡GUARDA ESTA DIRECCIÓN! La necesitarás para la configuración.**

### Paso 5: Verificar en BaseScan

1. Ve a [sepolia.basescan.org](https://sepolia.basescan.org)
2. Pega la dirección de tu contrato en la búsqueda
3. Deberías ver:
   - ✅ Contract Creation exitoso
   - ✅ La dirección del creador (tu wallet)
   - ✅ Balance 0 ETH

### Paso 6: (Opcional) Verificar el Contrato

Verificar el contrato permite que otros vean tu código:

#### En Remix:

1. Click derecho en el archivo \`FreeNFT.sol\`
2. Selecciona "Flatten"
3. Copia el código aplanado

#### En BaseScan:

1. Ve a tu contrato en BaseScan
2. Tab "Contract" → "Verify and Publish"
3. Llena el formulario:
   - **Compiler Type**: Solidity (Single file)
   - **Compiler Version**: La misma que usaste (ej: v0.8.20)
   - **License**: MIT
4. Pega el código aplanado
5. Ingresa los parámetros del constructor (los mismos que usaste)
6. Click "Verify and Publish"

## 📝 Qué Hacer Después

1. **Copia la dirección del contrato**
2. Agrégala a tu \`.env.local\`:
   \`\`\`env
   NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0xTuDireccionAqui
   \`\`\`
3. Continúa con el deployment de la mini app

## 🧪 Probar el Contrato

Puedes probar el contrato directamente en Remix:

1. En "Deployed Contracts", expande tu contrato
2. Prueba estas funciones:
   - **totalSupply**: Ver cuántos NFTs se han minteado
   - **maxSupply**: Ver el supply máximo
   - **mint**: Mintear un NFT (click naranja, confirma en MetaMask)
   - **hasMinted**: Ver si una dirección ya minteó (pega una dirección)

## 🎨 Configurar Metadatos (Opcional)

Si usaste una \`baseTokenURI\`, necesitas crear archivos JSON:

### Estructura:
\`\`\`
metadata/
├── 0.json
├── 1.json
├── 2.json
└── ...
\`\`\`

### Ejemplo de 0.json:
\`\`\`json
{
  "name": "Base Cult NFT #0",
  "description": "Un NFT especial de la colección Base Cult",
  "image": "https://example.com/images/0.png",
  "attributes": [
    {
      "trait_type": "Rarity",
      "value": "Common"
    },
    {
      "trait_type": "Generation",
      "value": "1"
    }
  ]
}
\`\`\`

### Opciones de hosting:
1. **IPFS** (descentralizado):
   - [Pinata](https://pinata.cloud)
   - [NFT.Storage](https://nft.storage)
   - [Web3.Storage](https://web3.storage)

2. **Centralizado**:
   - Vercel
   - Netlify
   - Tu propio servidor

## ⚠️ Notas Importantes

1. **Una vez desplegado, no puedes cambiar**:
   - El nombre
   - El símbolo
   - El max supply
   - (Pero SÍ puedes cambiar la baseTokenURI si eres el owner)

2. **Gas Fees**:
   - Deployment: ~0.005-0.01 ETH en testnet
   - Mint: ~0.0001-0.0003 ETH por usuario

3. **Seguridad**:
   - Guarda bien la dirección del contrato
   - No compartas tu clave privada
   - El owner del contrato eres tú

## 📊 Costos Estimados

En **Base Sepolia (Testnet)**:
- Deployment: Gratis (ETH de faucet)
- Mint: Gratis (ETH de faucet)

En **Base Mainnet (Producción)**:
- Deployment: ~$2-5 USD
- Mint: ~$0.10-0.30 USD por usuario

## 🆘 Troubleshooting

### Error: "Gas estimation failed"
- Asegúrate de tener suficiente ETH en tu wallet
- Verifica que estés en Base Sepolia

### Error: "Out of gas"
- Aumenta el gas limit en MetaMask

### No veo el contrato desplegado
- Espera unos segundos más
- Verifica la transacción en BaseScan
- Revisa que confirmaste en MetaMask

### Error en la compilación
- Verifica la versión del compilador (0.8.20+)
- Asegúrate de copiar TODO el código
- Revisa que no haya errores de sintaxis

## 📚 Recursos Adicionales

- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Remix Documentation](https://remix-ide.readthedocs.io/)
- [Base Documentation](https://docs.base.org/)
- [ERC721 Standard](https://eips.ethereum.org/EIPS/eip-721)

---

**¿Necesitas ayuda?** Abre un issue en el repositorio.
