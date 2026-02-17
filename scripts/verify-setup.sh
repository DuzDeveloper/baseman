#!/bin/bash

# Script para verificar que todo está configurado correctamente

echo "🔍 Verificando configuración de NFT Mint Mini App..."
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador de errores
ERRORS=0

# Verificar Node.js
echo "📦 Verificando Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js instalado: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js no está instalado"
    ERRORS=$((ERRORS+1))
fi

# Verificar npm
echo ""
echo "📦 Verificando npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm instalado: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm no está instalado"
    ERRORS=$((ERRORS+1))
fi

# Verificar archivo .env.local
echo ""
echo "⚙️  Verificando archivo .env.local..."
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✓${NC} Archivo .env.local encontrado"
    
    # Verificar variables importantes
    echo ""
    echo "📋 Verificando variables de entorno..."
    
    if grep -q "NEXT_PUBLIC_ONCHAINKIT_API_KEY=\S" .env.local; then
        echo -e "${GREEN}✓${NC} NEXT_PUBLIC_ONCHAINKIT_API_KEY configurado"
    else
        echo -e "${YELLOW}⚠${NC} NEXT_PUBLIC_ONCHAINKIT_API_KEY no configurado o vacío"
        ERRORS=$((ERRORS+1))
    fi
    
    if grep -q "NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x" .env.local; then
        echo -e "${GREEN}✓${NC} NEXT_PUBLIC_NFT_CONTRACT_ADDRESS configurado"
    else
        echo -e "${YELLOW}⚠${NC} NEXT_PUBLIC_NFT_CONTRACT_ADDRESS no configurado"
        ERRORS=$((ERRORS+1))
    fi
    
    if grep -q "NEXT_PUBLIC_CHAIN_ID=\S" .env.local; then
        echo -e "${GREEN}✓${NC} NEXT_PUBLIC_CHAIN_ID configurado"
    else
        echo -e "${YELLOW}⚠${NC} NEXT_PUBLIC_CHAIN_ID no configurado"
        ERRORS=$((ERRORS+1))
    fi
else
    echo -e "${RED}✗${NC} Archivo .env.local no encontrado"
    echo -e "${YELLOW}ℹ${NC}  Copia .env.example a .env.local y configúralo"
    ERRORS=$((ERRORS+1))
fi

# Verificar node_modules
echo ""
echo "📚 Verificando dependencias..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Dependencias instaladas"
else
    echo -e "${YELLOW}⚠${NC} Dependencias no instaladas"
    echo -e "${YELLOW}ℹ${NC}  Ejecuta: npm install"
    ERRORS=$((ERRORS+1))
fi

# Resultado final
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ ¡Todo listo!${NC} Puedes ejecutar 'npm run dev'"
else
    echo -e "${RED}✗ Se encontraron $ERRORS problema(s)${NC}"
    echo ""
    echo "Por favor, corrige los problemas antes de continuar."
    echo ""
    echo "Guía rápida:"
    echo "1. Instala dependencias: npm install"
    echo "2. Copia .env.example a .env.local"
    echo "3. Configura las variables de entorno"
    echo "4. Ejecuta este script nuevamente"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

exit $ERRORS
