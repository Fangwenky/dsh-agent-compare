[![鲸挑细选 · Agent Compare（大肥鱼赛马）：在主对话里比较 2–4 版回答、文件与网页。Desktop + Web，中英双语，选择后继续对话 / Compare 2–4 answers, files and live pages in the main conversation. Styles, blind or open comparison, reasons for the pick, reviewed adoption and conversation memory, in a blue liquid-glass interface. Product illustration.](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/hero-bilingual.webp)](#install)

<a id="agentcompare"></a>

# Agent Compare (dsh-agent-compare) · 鲸挑细选

[![GitHub stars](https://img.shields.io/github/stars/lijiaqi-AI-Product-Manager/dsh-agent-compare?label=GitHub%20Stars&color=3657f5&style=flat&labelColor=0b1b4f&cacheSeconds=300)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/stargazers)
[![npm download/下载量](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-badge.svg)](https://www.npmjs.com/package/dsh-agent-compare)

[![Source version](https://img.shields.io/github/package-json/v/lijiaqi-AI-Product-Manager/dsh-agent-compare?label=source&color=3657f5&style=flat&labelColor=0b1b4f)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/package.json)
[![npm version](https://img.shields.io/npm/v/dsh-agent-compare?label=npm&color=3657f5&style=flat&labelColor=0b1b4f&logo=npm&logoColor=white)](https://www.npmjs.com/package/dsh-agent-compare)
[![CI](https://img.shields.io/github/actions/workflow/status/lijiaqi-AI-Product-Manager/dsh-agent-compare/ci.yml?branch=main&label=CI&logo=github&logoColor=white&style=flat&labelColor=0b1b4f)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/actions/workflows/ci.yml)
[![Node.js ^22.22.2 || ^24.15.0 || >=26.0.0](https://img.shields.io/badge/Node.js-22%20%2F%2024%20%2F%2026%2B-238636?style=flat&labelColor=0b1b4f&logo=nodedotjs&logoColor=white)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/package.json)
[![Tested on DSH 0.2.1-rc.5](https://img.shields.io/badge/DSH%20tested-0.2.1--rc.5-4d6bfe?style=flat&labelColor=0b1b4f)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/demo.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-4d6bfe?style=flat&labelColor=0b1b4f)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/LICENSE)

[中文](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.md) · [English](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.en.md) · [日本語](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.ja.md) · [한국어](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.ko.md) · [Español](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.es.md) · **Português (Brasil)** · [Français](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.fr.md) · [Deutsch](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.de.md)

**Uma tarefa. De 2 a 4 implementações em execução. Escolha estilos, compare às cegas ou abertamente e aplique.**

O nome em chinês é **鲸挑细选** (*jīng tiāo xì xuǎn*), um trocadilho com 精挑细选, «escolhido a dedo», em que 鲸 quer dizer baleia: 2–4 baleias do DeepSeek encaram a mesma tarefa e você fica com a melhor. O apelido é **大肥鱼赛马**, «a corrida do peixe gordo»: na China a baleia do DeepSeek é chamada de «peixe gordo», e aqui vários correm na mesma pista enquanto você decide o vencedor.

**DSH 桌面端 + 浏览器 / Desktop + Web**

<p align="center"><a href="#demo">真实演示 / Recorded demo</a> · <a href="#ui">界面与体验 / Interface</a> · <a href="#install">安装 / Install</a> · <a href="#whats-new">版本更新 / What's new</a></p>

> **npm estável 2.0.0 · Código de main 3.1.0.** DSH Desktop e Web, com interface em chinês e inglês. Compare 2–4 versões de respostas, arquivos ou páginas web na conversa principal; abra o raciocínio e as chamadas de ferramentas de cada versão e leia a resposta ao lado do que ela construiu.

<a id="demo"></a>

## Veja uma corrida do peixe gordo inteira

[![Exemplo com candidatos fixos: uma baleia por versão em andamento e passos ao vivo, quatro páginas pomodoro ao vivo, C em foco com a resposta ao lado da página e escolhida](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/docs/media/comparison-preview.gif)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/media/comparison-workflow.mp4)

Quatro peixes gordos, quatro páginas pomodoro: gravação com candidatos fixos em um host DSH real, a partir do código candidato da 3.1.0, com interface em chinês. Quatro versões criam uma página pomodoro numa pasta comum enquanto dois cometas percorrem a borda do cartão de comparação. A janela grande é aberta enquanto elas trabalham: uma baleia azul do DeepSeek por versão, com pensamentos acima da cabeça e os passos mais recentes ao vivo embaixo, que responde a um toque, e os **Steps** abertos com o raciocínio e a escrita do arquivo ao vivo. As respostas chegam antes das páginas, e depois as quatro páginas ao vivo podem ser usadas. Duas são deixadas de lado, C fica em foco com a resposta à esquerda da página, a escolha revela cada estilo e o resultado é salvo numa pasta nova antes de continuar a conversa. O vídeo corta a espera e mantém o restante em velocidade normal. Caminhos locais estão ocultos.

Depois da escolha, dois motivos (layout e mais simples) são marcados e chegam ao próximo pedido da conversa principal.

[Vídeo completo (45 segundos)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/media/comparison-workflow.mp4) · [Condições e resultados](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/demo.md)

[![设定 2–4 版与风格，并行实跑，体验后选择并说明理由，审查并继续主对话 / Set up, run, choose and say why, review and continue. Answers, files, live pages and conversation memory. Product illustration.](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/comparison-workflow.webp)](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/comparison-workflow.webp)

<p align="center"><sub>功能示意 / Product illustration</sub></p>

AgentCompare é um plugin do [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness), ou DSH. De 2 a 4 agentes trabalham em cópias independentes da mesma tarefa. O plugin instala dependências, compila, serve cada aplicação e executa critérios comuns de verificação. Você testa as páginas antes de escolher uma ou nenhuma; numa comparação às cegas, o modelo e o estilo são revelados na escolha. Antes de aplicar uma versão, ele verifica a combinação com o estado atual do seu projeto.

[插件目录与安装](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/distribution.md) · [Plugin directories and installation](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/distribution.en.md) · [Listing status / 收录状态](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/issues/4)

<a id="ui"></a>
<a id="gallery"></a>

## Interface e experiência

Esperar, comparar e escolher: tudo fica visível e clicável. A animação e as duas imagens abaixo mostram candidatos fixos num host DSH real.

- **Vidro líquido azul.** Painéis de vidro translúcido e seletores que deslizam sobre uma luz azul que flui devagar, nos temas claro e escuro; com movimento reduzido ativado, tudo fica parado. Cada texto é medido glifo a glifo nos dois temas, com contraste de 4.5:1 ou mais.
- **Um peixe gordo faz companhia.** Uma baleia azul do DeepSeek por versão se enche de água azul conforme avança, enquanto duas luzes percorrem a borda. Pensamentos sobem acima da cabeça; toque e ela responde, continue tocando e ela gira, cambaleia e espirra água.
- **Cada passo à vista.** O botão **Steps** lista raciocínios, chamadas de ferramentas e alterações; enquanto a versão trabalha, os três passos mais recentes passam ao vivo sob a baleia.
- **Resposta e resultado com o mesmo peso.** Uma resposta aparece sozinha; uma página divide o cartão com a resposta, e em foco a resposta fica à esquerda da página.
- **Quatro azuis para A–D.** Numa comparação às cegas você só vê A–D; estilos e modelos são revelados depois da escolha, com um feixe de luz passando pelos cartões.
- **Dá para ver que está rodando.** Dois cometas percorrem a borda de uma comparação em andamento, e cada página pode ser usada assim que inicia.
- **Desktop, navegador e largura de celular**, com interface em chinês e inglês.

![大肥鱼特写：两版同时工作，头上冒出想法，连戳五下会跳、转圈、晕头、溅水花，展开「过程」看实时步骤，回复出现后水注满 / Whale close-up: thoughts, a five-poke combo, live steps and the Steps panel, then replies as the whales fill up; controlled candidates in a real DSH host](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/whale-closeup.webp)

<p align="center"><sub>Close das baleias: candidatos fixos; o modelo roteirizado espera 9 s por passo para dar tempo de ver; com cortes, o resto em velocidade normal.</sub></p>

![四版页面直接操作 / Four independently interactive pages; controlled candidates in a real DSH host](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/02-live-comparison.png)

![打招呼得到四种回答 / A greeting answered four ways; controlled candidates in a real DSH host](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/03-main-conversation.png)

<details>
<summary>Mais telas: configurações, respostas em inglês, largura de celular</summary>

![版本、风格与上下文 / Versions, styles and context; controlled candidates in a real DSH host](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/04-comparison-settings.png)

<p align="center"><img src="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/13-english-answers.webp" width="840" alt="Three open English answers from the Three looks quick set: B is the pick, with Layout and More complete as its reasons; controlled candidates in a real DSH host."> <img src="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/14-phone-answer.webp" width="260" alt="390-pixel English answer result in the blue glass interface, with the chosen version and a visible Continue conversation action; controlled candidates in a real DSH host."></p>

</details>

[As 8 imagens e as condições de captura](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/storefront-gallery.md)

<a id="install"></a>

## Instalação

A interface está disponível em chinês simplificado e inglês, selecionáveis no DSH Desktop e Web.

Os comandos abaixo são para um perfil DSH Web gerenciado pelo usuário. O perfil `desktop` é gerenciado pelo aplicativo de desktop; use a página de plugins do aplicativo.

A referência de desenvolvimento é Node 26.13.0 com npm 12.2.2. As verificações atuais usam o pacote oficial DSH 0.2.1-rc.5. Identifique o perfil que você já utiliza no DSH.

Instale o pacote npm no perfil Web padrão. O selo do npm indica o estado de publicação:

```bash
dsh plugin --profile web add dsh-agent-compare
```

Para outro perfil gerenciado por você, substitua `web` pelo nome real.

Também é possível compilar e instalar a partir do código-fonte:

```bash
git clone https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare.git
cd dsh-agent-compare
npm ci
npm pack
```

Substitua `<your-profile>` pelo nome real do seu perfil:

```bash
dsh plugin --profile <your-profile> add ./dsh-agent-compare-3.1.0.tgz
```

Reinicie o DSH. Antes de atualizar, finalize as comparações ativas e feche instâncias antigas que usam os mesmos registros. Não há suporte a alterações simultâneas por versões diferentes do plugin.

## Primeira comparação

1. Clique em **A|B** no canto inferior esquerdo da caixa de conversa. Os ajustes aparecem acima do campo existente.
2. O padrão usa o modelo atual com duas estratégias, sem exigir uma segunda conta. No modo de dois modelos, escolha entre os modelos já configurados no DSH.
3. Escolha na interface o limite de geração de cada versão: 5–120 minutos, com padrão de 30. Escreva apenas o pedido e envie. Não é necessário digitar parâmetros.
4. O cartão da conversa mostra o progresso e as duas aplicações interativas. Há visualização de desktop e celular, foco em A ou B e uma janela maior.
5. Use `选 A`, `选 B` ou `都不满意` para escolher A, B ou nenhuma. Depois aparecem a estratégia ou o modelo real, as verificações e o uso informado.
6. Em `审查并采用`, confira o repositório de destino e as condições de aplicação. Uma confirmação separada escreve os arquivos. `继续主对话` encerra o modo de comparação e volta ao campo original.

`试跑内置示例` cria um repositório separado com uma loja de exemplo, sem alterar seu projeto. A aplicação do resultado também ocorre nesse exemplo. `比较记录` abre o histórico e `使用教程` abre o guia, tanto em conversas novas quanto existentes.

## Quando vale comparar

Busca e filtros, formulários, páginas de apresentação, painéis e reformulação de componentes: tarefas em que usar o resultado ajuda a julgar sua qualidade. Para um bug com resposta clara ou uma refatoração mecânica, um agente com testes costuma ser mais adequado.

Com um modelo, uma estratégia preserva a estrutura e a outra reconsidera a interação. Com dois modelos, mantêm-se pedido, instruções e verificações. As duas versões partem do mesmo código. Uma escolha não determina qual modelo é melhor em geral.

<a id="whats-new"></a>

## Novidades por versão

**Novidades da versão 3.1.0:**
- **Cada passo à vista, ao vivo e depois.** Assim que uma versão começa, o cartão ganha um botão **Steps**. Ao abrir, o trabalho aparece em ordem: raciocínios com o tempo de cada um, chamadas de ferramentas (ler ou editar um arquivo, executar um comando…; cada uma abre com entrada e saída) e o que foi escrito entre os passos. Enquanto trabalha, os três passos mais recentes também passam ao vivo sob a baleia, e depois de terminar cada passo fica a um clique. Numa comparação às cegas, palavras que nomeiam um estilo aparecem como ▒▒.
- **A resposta, direto na tela.** Uma versão que só responde mostra apenas a resposta. Uma versão que construiu uma página ou escreveu arquivos mostra a resposta com o mesmo peso: acima da página lado a lado e à esquerda da página quando essa versão está em foco. A resposta aparece assim que a versão termina, antes da página.
- **Páginas direto na tela.** Páginas estáticas são servidas pelo próprio plugin: podem ser usadas assim que são escritas, sem um processo separado que o aplicativo de desktop possa encerrar. Se mesmo assim uma página não puder ser servida, um resultado HTML aparece como página do mesmo jeito, com o código a um clique.
- **Resultados mais cedo.** Uma versão conta como pronta menos de um segundo depois que o turno termina; antes, a comparação esperava outros plugins (de memória, por exemplo) liberarem a sessão, cerca de 40 segundos num desktop típico. As dependências são instaladas a partir do lockfile enquanto as versões trabalham, e uma versão que não as alterou recebe a própria cópia; as verificações rodam em paralelo e a página pode ser usada assim que inicia. No ambiente de gravação com candidatos fixos, quatro versões Vite foram do envio a quatro páginas utilizáveis em cerca de 24–30 segundos.
- **Esperar ficou divertido.** Cada versão em andamento mostra a baleia azul do DeepSeek, clara no início, que se enche de água azul conforme avança, enquanto duas luzes percorrem a borda. De vez em quando sobe um pensamento acima da cabeça dela: o que está fazendo, uma ideia ou um convite para tocá-la. Ela solta um esguicho a cada passo e se vira para o ponteiro; vários toques seguidos a fazem pular, girar, cambalear e espirrar água, com uma fala nova a cada vez. Dois cometas percorrem a borda de uma comparação em andamento (também em motores mais antigos e com temas que param animações), sobre uma luz azul que flui devagar.
- **Quatro azuis para A–D.** As etiquetas das versões são quatro azuis diferentes.
- **Um lembrete para reiniciar o DSH.** O DSH troca na hora a interface de um plugin, mas mantém o servidor que carregou ao iniciar. Quando os dois não batem, o AgentCompare pede para fechar e reabrir o DSH, em vez de perder em silêncio os passos e as respostas.
- **Nome em chinês.** O nome oficial é «鲸挑细选» e o apelido, «大肥鱼赛马».
- **Inclui também a 2.1.0, que não foi publicada separadamente:** uma saudação ou uma pergunta recebe respostas em vez de páginas; vidro líquido mais claro e luminoso, botões mais leves e controles que deslizam; nos dois temas, todo texto em 21 estados da interface tem pelo menos 4.5:1.

**Novidades da versão 2.0.0:** compare **2, 3 ou 4 versões** de uma vez. Cada versão pode ter um **estilo** (alcance: conservador, ousado; aparência: minimalista, refinado, vibrante; prioridade: amigável, rigoroso, leve; ou uma linha própria). Compare **às cegas** (estilos revelados na escolha) ou **abertamente** (estilos visíveis desde o início). Com três ou quatro versões, **deixe de lado** as que descartou para comparar o restante lado a lado; no cartão, as teclas 1–4 focam uma versão.
- **Nova interface de vidro líquido azul.** Aurora e poeira estelar atrás de painéis de vidro, uma lente de vidro que desliza entre as opções e progresso líquido; um brilho ao escolher e uma faixa de luz ao revelar. Suporta modo escuro, movimento reduzido e alto contraste.
- **Diga por que venceu.** Depois da escolha, marque alguns motivos (layout, cor e acabamento, sensação de uso…) ou escreva uma linha; as mudanças seguintes na conversa principal mantêm esses pontos fortes.
- **Combinações rápidas.** Um toque define o número de versões e os estilos: Par clássico, Três visuais, Três prioridades, Quatro direções.
- **2–4 versões com estilos.** Oito estilos prontos ou uma descrição em uma linha; modelos diferentes podem usar o mesmo estilo.
- **Comparação cega ou aberta.** Experimente, separe e restaure versões; 1–4 foca uma versão e 0 mostra todas.
- **Respostas, arquivos e páginas reais.** Leia Markdown e copie respostas, código, conteúdos ou caminhos. Sua escolha fica marcada.
- **Continue na conversa.** Comparações, escolhas, adoção e desfazer ficam na memória da conversa atual.
- **Desktop + Web, interface em chinês e inglês.** Reutilize modelos configurados e revise antes de adotar, com desfazer e recuperação disponíveis.

## Execução e verificação comum

Em um repositório Git, mesmo sem commits, um index privado registra alterações sem commit e arquivos não rastreados, exceto os excluídos. Em uma pasta fora do Git, as duas versões começam em um espaço de trabalho privado e vazio, e a escolhida pode ser salva em uma nova subpasta. O HEAD e o index originais são preservados. Cada versão tem seu worktree e sua sessão; a diferença é guardada como patch binário com hash.

As verificações vêm da base: `typecheck`, `lint`, `test`, `build` e a verificação de página configurada. Havendo lockfile, a instalação é congelada; uma falha não provoca nova tentativa sem congelamento. Alterar testes ou configurações para fazer uma versão passar não é uma aprovação válida para aplicação direta.

Um [`.agent-compare.json` na raiz](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/examples/vite-react-demo/.agent-compare.json) permite definir ações e expectativas comuns: preencher, clicar, conferir texto, visibilidade, quantidade e tamanho da tela. A definição é validada antes da geração. Se uma aceitação explícita de página não rodar, a aplicação direta é bloqueada. Se apenas a checagem básica de carregamento não puder rodar, isso aparece como aviso. Resposta HTTP, compilação, funcionamento e preferência pessoal são resultados diferentes.

## Aplicação, desfazer e recuperar

O plugin combina seu estado atual com os caminhos alterados pela versão escolhida. Sobreposições detectadas interrompem a aplicação. Se você mudou outros arquivos, a combinação passa por um ensaio em uma cópia temporária. Antes de escrever, conteúdo, HEAD e index são conferidos novamente, e um registro de recuperação é salvo.

A aplicação na árvore de trabalho não faz commit, push nem troca de branch automaticamente. Arquivos novos, removidos e binários fazem parte da diferença. Uma versão que não atende aos critérios pode ser salva em uma branch para análise. Ao desfazer ou recuperar uma interrupção, edições posteriores detectadas são mantidas como conflitos.

O bloqueio do repositório coordena operações do plugin; ele não bloqueia o editor. Pause as edições durante a breve etapa de escrita.

## Histórico e estado das páginas

O histórico começa com todas as conversas, com filtro da conversa atual, busca por pedido, repositório ou identificador e páginas de 30 registros. Resultado, escolha e aplicação são preservados. As notas são entregues à mesma conversa, com novas tentativas se ela estiver indisponível. Logs longos não são inseridos integralmente no contexto principal.

Registros antigos ou danificados permanecem somente para leitura, com explicação. Depois de reiniciar, capturas salvas são identificadas como imagens estáticas. Se a cópia ainda existe, a prévia pode ser reaberta. Cada abertura usa um endereço `.localhost` novo, separando cookies e armazenamento por origem entre as versões. O estado temporário da página é reiniciado; registros e capturas continuam disponíveis.

## Compatibilidade e limites

Um worktree não é uma barreira completa de segurança. O plugin usa a política de escrita do DSH; no Windows, a proteção é informada como **partial**. Leituras de arquivos e rede não são isoladas. Cookies em páginas incorporadas seguem a política do navegador, e uma aba externa pode ter outro contexto de armazenamento. Login, backends externos e bancos de dados compartilhados ficam fora do escopo atual.

Os testes nativos cobrem Windows, Linux e macOS. A [matriz detalhada](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.en.md#compatibility) distingue as combinações verificadas de npm, pnpm e Yarn e as limitações de Windows/PnP. O Safari nativo é validado separadamente; respostas controladas dos testes não medem a qualidade nem o desempenho de modelos externos.

## Tempo, custo e evidências

Cada versão consome geração; paralelismo não garante economia de tempo ou dinheiro. É possível parar uma ou ambas. Quando o limite termina, o plugin verifica o que já foi escrito. Uso não informado aparece como desconhecido, nunca como custo zero.

A [CI](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/actions/workflows/ci.yml) cobre Windows/Linux, Node e navegador. Parte das integrações atuais usa um adaptador local de respostas fixas, com sessões, ferramentas e aplicações reais. Isso demonstra execução, sem medir a qualidade de um modelo externo. Os casos históricos com modelos reais são do DSH 0.2.1-rc.3 e não devem virar ranking ou promessa de desempenho.

## Contribuição e licença

Ao abrir uma [Issue](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/issues), informe versões, sistema, passos e resultados esperados e observados. Não publique credenciais, código privado ou caminhos locais completos. Consulte [CONTRIBUTING.md](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/CONTRIBUTING.md) e [CHANGELOG.md](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/CHANGELOG.md).

```bash
npm ci
npm run typecheck
npm test
npm run test:ui
```

Licença [MIT](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/LICENSE). Se o resultado for útil, você pode apoiar com uma Star ou um caso reproduzível. Compartilhar e dar Star são decisões opcionais.

<!-- project-growth:start -->

## Crescimento do projeto

**Aviso de manutenção:** Segundo o mantenedor, a manutenção, as melhorias e as correções de 11 de novembro UTC incluíram a retirada temporária da maioria dos mercados, reduzindo a distribuição e as solicitações naquele dia. [Aviso de manutenção e distribuição (inglês)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/maintenance-update-2026-11-11.en.md).

<a href="https://www.npmjs.com/package/dsh-agent-compare">
<picture>
  <source media="(max-width: 600px) and (prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-mobile-dark.svg">
  <source media="(max-width: 600px)" srcset="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-dark.svg">
  <img src="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-light.svg" width="960" alt="AgentCompare · Total npm download requests since first publication">
</picture>
</a>

Solicitações acumuladas do npm desde a primeira publicação, em todas as versões públicas. O cartão informa a data de corte; pode incluir acessos repetidos ou automatizados.

[Definição do total e atualização automática](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/npm-total-downloads.md)

O selo Star consulta o GitHub com cerca de cinco minutos de cache. As solicitações acumuladas do npm são atualizadas diariamente às 19h na China (UTC+8); a execução pode atrasar.

<!-- project-growth:end -->
