# 🤝 Contribuyendo a NFT Mint Mini App

¡Gracias por tu interés en contribuir! Este documento proporciona guías para contribuir al proyecto.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Mejoras](#sugerir-mejoras)
- [Pull Requests](#pull-requests)
- [Estilo de Código](#estilo-de-código)

## 📜 Código de Conducta

Este proyecto y todos los participantes están gobernados por nuestro Código de Conducta. Al participar, se espera que respetes este código.

## 🚀 Cómo Contribuir

### Reportar Bugs

Si encuentras un bug:

1. **Verifica** que el bug no haya sido reportado anteriormente en [Issues](../../issues)
2. **Abre un nuevo issue** con:
   - Título descriptivo
   - Pasos para reproducir el bug
   - Comportamiento esperado vs actual
   - Screenshots si es posible
   - Versión de Node.js, navegador, etc.

Ejemplo:
\`\`\`markdown
**Descripción del Bug**
El botón de mint no responde cuando...

**Pasos para Reproducir**
1. Ve a la página principal
2. Conecta tu wallet
3. Click en "Mintear NFT"
4. Error: ...

**Comportamiento Esperado**
Debería abrir MetaMask para confirmar la transacción

**Screenshots**
[Adjunta aquí]

**Entorno**
- SO: Ubuntu 22.04
- Navegador: Chrome 120
- Wallet: MetaMask 11.x
\`\`\`

### Sugerir Mejoras

Para sugerir nuevas características:

1. **Verifica** que la característica no exista o esté en desarrollo
2. **Abre un issue** describiendo:
   - Qué problema resuelve
   - Cómo lo implementarías
   - Por qué es útil para la comunidad

## 🔧 Pull Requests

### Proceso

1. **Fork** el repositorio
2. **Crea una rama** desde \`main\`:
   \`\`\`bash
   git checkout -b feature/nombre-descriptivo
   \`\`\`
3. **Haz tus cambios** siguiendo el estilo de código
4. **Prueba** tus cambios localmente
5. **Commit** con mensajes descriptivos:
   \`\`\`bash
   git commit -m "feat: agregar función X para Y"
   \`\`\`
6. **Push** a tu fork:
   \`\`\`bash
   git push origin feature/nombre-descriptivo
   \`\`\`
7. **Abre un Pull Request** hacia \`main\`

### Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- \`feat:\` Nueva característica
- \`fix:\` Corrección de bug
- \`docs:\` Cambios en documentación
- \`style:\` Cambios de formato (no afectan código)
- \`refactor:\` Refactorización de código
- \`test:\` Agregar o modificar tests
- \`chore:\` Cambios en build o herramientas

Ejemplos:
\`\`\`
feat: agregar soporte para múltiples chains
fix: corregir error en conexión de wallet
docs: actualizar guía de deployment
style: formatear componente MintNFT
refactor: simplificar lógica de validación
\`\`\`

## 💅 Estilo de Código

### TypeScript/React

- Usa TypeScript para todo el código
- Componentes funcionales con hooks
- Props con tipos explícitos
- Nombres descriptivos para variables y funciones

Ejemplo:
\`\`\`typescript
// ✅ Bueno
interface MintButtonProps {
  disabled: boolean;
  onMint: () => Promise<void>;
}

export function MintButton({ disabled, onMint }: MintButtonProps) {
  const handleClick = async () => {
    await onMint();
  };

  return (
    <button onClick={handleClick} disabled={disabled}>
      Mint NFT
    </button>
  );
}

// ❌ Malo
export function Button(props: any) {
  return <button onClick={props.fn}>{props.txt}</button>;
}
\`\`\`

### CSS/Tailwind

- Usa clases de Tailwind
- Evita CSS inline cuando sea posible
- Mantén un orden consistente en las clases

Ejemplo:
\`\`\`tsx
// ✅ Bueno
<div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md">

// ❌ Malo
<div className="bg-white p-6 flex gap-4 rounded-lg flex-col shadow-md items-center">
\`\`\`

### Solidity

- Sigue las [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- Documenta funciones públicas con NatSpec
- Usa nombres descriptivos

Ejemplo:
\`\`\`solidity
/// @notice Mintea un NFT gratis para el caller
/// @dev Solo permite un mint por dirección
function mint() public {
    require(_nextTokenId < maxSupply, "Max supply reached");
    require(!hasMinted[msg.sender], "Already minted");
    // ...
}
\`\`\`

## 🧪 Testing

Antes de hacer un PR:

1. **Prueba localmente**:
   \`\`\`bash
   npm run dev
   \`\`\`

2. **Verifica el build**:
   \`\`\`bash
   npm run build
   \`\`\`

3. **Prueba en diferentes navegadores**

4. **Verifica responsive design**

## 📝 Documentación

Al agregar nuevas características:

- Actualiza el README si es necesario
- Agrega comentarios en el código
- Actualiza guías relevantes

## 🎯 Áreas que Necesitan Ayuda

Actualmente buscamos contribuciones en:

- [ ] Tests automatizados
- [ ] Mejoras en UI/UX
- [ ] Soporte para más chains
- [ ] Internacionalización (i18n)
- [ ] Optimizaciones de gas
- [ ] Mejoras en accesibilidad
- [ ] Documentación adicional

## 💬 Preguntas

¿Tienes preguntas? Abre un [Discussion](../../discussions) o un issue con la etiqueta "question".

## 📄 Licencia

Al contribuir, aceptas que tus contribuciones serán licenciadas bajo la misma licencia del proyecto (MIT).

---

¡Gracias por contribuir! 🙏
