[![鲸挑细选 · AgentCompare: vier Timer in blauen Glaskarten, C ausgewählt; Desktop und Web, Chinesisch und Englisch, Live-Schritte. Produktillustration.](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/hero-bilingual.webp)](#install)

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

[中文](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.md) · [English](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.en.md) · [日本語](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.ja.md) · [한국어](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.ko.md) · [Español](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.es.md) · [Português (Brasil)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.pt-BR.md) · [Français](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.fr.md) · **Deutsch**

**Eine Aufgabe, zwei bis vier Versionen: Antworten, Dateien oder Seiten. Stile wählen, vergleichen und entscheiden.**

Der chinesische Name ist **鲸挑细选** (*jīng tiāo xì xuǎn*), ein Wortspiel mit 精挑细选, „sorgfältig ausgewählt“, wobei 鲸 Wal bedeutet: 2–4 DeepSeek-Wale nehmen sich dieselbe Aufgabe vor, und Sie behalten die beste Version. Sein Spitzname ist **大肥鱼赛马**, „das Rennen der dicken Fische“: In China heißt der DeepSeek-Wal im Netz „dicker Fisch“, und hier laufen mehrere auf derselben Bahn, während Sie den Sieger küren.

**DSH 桌面端 + 浏览器 / Desktop + Web**

<p align="center"><a href="#demo">真实演示 / Recorded demo</a> · <a href="#ui">界面与体验 / Interface</a> · <a href="#install">安装 / Install</a> · <a href="#whats-new">版本更新 / What's new</a></p>

> **Diese Anleitung beschreibt 3.1.0. Das npm-Badge oben zeigt die veröffentlichte Version.** DSH Desktop und Web, mit chinesischer und englischer Oberfläche. 2–4 Versionen von Antworten, Dateien oder Webseiten im Hauptgespräch vergleichen; die Überlegungen und Werkzeugaufrufe jeder Version aufklappen und ihre Antwort neben dem Ergebnis lesen.

<a id="demo"></a>

## Ein ganzes Rennen der dicken Fische ansehen

[![Beispiel mit festen Kandidaten: ein Wal je arbeitender Version und Schritte live, vier laufende Pomodoro-Seiten, C im Fokus mit der Antwort neben der Seite und gewählt](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/docs/media/comparison-preview.gif)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/media/comparison-workflow.mp4)

Vier dicke Fische, vier Pomodoro-Seiten: Aufzeichnung mit festen Kandidaten in einem echten DSH-Host, aus dem Quellstand des 3.1.0-Kandidaten und mit chinesischer Oberfläche. Vier Versionen bauen in einem gewöhnlichen Ordner je eine Pomodoro-Seite, während zwei Kometen um die Vergleichskarte jagen. Das große Fenster wird geöffnet, während sie arbeiten: ein blauer DeepSeek-Wal je Version, mit Gedanken über dem Kopf und seinen neuesten Schritten live darunter, der auf einen Stups antwortet, und die **Steps** mit Überlegung und Dateischreiben live. Die Antworten erscheinen vor den Seiten, danach lassen sich alle vier laufenden Seiten bedienen. Zwei werden beiseitegelegt, C steht im Fokus mit der Antwort links neben der Seite, die Wahl deckt jeden Stil auf, und das Ergebnis wird in einem neuen Ordner gespeichert, bevor das Gespräch weitergeht. Das Video lässt Wartezeiten aus und zeigt den Rest in normaler Geschwindigkeit. Lokale Pfade sind ausgeblendet.

Nach der Wahl werden zwei Gründe (Layout, einfacher) angetippt; sie erreichen die nächste Anfrage im Hauptgespräch.

[Vollständiges Video (45 Sekunden)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/media/comparison-workflow.mp4) · [Bedingungen und Ergebnisse](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/demo.md)

[![2–4 Versionen und Stile festlegen, parallel ausführen, ausprobieren und wählen, dann prüfen und das Gespräch fortsetzen. Produktillustration.](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/comparison-workflow.webp)](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/comparison-workflow.webp)

<p align="center"><sub>功能示意 / Product illustration</sub></p>

AgentCompare ist ein Plugin für [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness), kurz DSH. Es vergleicht zwei bis vier Versionen derselben Aufgabe als Antworten, Dateien oder Webseiten. Lauffähige Seiten kannst du direkt bedienen; Antworten und Dateien vergleichst du inhaltlich. Blind werden Modell und Stil nach der Wahl aufgedeckt, offen sind sie von Anfang an sichtbar. Änderungen am Projekt werden mit ihren Prüfergebnissen vor der Übernahme angesehen.

[插件目录与安装](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/distribution.md) · [Plugin directories and installation](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/distribution.en.md) · [Listing status / 收录状态](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/issues/4)

<a id="ui"></a>
<a id="gallery"></a>

## Oberfläche und Erlebnis

Warten, Vergleichen und Auswählen: Alles ist sichtbar und anklickbar. Die Animation und die beiden Bilder unten zeigen feste Kandidaten in einem echten DSH-Host.

- **Blaues Flüssigglas.** Durchscheinende Glasflächen und gleitende Auswahlelemente vor langsam fließendem blauem Licht, im hellen und dunklen Thema; mit reduzierter Bewegung bleibt alles still. Produkttexte in den geprüften Oberflächenzuständen wurden in beiden Themen Glyphe für Glyphe gemessen und erreichten mindestens 4.5:1 Kontrast.
- **Ein dicker Fisch leistet Gesellschaft.** Ein blauer DeepSeek-Wal je Version füllt sich mit dem Fortschritt mit blauem Wasser, während zwei Lichter um seinen Rand laufen. Über seinem Kopf steigen Gedanken auf; ein Stups, und er antwortet, noch mehr, und er dreht sich, taumelt und spritzt.
- **Jeder Schritt sichtbar.** Die Schaltfläche **Steps** listet Überlegungen, Werkzeugaufrufe und Änderungen; während eine Version arbeitet, laufen ihre neuesten drei Schritte live unter dem Wal mit.
- **Antwort und Ergebnis gleichrangig.** Eine Antwort steht für sich; eine Seite teilt sich die Karte mit ihrer Antwort, und im Fokus steht die Antwort links neben der Seite.
- **Vier Blautöne für A–D.** Im Blindvergleich sehen Sie nur A–D; Stile und Modelle werden nach der Wahl aufgedeckt, mit einem Lichtschweif über die Karten.
- **Man sieht, dass es läuft.** Zwei Kometen jagen um einen laufenden Vergleich, und jede Seite ist bedienbar, sobald sie startet.
- **Desktop, Browser und Handybreite**, mit chinesischer und englischer Oberfläche.

Schritte zeigen nur Informationen, die Modell und Host bereitstellen. Lange Aufzeichnungen behalten Anfang und Ende und kennzeichnen Kürzungen; Stilnamen bleiben vor der blinden Wahl verdeckt. Der Wasserstand zeigt eine Arbeitsphase, keine Qualitätsnote oder exakte Prozentzahl.

![大肥鱼特写：两版同时工作，头上冒出想法，连戳五下会跳、转圈、晕头、溅水花，展开「过程」看实时步骤，回复出现后水注满 / Whale close-up: thoughts, a five-poke combo, live steps and the Steps panel, then replies as the whales fill up; controlled candidates in a real DSH host](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/whale-closeup.webp)

<p align="center"><sub>Nahaufnahme der Wale: feste Kandidaten; das Skriptmodell wartet 9 s pro Schritt, damit man zusehen kann; geschnitten, sonst Originalgeschwindigkeit.</sub></p>

![四版页面直接操作 / Four independently interactive pages; controlled candidates in a real DSH host](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/02-live-comparison.png)

![打招呼得到四种回答 / A greeting answered four ways; controlled candidates in a real DSH host](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/03-main-conversation.png)

<details>
<summary>Weitere Ansichten: Einstellungen, englische Antworten, Handybreite</summary>

![版本、风格与上下文 / Versions, styles and context; controlled candidates in a real DSH host](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/04-comparison-settings.png)

<p align="center"><img src="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/13-english-answers.webp" width="840" alt="Three open English answers from the Three looks quick set: B is the pick, with Layout and More complete as its reasons; controlled candidates in a real DSH host."> <img src="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/14-phone-answer.webp" width="260" alt="390-pixel English answer result in the blue glass interface, with the chosen version and a visible Continue conversation action; controlled candidates in a real DSH host."></p>

</details>

[Alle 8 Bilder und Aufnahmebedingungen](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/storefront-gallery.md)

<a id="install"></a>

## Installation

Oberflächensprachen: vereinfachtes Chinesisch und Englisch, in DSH Desktop und Web umschaltbar.

Die folgenden Befehle gelten für ein selbst verwaltetes DSH-Web-Profil. Das Profil `desktop` wird von der Desktop-App verwaltet; verwenden Sie deren Plugin-Seite.

Entwicklungsgrundlage sind Node 26.13.0 und npm 12.2.2. Die aktuellen Prüfungen verwenden das offizielle DSH-Paket 0.2.1-rc.5 / 0.2.2-rc.1. Ermittle den Namen deines vorhandenen DSH-Profils.

Installiere das npm-Paket im voreingestellten Web-Profil. Das npm-Badge zeigt den Veröffentlichungsstatus:

```bash
dsh plugin --profile web add dsh-agent-compare
```

Für ein anderes selbst verwaltetes Profil ersetzt du `web` durch dessen tatsächlichen Namen.

**Nach einem Update vollständig neu starten.** Beende DSH Desktop ganz und öffne es erneut. Bei Web startest du den betreffenden DSH-Dienst neu und lädst die Seite nach. Nur die Oberfläche neu zu laden kann das alte Backend weiterlaufen lassen; unterschiedliche Versionen lösen einen Neustarthinweis aus.

Alternativ aus dem Quellcode bauen und installieren:

```bash
git clone https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare.git
cd dsh-agent-compare
npm ci
npm pack
```

Ersetze `<your-profile>` durch den tatsächlichen Profilnamen:

```bash
dsh plugin --profile <your-profile> add ./dsh-agent-compare-3.1.0.tgz
```

Starte DSH neu. Beende vor einem Update aktive Vergleiche und schließe ältere Instanzen, die dieselben Aufzeichnungen verwenden. Gleichzeitige Änderungen durch unterschiedliche Plugin-Versionen werden nicht unterstützt.

## Der erste Vergleich

1. Klicke links unten im Gesprächseingabefeld auf **A|B**. Die Einstellungen öffnen sich über dem vorhandenen Feld.
2. Wähle zwei bis vier Versionen. Standardmäßig wird das aktuelle Modell mit verschiedenen Stilen verwendet; wähle jeden Stil oder beschreibe ihn in einer Zeile. Für unterschiedliche Modelle nutzt du die bereits in DSH eingerichteten.
3. Wähle blind oder offen, die Generierungsgrenze je Version (5–120 Minuten) und den geteilten Gesprächskontext. Schreibe die Aufgabe in das gewohnte Feld und sende sie ab.
4. Jede Karte zeigt Fortschritt sowie eine Antwort, Dateien oder eine Seite. Laufende Seiten sind bedienbar. Nutze Desktop-/Mobilbreite, Fokus mit 1–4 und Gesamtansicht mit 0; bei drei bis vier Versionen kannst du verworfene beiseitelegen.
5. Wähle etwa mit „Choose A“ eine Version oder mit „None of these“ keine. Blind werden Modelle und Stile nach der Wahl aufgedeckt; offen sind sie von Anfang an sichtbar.
6. Bei Projektänderungen zeigt „Review and adopt“ Unterschiede und Prüfungen vor einer gesonderten Bestätigung. Außerhalb von Git speicherst du in einen neuen Ordner. Eine reine Antwort muss keine Dateien übernehmen. „Continue conversation“ kehrt mit erhaltener Auswahl zum Gespräch zurück.

`试跑内置示例` erstellt einen separaten Beispielshop und verändert dein Projekt nicht. Eine Übernahme betrifft ebenfalls dieses Beispiel. `比较记录` öffnet den Verlauf, `使用教程` die Anleitung. Beide Einstiege sind in neuen und bestehenden Gesprächen vorhanden.

## Welche Aufgaben lohnen sich?

Suche und Filter, Formulare, Landingpages, Dashboards und Komponentenumbauten: Aufgaben, bei denen die Benutzung zur Qualitätsentscheidung beiträgt. Für einen Fehler mit klarer Lösung oder ein mechanisches Refactoring ist ein einzelner Agent mit Tests oft passender.

Beim gleichen Modell erhält eine Strategie mehr Bestehendes, während die andere die Interaktion neu gestaltet. Bei zwei Modellen bleiben Aufgabe, Anweisungen und Prüfungen gleich. Beide beginnen mit demselben Codezustand. Eine einzelne Wahl ist kein allgemeines Modellranking.

<a id="whats-new"></a>

## Neuerungen nach Version

**Neu in 3.1.0:**
- **Jeder Schritt sichtbar, live und danach.** Sobald eine Version arbeitet, hat ihre Karte eine Schaltfläche **Steps**. Aufgeklappt zeigt sie die Arbeit der Reihe nach: Überlegungen mit Dauer, Werkzeugaufrufe (Datei lesen, Datei bearbeiten, Befehl ausführen …; jeder lässt sich mit Ein- und Ausgabe öffnen) und was zwischen den Schritten geschrieben wurde. Während die Version arbeitet, laufen ihre neuesten drei Schritte außerdem live unter dem Wal mit, und nach dem Ende bleibt jeder Schritt einen Klick entfernt. Im Blindvergleich erscheinen Wörter, die einen Stil verraten, als ▒▒.
- **Die Antwort, direkt sichtbar.** Eine Version, die nur antwortet, zeigt nur ihre Antwort. Eine Version, die eine Seite gebaut oder Dateien geschrieben hat, zeigt ihre Antwort gleichrangig: nebeneinander über der Seite, im Fokus links neben der Seite. Die Antwort erscheint, sobald die Version fertig ist, noch vor ihrer Seite.
- **Seiten direkt sichtbar.** Statische Seiten liefert das Plugin selbst aus; sie sind bedienbar, sobald sie geschrieben sind, ohne eigenen Prozess, den die Desktop-App beenden könnte. Lässt sich eine Seite trotzdem nicht ausliefern, wird ein HTML-Ergebnis dennoch als Seite gezeigt, der Quelltext ist einen Klick entfernt.
- **Ergebnisse früher.** Eine Version gilt binnen einer Sekunde nach dem Ende ihres Zugs als fertig; früher wartete der Vergleich, bis andere Plugins (etwa Gedächtnis-Plugins) die Sitzung freigaben, auf einem typischen Desktop rund 40 Sekunden. Abhängigkeiten werden aus der Lockdatei installiert, während die Versionen arbeiten, und eine Version, die sie nicht geändert hat, bekommt eine eigene Kopie; Prüfungen laufen parallel, und die Seite ist bedienbar, sobald sie startet. In der Aufnahmeumgebung mit festen Kandidaten waren vier Vite-Versionen etwa 24–30 Sekunden nach dem Senden als vier nutzbare Seiten da.
- **Warten macht Spaß.** Jede arbeitende Version zeigt das blaue Wal-Logo von DeepSeek, anfangs hell, das sich mit dem Fortschritt mit blauem Wasser füllt, während zwei Lichter um seinen Rand laufen. Ab und zu steigt ein Gedanke über seinem Kopf auf: was er gerade tut, eine Idee oder die Einladung, ihn anzustupsen. Bei jedem Schritt bläst er eine Fontäne und dreht sich zum Zeiger; mehrere Stupser hintereinander lassen ihn springen, sich drehen, taumeln und spritzen, jedes Mal mit einem neuen Satz. Zwei Kometen jagen um einen laufenden Vergleich (auch in älteren Engines und unter Themen, die Animationen anhalten), über langsam fließendem blauem Licht.
- **Vier Blautöne für A–D.** Die Versionsetiketten sind vier verschiedene Blautöne.
- **Erinnerung an den Neustart.** DSH tauscht die Oberfläche eines Plugins sofort aus, behält aber das Backend, das es beim Start geladen hat. Weichen beide voneinander ab, bittet AgentCompare darum, DSH zu beenden und neu zu öffnen, statt still Schritte und Antworten zu verlieren.
- **Ein chinesischer Name.** Offiziell heißt das Plugin „鲸挑细选“, Spitzname „大肥鱼赛马“.
- **Enthält auch 2.1.0, die nicht einzeln veröffentlicht wurde:** Ein Gruß oder eine Frage bekommt Antworten statt Seiten; helleres, klareres Flüssigglas, leichtere Schaltflächen und gleitende Bedienelemente; in beiden Themen erreicht jeder Text in 21 Zuständen der Oberfläche mindestens 4.5:1.

**Neu in 2.0.0:** Vergleiche **2, 3 oder 4 Versionen** gleichzeitig. Jede Version kann einen **Stil** erhalten (Umfang: konservativ, mutig; Wirkung: minimal, ausgefeilt, lebendig; Priorität: zugänglich, gründlich, schlank; oder eine eigene Zeile). Vergleiche **blind** (Stile nach der Wahl aufgedeckt) oder **offen** (Stile von Anfang an sichtbar). Bei drei oder vier Versionen legst du verworfene Versionen **beiseite**, damit die übrigen nebeneinander stehen; in der Karte fokussieren die Tasten 1–4 eine Version.
- **Neue Oberfläche in blauem Flüssigglas.** Aurora und Sternenstaub hinter Glasflächen, eine Glaslinse, die zwischen Optionen gleitet, und flüssiger Fortschritt; ein Lichtfunke bei der Wahl und ein Lichtstreif beim Aufdecken. Dunkelmodus, reduzierte Bewegung und hoher Kontrast werden unterstützt.
- **Sagen, warum sie gewinnt.** Nach der Wahl ein paar Gründe antippen (Layout, Farbe und Material, Bediengefühl …) oder eine Zeile ergänzen; spätere Änderungen im Hauptgespräch behalten diese Stärken bei.
- **Schnellsets.** Ein Tipp setzt Anzahl und Stile der Versionen: Klassisches Paar, Drei Looks, Drei Prioritäten, Vier Richtungen.
- **2–4 Versionen mit Stilen.** Acht Vorlagen oder eine eigene Zeile; verschiedene Modelle können denselben Stil verwenden.
- **Blind oder offen vergleichen.** Versionen ausprobieren, zurückstellen und wiederherstellen; 1–4 fokussiert eine Version, 0 zeigt alle.
- **Antworten, Dateien und laufende Seiten.** Markdown lesen und Antworten, Code, Dateiinhalte oder Pfade kopieren. Die eigene Wahl ist klar markiert.
- **Im Hauptgespräch weiterarbeiten.** Vergleiche, Auswahl, Übernahme und Rücknahme bleiben im Gedächtnis des aktuellen Gesprächs.
- **Desktop + Web, Oberfläche auf Chinesisch und Englisch.** Vorhandene Modelle nutzen und Änderungen vor der Übernahme prüfen; Rücknahme und Wiederherstellung bleiben verfügbar.

## Ausführung und gemeinsame Prüfungen

In einem Git-Repository, auch ohne Commit, erfasst ein privater Index uncommittete Änderungen und nicht verfolgte Dateien, mit den vorgesehenen Ausschlüssen. In einem Ordner außerhalb von Git beginnen beide Versionen in einem leeren, privaten Arbeitsbereich; die gewählte Version lässt sich in einem neuen Unterordner speichern. Ursprünglicher HEAD und Index bleiben erhalten. Jede Implementierung verwendet einen eigenen Worktree und eine eigene Sitzung; die Änderung wird als binärer Patch mit Hash gespeichert.

Die Prüfungen stammen aus dem Ausgangszustand: `typecheck`, `lint`, `test`, `build` sowie konfigurierte Seitenprüfungen. Bei vorhandenem Lockfile wird unveränderlich installiert; ein Fehlschlag löst keinen ungebundenen Neuversuch aus. Veränderte Tests oder Prüfkonfigurationen zählen nicht als gültiger Nachweis für die direkte Übernahme.

Eine [`.agent-compare.json` im Projektstamm](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/examples/vite-react-demo/.agent-compare.json) kann gemeinsame Eingaben, Klicks, Texte, Sichtbarkeit, Elementanzahl und Bildschirmgrößen festlegen. Die Definition wird vor der Generierung validiert. Eine nicht ausgeführte explizite Seitenabnahme verhindert die direkte Übernahme. Fehlt lediglich die einfache Ladeprüfung, wird eine Warnung angezeigt. HTTP-Erreichbarkeit, erfolgreicher Build, erfüllte Funktion und persönliche Präferenz sind unterschiedliche Ergebnisse.

## Übernahme, Rücknahme und Wiederherstellung

Die Übernahme kombiniert den aktuellen Arbeitsbaum mit den vom Vorschlag geänderten Pfaden. Erkannte Überschneidungen stoppen den Vorgang. Änderungen an anderen Dateien werden zusammen mit dem Vorschlag in einer temporären Kopie geprüft. Inhalt, HEAD und Index werden vor dem Schreiben erneut kontrolliert; ein Wiederherstellungsjournal wird gespeichert.

Eine Übernahme in den Arbeitsbaum erzeugt keinen automatischen Commit, führt keinen Push aus und wechselt keinen Branch. Neue, gelöschte und binäre Dateien sind enthalten. Ein Vorschlag, der die Kriterien nicht erfüllt, kann als Prüfbranch gespeichert werden. Bei Rücknahme oder Wiederherstellung bleiben erkannte spätere Bearbeitungen als Konflikte zur Prüfung erhalten.

Die Repository-Sperre koordiniert Plugin-Vorgänge, sperrt jedoch keine externen Editoren. Pausiere Änderungen während der kurzen Schreibphase.

## Verlauf und Seitenzustand

Der Verlauf zeigt standardmäßig alle Gespräche, mit Filter für das aktuelle Gespräch, Suche nach Aufgabe, Repository oder Kennung und 30 Einträgen pro Seite. Ergebnis, Wahl und Übernahme bleiben gespeichert. Hinweise werden an dasselbe Gespräch zugestellt und bei vorübergehender Nichtverfügbarkeit erneut versucht. Lange Protokolle werden nicht vollständig in den Hauptkontext eingefügt.

Alte oder beschädigte Aufzeichnungen bleiben mit Begründung schreibgeschützt erhalten. Nach einem Neustart werden gespeicherte Prüfbilder von laufenden Anwendungen unterschieden. Ist die Kopie noch vorhanden, kann die Vorschau neu gestartet werden. Jeder Start erhält eine neue `.localhost`-Adresse, damit Cookies und Origin-Speicher nicht zwischen den Vorschlägen geteilt werden. Temporärer Seitenzustand wird zurückgesetzt; Vergleichsaufzeichnungen und Bilder bleiben erhalten.

## Kompatibilität und Grenzen

Ein Worktree ist keine vollständige Sicherheitsgrenze. Das Plugin nutzt die DSH-Schreibrichtlinie; unter Windows wird sie als **partial** gemeldet. Dateilesen und Netzwerk sind nicht isoliert. Eingebettete Cookies folgen den Browserrichtlinien; ein externer Tab kann einen anderen Speicherkontext verwenden. Anmeldung, externe Backends und gemeinsam genutzte Datenbanken liegen außerhalb des aktuellen Umfangs.

Native Prüfungen decken Windows, Linux und macOS ab. Die [Kompatibilitätsmatrix](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.en.md#compatibility) nennt geprüfte Kombinationen von npm, pnpm und Yarn sowie die Grenzen unter Windows/PnP. Natives Safari wird getrennt geprüft; kontrollierte Testantworten messen weder Qualität noch Laufzeit externer Modelle.

## Laufzeit, Kosten und Nachweise

Beide Vorschläge verbrauchen Generierung. Parallele Ausführung garantiert weder geringere Kosten noch kürzere Dauer. Du kannst einen Vorschlag oder beide stoppen. Nach Ablauf der Grenze werden bereits geschriebene Änderungen geprüft. Nicht gemeldeter Verbrauch wird als unbekannt und niemals als null dargestellt.

Die [CI](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/actions/workflows/ci.yml) prüft Windows/Linux, Node und den Browser. Ein Teil der aktuellen Integrationstests nutzt echte Sitzungen, Werkzeuge und Anwendungen mit einem lokalen Adapter mit festen Antworten. Das belegt die Ausführung, nicht die Qualität eines externen Modells. Historische Fälle mit echten Modellen stammen aus DSH 0.2.1-rc.3; sie sind weder Modellranking noch allgemeines Leistungsversprechen.

## Mitwirken und Lizenz

Gib in einem [Issue](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/issues) Versionen, Betriebssystem, Schritte sowie erwartetes und beobachtetes Ergebnis an. Veröffentliche keine Zugangsdaten, privaten Quelltexte oder vollständigen lokalen Pfade. Weitere Hinweise stehen in [CONTRIBUTING.md](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/CONTRIBUTING.md) und [CHANGELOG.md](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/CHANGELOG.md).

```bash
npm ci
npm run typecheck
npm test
npm run test:ui
```

Lizenz: [MIT](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/LICENSE). Wenn ein brauchbares Ergebnis entsteht, kannst du das Projekt mit einem Star oder einem reproduzierbaren Beispiel unterstützen. Teilen und Stars sind freiwillig.

<!-- project-growth:start -->

## Projektentwicklung

**Wartungshinweis:** Laut Projektverantwortlichem wurden am 11. November UTC für Wartung, Verbesserungen und Korrekturen die Einträge in den meisten Plugin-Märkten vorübergehend zurückgezogen. Dadurch gingen Vertrieb und Anfragen an diesem Tag zurück. [Wartungs- und Vertriebshinweis (Englisch)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/maintenance-update-2026-11-11.en.md).

<a href="https://www.npmjs.com/package/dsh-agent-compare">
<picture>
  <source media="(max-width: 600px) and (prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-mobile-dark.svg">
  <source media="(max-width: 600px)" srcset="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-dark.svg">
  <img src="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-light.svg" width="960" alt="AgentCompare · Total npm download requests since first publication">
</picture>
</a>

Kumulierte npm-Downloadanfragen seit der ersten Veröffentlichung, über alle öffentlichen Versionen. Die Karte nennt den Datenstand; wiederholte und automatisierte Zugriffe können enthalten sein.

[Gesamtzählung und automatische Aktualisierung](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/npm-total-downloads.md)

Der Star-Badge liest GitHub mit etwa fünf Minuten Cache. Die kumulierten npm-Anfragen werden täglich um 19:00 Uhr in China (UTC+8) aktualisiert; die Ausführung kann sich verzögern.

<!-- project-growth:end -->
