[![鲸挑细选 · AgentCompare: cuatro temporizadores en tarjetas de cristal azul, C seleccionado; Desktop y Web, chino e inglés y pasos en directo. Ilustración del producto.](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/hero-bilingual.webp)](#install)

<a id="agentcompare"></a>

# Agent Compare (dsh-agent-compare) · 鲸挑细选

[![GitHub stars](https://img.shields.io/github/stars/lijiaqi-AI-Product-Manager/dsh-agent-compare?label=GitHub%20Stars&color=3657f5&style=flat&labelColor=0b1b4f&cacheSeconds=300)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/stargazers)
[![npm download/下载量](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-badge.svg)](https://www.npmjs.com/package/dsh-agent-compare)

[![Source version](https://img.shields.io/github/package-json/v/lijiaqi-AI-Product-Manager/dsh-agent-compare?label=source&color=3657f5&style=flat&labelColor=0b1b4f)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/package.json)
[![npm version](https://img.shields.io/npm/v/dsh-agent-compare?label=npm&color=3657f5&style=flat&labelColor=0b1b4f&logo=npm&logoColor=white)](https://www.npmjs.com/package/dsh-agent-compare)
[![CI](https://img.shields.io/github/actions/workflow/status/lijiaqi-AI-Product-Manager/dsh-agent-compare/ci.yml?branch=main&label=CI&logo=github&logoColor=white&style=flat&labelColor=0b1b4f)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/actions/workflows/ci.yml)
[![Node.js ^22.22.2 || ^24.15.0 || >=26.0.0](https://img.shields.io/badge/Node.js-22%20%2F%2024%20%2F%2026%2B-238636?style=flat&labelColor=0b1b4f&logo=nodedotjs&logoColor=white)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/package.json)
[![Tested on DSH 0.2.1-rc.5 and 0.2.2-rc.1](https://img.shields.io/badge/DSH%20tested-0.2.1--rc.5%20%2F%200.2.2--rc.1-4d6bfe?style=flat&labelColor=0b1b4f)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/demo.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-4d6bfe?style=flat&labelColor=0b1b4f)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/LICENSE)

[中文](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.md) · [English](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.en.md) · [日本語](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.ja.md) · [한국어](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.ko.md) · **Español** · [Português (Brasil)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.pt-BR.md) · [Français](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.fr.md) · [Deutsch](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.de.md)

**Una tarea, de 2 a 4 versiones: respuestas, archivos o páginas. Elige estilos, compara y decide.**

Su nombre en chino es **鲸挑细选** (*jīng tiāo xì xuǎn*), un juego con 精挑细选, «elegido con cuidado», donde 鲸 significa ballena: 2–4 ballenas de DeepSeek abordan la misma tarea y tú te quedas con la mejor. Su apodo es **大肥鱼赛马**, «la carrera del pez gordo»: en China llaman «pez gordo» a la ballena de DeepSeek, y aquí varios corren en la misma pista mientras tú decides el ganador.

**DSH 桌面端 + 浏览器 / Desktop + Web**

<p align="center"><a href="#demo">真实演示 / Recorded demo</a> · <a href="#ui">界面与体验 / Interface</a> · <a href="#install">安装 / Install</a> · <a href="#whats-new">版本更新 / What's new</a></p>

> **Esta guía corresponde a 3.1.0. La insignia npm de arriba muestra la versión publicada.** DSH Desktop y Web, con interfaz en chino e inglés. Compara 2–4 versiones de respuestas, archivos o páginas web en la conversación principal; abre lo que pensó cada versión y las herramientas que usó, y lee su respuesta junto a lo que construyó.

<a id="demo"></a>

## Ver una carrera del pez gordo completa

[![Ejemplo con candidatos fijos: una ballena por versión en marcha y pasos en vivo, cuatro páginas pomodoro en vivo, C enfocada con su respuesta junto a la página y elegida](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/docs/media/comparison-preview.gif)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/media/comparison-workflow.mp4)

Cuatro peces gordos, cuatro páginas pomodoro: grabación con candidatos fijos en un host DSH real, a partir del código candidato de 3.1.0 y con la interfaz en chino. Cuatro versiones crean una página pomodoro en una carpeta normal mientras dos cometas recorren el borde de la tarjeta de comparación. La ventana grande se abre mientras trabajan: una ballena azul de DeepSeek por versión, con pensamientos sobre la cabeza y sus pasos más recientes en vivo debajo, que contesta al tocarla, y los **Steps** abiertos con el razonamiento y la escritura del archivo en vivo. Las respuestas llegan antes que las páginas, y luego las cuatro páginas en vivo se pueden usar. Se apartan dos, C se enfoca con su respuesta a la izquierda de la página, la elección revela cada estilo y el resultado se guarda en una carpeta nueva antes de seguir la conversación. El vídeo omite las esperas y mantiene el resto a velocidad normal. Se ocultan las rutas locales.

Tras elegir, se marcan dos motivos (diseño y más simple), que llegan a la siguiente petición de la conversación principal.

[Vídeo completo (45 segundos)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/media/comparison-workflow.mp4) · [Condiciones y resultados](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/demo.md)

[![Configurar 2–4 versiones y estilos, ejecutar en paralelo, probar y elegir, revisar y continuar la conversación. Ilustración del producto.](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/comparison-workflow.webp)](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/comparison-workflow.webp)

<p align="center"><sub>功能示意 / Product illustration</sub></p>

AgentCompare es un complemento de [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness), DSH, que compara 2–4 versiones de una misma petición: respuestas, archivos o páginas web. Las páginas ejecutables se pueden usar directamente; las respuestas y los archivos se comparan por su contenido. A ciegas, el modelo y el estilo se revelan al elegir; en comparación abierta se muestran desde el principio. Los cambios del proyecto se revisan junto con sus comprobaciones antes de aplicarlos.

[插件目录与安装](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/distribution.md) · [Plugin directories and installation](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/distribution.en.md) · [Listing status / 收录状态](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/issues/4)

<a id="ui"></a>
<a id="gallery"></a>

## Interfaz y experiencia

Esperar, comparar y elegir: todo se ve y se puede tocar. La animación y las dos imágenes de abajo muestran candidatos fijos en un host DSH real.

- **Vidrio líquido azul.** Paneles de vidrio translúcido y selectores que se deslizan sobre una luz azul que fluye despacio, en tema claro y oscuro; con el movimiento reducido activado, todo se queda quieto. El texto del producto en los estados de interfaz comprobados se midió glifo a glifo en ambos temas, con un contraste de 4.5:1 o más.
- **Un pez gordo te acompaña.** Una ballena azul de DeepSeek por versión se llena de agua azul a medida que avanza mientras dos luces recorren su borde. Le suben pensamientos sobre la cabeza; tócala y te contesta, sigue tocándola y gira, se tambalea y salpica.
- **Cada paso a la vista.** El botón **Steps** muestra razonamientos, llamadas a herramientas y cambios; mientras trabaja, los tres pasos más recientes pasan en vivo bajo la ballena.
- **Respuesta y resultado con el mismo peso.** Una respuesta se muestra sola; una página comparte la tarjeta con su respuesta, y al enfocar una versión la respuesta queda a la izquierda de la página.
- **Cuatro azules para A–D.** En una comparación a ciegas solo ves A–D; los estilos y modelos se revelan tras elegir, con un barrido de luz sobre las tarjetas.
- **Se nota que está en marcha.** Dos cometas recorren el borde de una comparación en curso, y cada página se puede usar en cuanto arranca.
- **Escritorio, navegador y ancho de móvil**, con interfaz en chino e inglés.

Los pasos muestran la información que proporcionan el modelo y el host. Los registros largos conservan el principio y el final, con los recortes indicados; los nombres de estilo se ocultan antes de una elección a ciegas. El nivel de agua indica una etapa, no calidad ni un porcentaje exacto.

![大肥鱼特写：两版同时工作，头上冒出想法，连戳五下会跳、转圈、晕头、溅水花，展开「过程」看实时步骤，回复出现后水注满 / Whale close-up: thoughts, a five-poke combo, live steps and the Steps panel, then replies as the whales fill up; controlled candidates in a real DSH host](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/whale-closeup.webp)

<p align="center"><sub>Primer plano de las ballenas: candidatos fijos; el modelo guionizado espera 9 s por paso para que dé tiempo a verlo; con cortes, el resto a velocidad normal.</sub></p>

![四版页面直接操作 / Four independently interactive pages; controlled candidates in a real DSH host](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/02-live-comparison.png)

![打招呼得到四种回答 / A greeting answered four ways; controlled candidates in a real DSH host](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/03-main-conversation.png)

<details>
<summary>Más vistas: ajustes, respuestas en inglés, ancho de móvil</summary>

![版本、风格与上下文 / Versions, styles and context; controlled candidates in a real DSH host](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/04-comparison-settings.png)

<p align="center"><img src="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/13-english-answers.webp" width="840" alt="Three open English answers from the Three looks quick set: B is the pick, with Layout and More complete as its reasons; controlled candidates in a real DSH host."> <img src="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/14-phone-answer.webp" width="260" alt="390-pixel English answer result in the blue glass interface, with the chosen version and a visible Continue conversation action; controlled candidates in a real DSH host."></p>

</details>

[Las 8 imágenes y las condiciones de captura](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/storefront-gallery.md)

<a id="install"></a>

## Instalación

La interfaz está disponible en chino simplificado e inglés, seleccionables en DSH Desktop y Web.

Los comandos siguientes corresponden a un perfil DSH Web gestionado por el usuario. El perfil `desktop` lo gestiona la aplicación de escritorio; utiliza su página de complementos.

La referencia de desarrollo es Node 26.13.0 y npm 12.2.2. Las comprobaciones actuales usan el paquete oficial DSH 0.2.1-rc.5 / 0.2.2-rc.1. Identifica el perfil de DSH que utilizas.

Instala el paquete npm en el perfil Web predeterminado. La insignia de npm indica el estado de publicación:

```bash
dsh plugin --profile web add dsh-agent-compare
```

Para otro perfil autogestionado, sustituye `web` por su nombre real.

**Reinicia por completo tras actualizar.** Cierra DSH Desktop completamente y vuelve a abrirlo. En Web, reinicia el servicio DSH correspondiente y recarga la página. Recargar solo la interfaz puede dejar activo el backend anterior; si las versiones difieren, aparece un aviso.

También puedes compilar e instalar desde el código fuente:

```bash
git clone https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare.git
cd dsh-agent-compare
npm ci
npm pack
```

Sustituye `<your-profile>` por el nombre real de tu perfil:

```bash
dsh plugin --profile <your-profile> add ./dsh-agent-compare-3.1.0.tgz
```

Reinicia DSH. Antes de actualizar, termina las comparaciones activas y cierra las instancias antiguas que comparten sus registros. No se admite que distintas versiones modifiquen los mismos registros simultáneamente.

## Primera comparación

1. Pulsa **A|B**, abajo a la izquierda del cuadro de conversación. Los ajustes se abren sobre el cuadro existente.
2. Elige 2–4 versiones. El modo predeterminado reutiliza el modelo actual con estilos distintos; puedes seleccionar cada estilo o describirlo en una línea. Si usas modelos distintos, elige entre los ya configurados en DSH.
3. Elige comparación a ciegas o abierta, el límite por versión (5–120 minutos) y el contexto de conversación compartido. Escribe la petición en el cuadro habitual y envíala.
4. Cada tarjeta muestra el progreso y su respuesta, archivos o página. Las páginas en ejecución son interactivas. Puedes cambiar el tamaño de escritorio/móvil, enfocar con 1–4 y volver a todas con 0; con 3–4 versiones puedes apartar las descartadas.
5. Usa «Choose A», por ejemplo, o «None of these» para no elegir ninguna. A ciegas, los modelos y estilos se revelan al elegir; en comparación abierta están visibles desde el principio.
6. Para cambios del proyecto, «Review and adopt» muestra diferencias y comprobaciones antes de una confirmación separada. Fuera de Git puedes guardar en una carpeta nueva. Una respuesta no requiere aplicar archivos. «Continue conversation» vuelve al diálogo conservando la elección.

`试跑内置示例` crea una tienda de ejemplo en otro repositorio; no modifica tu proyecto. La incorporación del resultado también apunta a ese ejemplo. `比较记录` abre el historial y `使用教程` la guía; ambos controles aparecen en conversaciones nuevas y existentes.

## Qué merece comparar

Búsquedas, filtros, formularios, páginas de presentación, paneles y rediseños de componentes: tareas cuya calidad se aprecia al utilizarlas. Para errores con una respuesta clara o refactorizaciones mecánicas suele ser mejor un agente con pruebas.

Con un modelo se comparan una estrategia que conserva la estructura y otra que replantea la interacción. Con dos modelos se mantienen la tarea, las instrucciones y la verificación. Ambos parten del mismo código. Una elección no demuestra que un modelo sea mejor en general.

<a id="whats-new"></a>

## Novedades por versión

**Novedades de 3.1.0:**
- **Cada paso a la vista, en vivo y después.** En cuanto una versión empieza, su tarjeta tiene un botón **Steps**. Al abrirlo aparece el trabajo en orden: razonamientos con lo que tardaron, llamadas a herramientas (leer o editar un archivo, ejecutar un comando…; cada una se abre con su entrada y su salida) y lo que se escribió entre pasos. Mientras trabaja, sus tres pasos más recientes también pasan en vivo bajo la ballena, y al terminar cada paso queda a un clic. En una comparación a ciegas, las palabras que nombran un estilo aparecen como ▒▒.
- **La respuesta, a la vista.** Una versión que solo responde muestra solo su respuesta. Una versión que construyó una página o escribió archivos muestra su respuesta con el mismo peso: encima de la página en paralelo y a la izquierda de la página cuando esa versión está enfocada. La respuesta aparece en cuanto la versión termina, antes que su página.
- **Las páginas, a la vista.** Las páginas estáticas las sirve el propio complemento: se pueden usar en cuanto se escriben, sin un proceso aparte que la aplicación de escritorio pueda detener. Si aun así una página no puede servirse, un resultado HTML se muestra igualmente como página, con su código a un clic.
- **Resultados antes.** Una versión se da por terminada menos de un segundo después de acabar su turno; antes, la comparación esperaba a que otros complementos (de memoria, por ejemplo) liberaran la sesión, unos 40 segundos en un escritorio típico. Las dependencias se instalan desde el archivo de bloqueo mientras las versiones trabajan, y una versión que no las cambió recibe su propia copia; las comprobaciones corren en paralelo y la página se puede usar en cuanto arranca. En el entorno de grabación con candidatos fijos, cuatro versiones Vite pasaron del envío a cuatro páginas utilizables en unos 24–30 segundos.
- **Esperar es divertido.** Cada versión en marcha muestra la ballena azul de DeepSeek, pálida al principio, que se llena de agua azul a medida que avanza, mientras dos luces recorren su borde. De vez en cuando le sube un pensamiento sobre la cabeza: lo que está haciendo, una idea o una invitación a tocarla. Lanza un chorro en cada paso y se gira hacia el puntero; varios toques seguidos la hacen saltar, girar, tambalearse y salpicar, con una frase nueva cada vez. Dos cometas recorren el borde de una comparación en curso (también en motores más antiguos y con temas que detienen las animaciones), sobre una luz azul que fluye despacio.
- **Cuatro azules para A–D.** Las etiquetas de las versiones son cuatro azules distintos.
- **Un aviso para reiniciar DSH.** DSH cambia al momento la interfaz de un complemento, pero mantiene el servidor que cargó al iniciar. Cuando no coinciden, AgentCompare te pide cerrar y volver a abrir DSH, en vez de perder en silencio los pasos y las respuestas.
- **Nombre en chino.** El nombre oficial es «鲸挑细选» y el apodo, «大肥鱼赛马».
- **Incluye también 2.1.0, que no se publicó por separado:** un saludo o una pregunta recibe respuestas en lugar de páginas; vidrio líquido más claro y luminoso, botones más ligeros y controles que se deslizan; en ambos temas, todo el texto de 21 estados de la interfaz alcanza al menos 4.5:1.

**Novedades de 2.0.0:** compara **2, 3 o 4 versiones** a la vez. Cada versión puede tener un **estilo** (alcance: conservador, audaz; aspecto: minimalista, pulido, vibrante; prioridad: amigable, riguroso, ligero; o una línea propia). Compara **a ciegas** (estilos revelados al elegir) o **a la vista** (estilos visibles desde el inicio). Con tres o cuatro versiones puedes **apartar** las que descartas para ver el resto en paralelo, y en la tarjeta las teclas 1–4 enfocan una versión.
- **Nueva interfaz de vidrio líquido azul.** Aurora y polvo de estrellas tras paneles de vidrio, una lente de vidrio que se desliza entre opciones y progreso líquido; un destello al elegir y un barrido de luz al revelar. Compatible con modo oscuro, movimiento reducido y alto contraste.
- **Di por qué ganó.** Tras elegir, marca algunos motivos (diseño, color y acabado, sensación de uso…) o añade una línea; los cambios posteriores en la conversación principal conservan esas virtudes.
- **Combinaciones rápidas.** Un toque fija el número de versiones y sus estilos: Par clásico, Tres estéticas, Tres prioridades, Cuatro direcciones.
- **2–4 versiones con estilos.** Ocho estilos predefinidos o una descripción de una línea; varios modelos pueden compartir un estilo.
- **Comparación a ciegas o abierta.** Prueba cada versión, apártala y restáurala; 1–4 enfoca una versión y 0 muestra todas.
- **Respuestas, archivos y páginas reales.** Lee Markdown y copia respuestas, código, archivos o rutas. Tu elección queda señalada.
- **Continúa en la conversación.** Comparaciones, elecciones, adopciones y deshacer quedan en la memoria de la conversación actual.
- **Desktop + Web, interfaz en chino e inglés.** Reutiliza modelos configurados, revisa los cambios antes de adoptarlos y conserva deshacer y recuperación.

## Ejecución y criterios comunes

En un repositorio Git, incluso sin commits, una instantánea mediante un index privado incluye los cambios sin commit y los archivos no rastreados, salvo los excluidos. En una carpeta fuera de Git, ambas versiones empiezan en un espacio de trabajo privado y vacío, y la elegida puede guardarse en una subcarpeta nueva. El HEAD y el index originales se conservan. Cada propuesta tiene su propio worktree y sesión; los cambios se guardan como un parche binario con hash.

Las comprobaciones se toman del estado inicial: `typecheck`, `lint`, `test`, `build` y la verificación de página configurada. Con archivo de bloqueo se usa una instalación congelada; un fallo no provoca un reintento sin bloqueo. Cambiar las pruebas o su configuración para aprobar una propuesta no la convierte en apta para incorporación directa.

Un [`.agent-compare.json` en la raíz](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/examples/vite-react-demo/.agent-compare.json) permite fijar acciones y expectativas comunes: escribir, pulsar, comprobar texto, visibilidad, cantidades y tamaño de pantalla. La definición se valida antes de generar. Si una aceptación explícita de la página no se ejecuta, se bloquea la incorporación directa. Cuando solo falta la comprobación básica de carga, se indica como advertencia. Responder por HTTP, compilar, cumplir una función y gustarte son resultados distintos.

## Incorporación, deshacer y recuperación

Se combina tu árbol de trabajo actual con los archivos modificados por la propuesta. Los solapamientos detectados detienen la operación. Si cambiaste otros archivos, la combinación se ensaya en una copia temporal. Antes de escribir se vuelven a comprobar el contenido, HEAD e index y se guarda un registro de recuperación.

La incorporación al árbol de trabajo no crea commits, no hace push y no cambia de rama. Incluye archivos nuevos, eliminados y binarios. Una propuesta que no cumple los criterios puede guardarse en una rama para inspeccionarla. Al deshacer o recuperar una operación interrumpida, los cambios posteriores detectados se conservan como conflictos.

El bloqueo del repositorio coordina operaciones del complemento; no bloquea tu editor. Pausa la edición durante la breve fase de escritura.

## Historial y estado de la página

El historial muestra todas las conversaciones de forma predeterminada, con filtro por conversación, búsqueda por tarea, repositorio o identificador y páginas de 30 registros. Se conservan el resultado, la elección y la incorporación. Las notas se entregan a la misma conversación y se reintentan si no está disponible. No se inyectan todos los logs largos en el contexto principal.

Los registros dañados o antiguos quedan en modo de solo lectura con una explicación. Tras reiniciar, una imagen guardada se distingue de una aplicación en ejecución. Si la copia sigue disponible, puedes reabrir la vista previa. Cada apertura usa un nombre `.localhost` nuevo y separa las cookies y el almacenamiento por origen de las propuestas. El estado temporal de la página se reinicia; los registros y las capturas permanecen.

## Compatibilidad y límites

Un worktree no es una barrera de seguridad completa. Se utiliza la política de escritura de DSH; Windows informa **partial**. No se aíslan las lecturas de archivos ni la red. Las cookies en marcos siguen las políticas del navegador y una pestaña externa puede utilizar otro contexto de almacenamiento. No se cubren inicio de sesión, backends externos ni bases de datos compartidas.

Las pruebas nativas cubren Windows, Linux y macOS. Consulta la [matriz detallada](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.en.md#compatibility) para las combinaciones verificadas de npm, pnpm y Yarn y las limitaciones de Windows/PnP. Safari nativo se valida por separado; las pruebas con respuestas controladas no miden la calidad ni el rendimiento de modelos externos.

## Tiempo, coste y evidencia

Cada propuesta consume generación. El paralelismo no garantiza menos tiempo o coste. Puedes detener una o ambas; al agotarse el tiempo se comprueban los cambios ya escritos. Si el proveedor no devuelve uso, se muestra como desconocido, nunca como coste cero.

La [CI](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/actions/workflows/ci.yml) cubre Windows/Linux, Node y navegador. Parte de las integraciones actuales ejecuta sesiones, herramientas y aplicaciones reales con un adaptador local de respuestas fijas: demuestra la ejecución del sistema, no la calidad de un modelo externo. Los casos históricos con modelos reales corresponden a DSH 0.2.1-rc.3. No son una clasificación general ni una promesa de rendimiento.

## Colaboración y licencia

En un [Issue](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/issues), incluye versiones, sistema operativo, pasos, resultado esperado y observado. Evita credenciales, código privado y rutas locales completas. Consulta [CONTRIBUTING.md](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/CONTRIBUTING.md) y [CHANGELOG.md](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/CHANGELOG.md).

```bash
npm ci
npm run typecheck
npm test
npm run test:ui
```

Licencia [MIT](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/LICENSE). Si te ayuda a obtener un resultado útil, puedes apoyar con una Star o un caso reproducible. Compartir y dar una Star es opcional.

<!-- project-growth:start -->

## Evolución del proyecto

**Aviso de mantenimiento:** Según el responsable, el mantenimiento, las mejoras y las correcciones del 11 de noviembre UTC incluyeron una retirada temporal de la mayoría de los mercados, reduciendo la distribución y las solicitudes de ese día. [Aviso de mantenimiento y distribución (inglés)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/maintenance-update-2026-11-11.en.md).

<a href="https://www.npmjs.com/package/dsh-agent-compare">
<picture>
  <source media="(max-width: 600px) and (prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-mobile-dark.svg">
  <source media="(max-width: 600px)" srcset="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-dark.svg">
  <img src="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-light.svg" width="960" alt="AgentCompare · Total npm download requests since first publication">
</picture>
</a>

Solicitudes acumuladas de npm desde la primera publicación, para todas las versiones públicas. La tarjeta indica la fecha de corte; puede incluir tráfico repetido o automatizado.

[Definición del total y actualización automática](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/npm-total-downloads.md)

La insignia Star consulta GitHub con unos cinco minutos de caché. Las solicitudes acumuladas de npm se actualizan a diario a las 19:00 de China (UTC+8); la ejecución puede retrasarse.

<!-- project-growth:end -->
