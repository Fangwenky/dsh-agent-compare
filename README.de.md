[![鲸挑细选: vier Timer-Entwürfe für eine Idee, rote Tomate C ausgewählt. Produktillustration.](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/hero-bilingual.webp)](#demo)

<a id="agentcompare"></a>
<a id="agent-compare-dsh-agent-compare--鲸挑细选"></a>

# AgentCompare · 鲸挑细选

[![GitHub stars](https://img.shields.io/github/stars/lijiaqi-AI-Product-Manager/dsh-agent-compare?label=GitHub%20Stars&color=3657f5&style=flat&labelColor=0b1b4f&cacheSeconds=300)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/stargazers)
[![npm download/下载量](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-badge.svg)](https://www.npmjs.com/package/dsh-agent-compare)
[![npm version](https://img.shields.io/npm/v/dsh-agent-compare?label=npm&color=3657f5&style=flat&labelColor=0b1b4f&logo=npm&logoColor=white)](https://www.npmjs.com/package/dsh-agent-compare)
[![CI](https://img.shields.io/github/actions/workflow/status/lijiaqi-AI-Product-Manager/dsh-agent-compare/ci.yml?branch=main&label=CI&logo=github&logoColor=white&style=flat&labelColor=0b1b4f)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-4d6bfe?style=flat&labelColor=0b1b4f)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/LICENSE)

[中文](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.md) · [English](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.en.md) · [日本語](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.ja.md) · [한국어](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.ko.md) · [Español](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.es.md) · [Português (Brasil)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.pt-BR.md) · [Français](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.fr.md) · **Deutsch**

**Eine Idee, mehr Wege, sie Wirklichkeit werden zu lassen!**

**鲸挑细选 · AgentCompare** ist ein Vergleichsplugin für [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (DSH), installiert als `dsh-agent-compare`. Sende eine Aufgabe im Hauptgespräch, vergleiche 2–4 Antworten, Dateien oder ausführbare Seiten und wähle die Version, die zu deiner Idee passt. Für **DSH Desktop + Web**, mit chinesischer und englischer Oberfläche.

<p align="center"><a href="#demo">Demo ansehen</a> · <a href="#ui">Oberfläche</a> · <a href="#tasks">Aufgaben</a> · <a href="#install">Installieren</a> · <a href="#support">Support und Grenzen</a> · <a href="#whats-new">Versionen</a></p>

> Dieser Leitfaden beschreibt den Quellstand 3.1.0; das npm-Badge zeigt die veröffentlichte Version.

<a id="demo"></a>
<a id="ein-ganzes-rennen-der-dicken-fische-ansehen"></a>

## Einen Vergleich in Aktion sehen

[![Kontrollierte Kandidaten im echten Host: Wale, Schritte, vier Seiten, Wahlgründe, Speichern und Fortsetzen.](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/docs/media/comparison-preview.gif)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/media/comparison-workflow.mp4)

Aufnahme mit kontrollierten Kandidaten in einem echten DSH-Host: Wale und Live-Schritte, interaktive Seiten, die Wahl von C mit Gründen, Speichern und Rückkehr ins Gespräch. Wartezeiten sind gekürzt; der Rest läuft in Originalgeschwindigkeit.

[Vollständiges Video · 45 Sekunden](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/media/comparison-workflow.mp4) · [Aufnahmebedingungen und Ergebnisse](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/demo.md)

[![2–4 Versionen und Stile festlegen, ausführen, ausprobieren und wählen, prüfen und fortsetzen. Produktillustration.](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/comparison-workflow.webp)](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/comparison-workflow.webp)

Versionen und Stile festlegen → parallel ausführen → ausprobieren und wählen → prüfen und fortsetzen. Das Diagramm ist eine Produktillustration.

<a id="ui"></a>
<a id="gallery"></a>

## Oberfläche und Erlebnis

Diese Bilder und Animationen zeigen kontrollierte Kandidaten in einem echten DSH-Host. Sie zeigen die tatsächliche Oberfläche und den Ablauf; Modellqualität und Laufzeiten werden getrennt beschrieben.

[![Echte Oberfläche: vier interaktive Seiten mit ihren Antworten und Schritten.](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/02-live-comparison.png)](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/02-live-comparison.png)

Bediene alle vier Seiten direkt und lies die jeweilige Antwort neben dem Ergebnis. Steps zeigt die vom Host gelieferten Gedanken und Werkzeugaufrufe.

- **Blaues Flüssigglas.** Durchscheinende Glasflächen und gleitende Auswahlelemente vor langsam fließendem blauem Licht, im hellen und dunklen Thema; mit reduzierter Bewegung bleibt alles still. Produkttexte in den geprüften Oberflächenzuständen wurden in beiden Themen Glyphe für Glyphe gemessen und erreichten mindestens 4.5:1 Kontrast.
- **Ein dicker Fisch leistet Gesellschaft.** Ein blauer DeepSeek-Wal je Version füllt sich mit dem Fortschritt mit blauem Wasser, während zwei Lichter um seinen Rand laufen. Über seinem Kopf steigen Gedanken auf; ein Stups, und er antwortet, noch mehr, und er dreht sich, taumelt und spritzt.
- **Jeder Schritt sichtbar.** Die Schaltfläche **Steps** listet Überlegungen, Werkzeugaufrufe und Änderungen; während eine Version arbeitet, laufen ihre neuesten drei Schritte live unter dem Wal mit.
- **Antwort und Ergebnis gleichrangig.** Eine Antwort steht für sich; eine Seite teilt sich die Karte mit ihrer Antwort, und im Fokus steht die Antwort links neben der Seite.
- **Vier Blautöne für A–D.** Im Blindvergleich sehen Sie nur A–D; Stile und Modelle werden nach der Wahl aufgedeckt, mit einem Lichtschweif über die Karten.
- **Man sieht, dass es läuft.** Zwei Kometen jagen um einen laufenden Vergleich, und jede Seite ist bedienbar, sobald sie startet.
- **Desktop, Browser und Handybreite**, mit chinesischer und englischer Oberfläche.

Schritte zeigen nur Informationen, die Modell und Host bereitstellen. Lange Aufzeichnungen behalten Anfang und Ende und kennzeichnen Kürzungen; Stilnamen bleiben vor der blinden Wahl verdeckt. Der Wasserstand zeigt eine Arbeitsphase, keine Qualitätsnote oder exakte Prozentzahl.

[![Animation der echten Oberfläche: sich füllende Wale, Gedankenblasen, wiederholtes Antippen und Live-Schritte.](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/whale-closeup.webp)](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/whale-closeup.webp)

<p align="center"><sub>Nahaufnahme der Wale: feste Kandidaten; das Skriptmodell wartet 9 s pro Schritt, damit man zusehen kann; geschnitten, sonst Originalgeschwindigkeit.</sub></p>

[![Echte Oberfläche: Antwort neben der ausgewählten Seite, mit Wahlgründen gespeichert.](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/05-saved-result.png)](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/05-saved-result.png)

Im Fokus steht die Antwort neben der Seite. Gründe für die Wahl bleiben erhalten; speichere oder prüfe Änderungen und kehre ins gleiche Gespräch zurück.

<details>
<summary>Weitere echte Ansichten: Antworten, Einstellungen, Englisch und Handybreite</summary>

[![Echte Oberfläche: ein Gruß im Projekt erhält vier Antworten ohne Dateiänderung oder Build.](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/03-main-conversation.png)](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/03-main-conversation.png)

[![Echte Oberfläche: Versionen, Stile und Gesprächskontext einstellen.](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/04-comparison-settings.png)](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/04-comparison-settings.png)

[![Echte englische Oberfläche: drei Antworten, B mit Gründen ausgewählt.](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/13-english-answers.webp)](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/13-english-answers.webp)

<p align="center"><a href="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/14-phone-answer.webp"><img src="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/14-phone-answer.webp" width="260" alt="Echte englische Oberfläche bei 390 Pixeln: Antwort und Aktion zum Fortsetzen des Gesprächs."></a></p>

</details>

[Weitere echte Ansichten: Antworten, Einstellungen, Englisch und Handybreite](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/storefront-gallery.md)

<a id="tasks"></a>
<a id="welche-aufgaben-lohnen-sich"></a>

## Welche Aufgaben lohnen sich?

| Deine Aufgabe | Was du vergleichst |
|---|---|
| Antwort, Analyse oder Text | Unterschiedliche Ansätze und Formulierungen, formatiert nebeneinander und direkt kopierbar. |
| Skripte, Dokumente oder andere Dateien | Dateien und Antworten jeder Version; die Wahl in einem neuen Ordner speichern. |
| Seiten und Änderungen an Oberflächen | Ausführbare Seiten bedienen, gemeinsame Prüfungen ansehen und vor der Übernahme prüfen. |

<details>
<summary>Details zu Modellen, Stilen und Aufgabenwahl</summary>

Suche und Filter, Formulare, Landingpages, Dashboards und Komponentenumbauten: Aufgaben, bei denen die Benutzung zur Qualitätsentscheidung beiträgt. Für einen Fehler mit klarer Lösung oder ein mechanisches Refactoring ist ein einzelner Agent mit Tests oft passender.

Beim gleichen Modell erhalten 2–4 Versionen unterschiedliche Stile: acht Vorlagen oder eine eigene einzeilige Anweisung. Für einen Modellvergleich wählen Sie 2–4 in DSH eingerichtete Modelle; Aufgabe, Stil und Prüfungen bleiben gleich. In Git starten alle mit demselben Codezustand, außerhalb von Git mit leeren Kopien. Eine einzelne Wahl ist kein allgemeines Modellranking.

</details>

<a id="install"></a>

## Installation

### DSH Desktop

1. Installiere `dsh-agent-compare` in der App über **Plugins → Add plugin**.
2. Beende DSH vollständig und öffne es erneut, damit Oberfläche und Backend aktualisiert werden.
3. Klicke unten links im Haupt-Eingabefeld auf **A|B**, wähle Versionen und Stile und sende die Aufgabe.

### Selbst betriebenes DSH Web

Oberflächensprachen: vereinfachtes Chinesisch und Englisch, in DSH Desktop und Web umschaltbar.

Die folgenden Befehle gelten für ein selbst verwaltetes DSH-Web-Profil. Das Profil `desktop` wird von der Desktop-App verwaltet; verwenden Sie deren Plugin-Seite.

Entwicklungsgrundlage sind Node 26.13.0 und npm 12.2.2. Die aktuellen Prüfungen verwenden das offizielle DSH-Paket 0.2.1-rc.5 / 0.2.2-rc.1. Ermittle den Namen deines vorhandenen DSH-Profils.

Installiere das npm-Paket im voreingestellten Web-Profil. Das npm-Badge zeigt den Veröffentlichungsstatus:

```bash
dsh plugin --profile web add dsh-agent-compare
```

Für ein anderes selbst verwaltetes Profil ersetzt du `web` durch dessen tatsächlichen Namen.

**Nach einem Update vollständig neu starten.** Beende DSH Desktop ganz und öffne es erneut. Bei Web startest du den betreffenden DSH-Dienst neu und lädst die Seite nach. Nur die Oberfläche neu zu laden kann das alte Backend weiterlaufen lassen; unterschiedliche Versionen lösen einen Neustarthinweis aus.

<details>
<summary>Aus dem Quellcode bauen und installieren</summary>

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

</details>

Starte DSH neu. Beende vor einem Update aktive Vergleiche und schließe ältere Instanzen, die dieselben Aufzeichnungen verwenden. Gleichzeitige Änderungen durch unterschiedliche Plugin-Versionen werden nicht unterstützt.

<a id="use"></a>
<a id="der-erste-vergleich"></a>

## Der erste Vergleich

1. Klicke links unten im Gesprächseingabefeld auf **A|B**. Die Einstellungen öffnen sich über dem vorhandenen Feld.
2. Wähle zwei bis vier Versionen. Standardmäßig wird das aktuelle Modell mit verschiedenen Stilen verwendet; wähle jeden Stil oder beschreibe ihn in einer Zeile. Für unterschiedliche Modelle nutzt du die bereits in DSH eingerichteten.
3. Wähle blind oder offen, die Generierungsgrenze je Version (5–120 Minuten) und den geteilten Gesprächskontext. Schreibe die Aufgabe in das gewohnte Feld und sende sie ab.
4. Jede Karte zeigt Fortschritt sowie eine Antwort, Dateien oder eine Seite. Laufende Seiten sind bedienbar. Nutze Desktop-/Mobilbreite, Fokus mit 1–4 und Gesamtansicht mit 0; bei drei bis vier Versionen kannst du verworfene beiseitelegen.
5. Wähle etwa mit „Choose A“ eine Version oder mit „None of these“ keine. Blind werden Modelle und Stile nach der Wahl aufgedeckt; offen sind sie von Anfang an sichtbar.
6. Bei Projektänderungen zeigt „Review and adopt“ Unterschiede und Prüfungen vor einer gesonderten Bestätigung. Außerhalb von Git speicherst du in einen neuen Ordner. Eine reine Antwort muss keine Dateien übernehmen. „Continue conversation“ kehrt mit erhaltener Auswahl zum Gespräch zurück.

`试跑内置示例` erstellt einen separaten Beispielshop und verändert dein Projekt nicht. Eine Übernahme betrifft ebenfalls dieses Beispiel. `比较记录` öffnet den Verlauf, `使用教程` die Anleitung. Beide Einstiege sind in neuen und bestehenden Gesprächen vorhanden.

Teilen Sie keinen Kontext, die letzten Gesprächsrunden oder ausgewählte Nachrichten. Standard sind die letzten 3 Runden; der übermittelte Auszug lässt sich vorher ansehen. Lange Inhalte werden mit sichtbarem Hinweis gekürzt. Alle Versionen erhalten denselben Auszug; Ergebnis und Auswahlgründe gehen in das ursprüngliche Gespräch zurück.

<a id="support"></a>

## Unterstützung und praktische Grenzen

[![Source version](https://img.shields.io/github/package-json/v/lijiaqi-AI-Product-Manager/dsh-agent-compare?label=source&color=3657f5&style=flat&labelColor=0b1b4f)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/package.json)
[![Node.js ^22.22.2 || ^24.15.0 || >=26.0.0](https://img.shields.io/badge/Node.js-22%20%2F%2024%20%2F%2026%2B-238636?style=flat&labelColor=0b1b4f&logo=nodedotjs&logoColor=white)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/package.json)
[![Tested on DSH 0.2.1-rc.5 and 0.2.2-rc.1](https://img.shields.io/badge/DSH%20tested-0.2.1--rc.5%20%2F%200.2.2--rc.1-4d6bfe?style=flat&labelColor=0b1b4f)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/demo.md)

- Live-Seiten benötigen ein ausführbares Webprojekt; Antworten und Dateien lassen sich ebenfalls vergleichen. Der Projektleitfaden unterscheidet normale Ordner, Repositories und Unterordner.
- Jede Version verursacht Modellnutzung. Zeit und Kosten hängen von Aufgabe und Modell ab; parallele Ausführung garantiert weder geringere Kosten noch kürzere Wartezeit.
- Prüfe vor der Übernahme und bewahre Rücknahme- und Wiederherstellungsdaten auf. Eine Arbeitskopie ist keine vollständige virtuelle Maschine: DSH stellt die Schreibgrenze bereit, Lesen und Netzwerk sind nicht isoliert, und Windows meldet den tatsächlichen Schutzumfang.
- Außerhalb von Git starten Versionen in leeren Kopien und lesen keine vorhandenen Dateien. Aktiviere Git zuerst in den Einstellungen, um vorhandene Inhalte zu ändern. Ergebnisse werden in einem neuen Unterordner gespeichert.

[Projekte und normale Ordner](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/workspaces-and-projects.md) · [Paketmanager-Matrix](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/package-managers.md) · [Kompatibilität und Safari-Grenzen](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.en.md#compatibility)

[Plugin-Verzeichnisse und Installation](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/distribution.en.md) · [Stand der Einreichungen und Prüfungen](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/issues/4)

<a id="details"></a>

## Mehr erfahren: Prüfungen, Wiederherstellung und erweiterte Einstellungen

### Ausführung und gemeinsame Prüfungen

In einem Git-Repository, auch ohne Commit, erfasst ein privater Index uncommittete Änderungen und nicht verfolgte Dateien, mit den vorgesehenen Ausschlüssen. In einem Ordner außerhalb von Git beginnen alle Versionen in einem leeren, privaten Arbeitsbereich; die gewählte Version lässt sich in einem neuen Unterordner speichern. Ursprünglicher HEAD und Index bleiben erhalten. Jede Implementierung verwendet einen eigenen Worktree und eine eigene Sitzung; die Änderung wird als binärer Patch mit Hash gespeichert.

Die Prüfungen stammen aus dem Ausgangszustand: `typecheck`, `lint`, `test`, `build` sowie konfigurierte Seitenprüfungen. Bei vorhandenem Lockfile wird unveränderlich installiert; ein Fehlschlag löst keinen ungebundenen Neuversuch aus. Veränderte Tests oder Prüfkonfigurationen zählen nicht als gültiger Nachweis für die direkte Übernahme.

Eine [`.agent-compare.json` im Projektstamm](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/examples/vite-react-demo/.agent-compare.json) kann gemeinsame Eingaben, Klicks, Texte, Sichtbarkeit, Elementanzahl und Bildschirmgrößen festlegen. Die Definition wird vor der Generierung validiert. Eine nicht ausgeführte explizite Seitenabnahme verhindert die direkte Übernahme. Fehlt lediglich die einfache Ladeprüfung, wird eine Warnung angezeigt. HTTP-Erreichbarkeit, erfolgreicher Build, erfüllte Funktion und persönliche Präferenz sind unterschiedliche Ergebnisse.

Die Vorinstallation gilt für Projekte mit npm-Lockdatei, ohne anderen deklarierten Paketmanager, Installationsskripte im Stammverzeichnis oder lokale Abhängigkeiten. Nur Versionen mit Manifesten wie im Ausgangszustand erhalten eine eigene Kopie. Andernfalls, bei Änderungen oder Kopierfehlern, erfolgt die normale Installation der jeweiligen Version ohne gelockerte Lockdateiprüfung.

### Übernahme, Rücknahme und Wiederherstellung

Die Übernahme kombiniert den aktuellen Arbeitsbaum mit den vom Vorschlag geänderten Pfaden. Erkannte Überschneidungen stoppen den Vorgang. Änderungen an anderen Dateien werden zusammen mit dem Vorschlag in einer temporären Kopie geprüft. Inhalt, HEAD und Index werden vor dem Schreiben erneut kontrolliert; ein Wiederherstellungsjournal wird gespeichert.

Eine Übernahme in den Arbeitsbaum erzeugt keinen automatischen Commit, führt keinen Push aus und wechselt keinen Branch. Neue, gelöschte und binäre Dateien sind enthalten. Ein Vorschlag, der die Kriterien nicht erfüllt, kann als Prüfbranch gespeichert werden. Bei Rücknahme oder Wiederherstellung bleiben erkannte spätere Bearbeitungen als Konflikte zur Prüfung erhalten.

Die Repository-Sperre koordiniert Plugin-Vorgänge, sperrt jedoch keine externen Editoren. Pausiere Änderungen während der kurzen Schreibphase.

### Verlauf und Seitenzustand

Der Verlauf zeigt standardmäßig alle Gespräche, mit Filter für das aktuelle Gespräch, Suche nach Aufgabe, Repository oder Kennung und 30 Einträgen pro Seite. Ergebnis, Wahl und Übernahme bleiben gespeichert. Hinweise werden an dasselbe Gespräch zugestellt und bei vorübergehender Nichtverfügbarkeit erneut versucht. Lange Protokolle werden nicht vollständig in den Hauptkontext eingefügt.

Alte oder beschädigte Aufzeichnungen bleiben mit Begründung schreibgeschützt erhalten. Nach einem Neustart werden gespeicherte Prüfbilder von laufenden Anwendungen unterschieden. Ist die Kopie noch vorhanden, kann die Vorschau neu gestartet werden. Jeder Start erhält eine neue `.localhost`-Adresse, damit Cookies und Origin-Speicher nicht zwischen den Vorschlägen geteilt werden. Temporärer Seitenzustand wird zurückgesetzt; Vergleichsaufzeichnungen und Bilder bleiben erhalten.

### Kompatibilität und Grenzen

Ein Worktree ist keine vollständige Sicherheitsgrenze. Das Plugin nutzt die DSH-Schreibrichtlinie; unter Windows wird sie als **partial** gemeldet. Dateilesen und Netzwerk sind nicht isoliert. Eingebettete Cookies folgen den Browserrichtlinien; ein externer Tab kann einen anderen Speicherkontext verwenden. Anmeldung, externe Backends und gemeinsam genutzte Datenbanken liegen außerhalb des aktuellen Umfangs.

Native Prüfungen decken Windows, Linux und macOS ab. Die [Kompatibilitätsmatrix](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.en.md#compatibility) nennt geprüfte Kombinationen von npm, pnpm und Yarn sowie die Grenzen unter Windows/PnP. Natives Safari wird getrennt geprüft; kontrollierte Testantworten messen weder Qualität noch Laufzeit externer Modelle.

### Laufzeit, Kosten und Nachweise

Beide Vorschläge verbrauchen Generierung. Parallele Ausführung garantiert weder geringere Kosten noch kürzere Dauer. Du kannst einen Vorschlag oder beide stoppen. Nach Ablauf der Grenze werden bereits geschriebene Änderungen geprüft. Nicht gemeldeter Verbrauch wird als unbekannt und niemals als null dargestellt.

Die [CI](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/actions/workflows/ci.yml) prüft Windows/Linux, Node und den Browser. Ein Teil der aktuellen Integrationstests nutzt echte Sitzungen, Werkzeuge und Anwendungen mit einem lokalen Adapter mit festen Antworten. Das belegt die Ausführung, nicht die Qualität eines externen Modells. Historische Fälle mit echten Modellen stammen aus DSH 0.2.1-rc.3; sie sind weder Modellranking noch allgemeines Leistungsversprechen.

<a id="whats-new"></a>

## Neuerungen nach Version

<details>
<summary>Änderungen in 3.1.0 und früheren Versionen</summary>

**Neu in 3.1.0:**
- **Jeder Schritt sichtbar, live und danach.** Sobald eine Version arbeitet, hat ihre Karte eine Schaltfläche **Steps**. Aufgeklappt zeigt sie die Arbeit der Reihe nach: Überlegungen mit Dauer, Werkzeugaufrufe (Datei lesen, Datei bearbeiten, Befehl ausführen …; jeder lässt sich mit Ein- und Ausgabe öffnen) und was zwischen den Schritten geschrieben wurde. Während die Version arbeitet, laufen ihre neuesten drei Schritte außerdem live unter dem Wal mit, und nach dem Ende bleibt jeder Schritt einen Klick entfernt. Im Blindvergleich erscheinen Wörter, die einen Stil verraten, als ▒▒.
- **Die Antwort, direkt sichtbar.** Eine Version, die nur antwortet, zeigt nur ihre Antwort. Eine Version, die eine Seite gebaut oder Dateien geschrieben hat, zeigt ihre Antwort gleichrangig: nebeneinander über der Seite, im Fokus links neben der Seite. Die Antwort erscheint, sobald die Version fertig ist, noch vor ihrer Seite.
- **Seiten direkt sichtbar.** Statische Seiten liefert das Plugin selbst aus; sie sind bedienbar, sobald sie geschrieben sind, ohne eigenen Prozess, den die Desktop-App beenden könnte. Lässt sich eine Seite trotzdem nicht ausliefern, wird ein HTML-Ergebnis dennoch als Seite gezeigt, der Quelltext ist einen Klick entfernt.
- **Ergebnisse früher.** Die Bestätigung beginnt, sobald der Zug einer Version ohne wartende Nachrichten endet; sie wartet nicht darauf, dass andere Plugins die gesamte Sitzung freigeben. Auf dem aufgezeichneten Testhost dauerte dies 0,35–0,6 s; die Desktop-Fälle mit dem alten Backend brauchten 41–44 s. Geeignete npm-Projekte können während der Generierung eine eingefrorene Installation vorbereiten und jeder Version ohne geänderte Abhängigkeiten eine unabhängige Kopie geben. Prüfungen laufen parallel; gestartete Seiten sind sofort bedienbar. In der Aufnahme mit festen Kandidaten waren die vier Vite-Seiten nach etwa 24–30 s ab dem Senden verfügbar. Das misst weder Tempo noch Qualität externer Modelle und garantiert keine Laufzeit auf anderen Rechnern.
- **Warten macht Spaß.** Jede arbeitende Version zeigt das blaue Wal-Logo von DeepSeek, anfangs hell, das sich mit dem Fortschritt mit blauem Wasser füllt, während zwei Lichter um seinen Rand laufen. Ab und zu steigt ein Gedanke über seinem Kopf auf: was er gerade tut, eine Idee oder die Einladung, ihn anzustupsen. Bei jedem Schritt bläst er eine Fontäne und dreht sich zum Zeiger; mehrere Stupser hintereinander lassen ihn springen, sich drehen, taumeln und spritzen, jedes Mal mit einem neuen Satz. Zwei Kometen jagen um einen laufenden Vergleich (mit Ersatzpfad für ältere Engines; bei reduzierter Bewegung stehen sie still), über langsam fließendem blauem Licht.
- **Vier Blautöne für A–D.** Die Versionsetiketten sind vier verschiedene Blautöne.
- **Erinnerung an den Neustart.** DSH tauscht die Oberfläche eines Plugins sofort aus, behält aber das Backend, das es beim Start geladen hat. Weichen beide voneinander ab, bittet AgentCompare darum, DSH zu beenden und neu zu öffnen, statt still Schritte und Antworten zu verlieren.
- **Ein chinesischer Name.** Offiziell heißt das Plugin „鲸挑细选“, Spitzname „大肥鱼赛马“.
- **Enthält auch 2.1.0, die nicht einzeln veröffentlicht wurde:** Ein Gruß oder eine Frage bekommt Antworten statt Seiten; helleres, klareres Flüssigglas, leichtere Schaltflächen und gleitende Bedienelemente; in beiden Themen erreicht der Text in den 21 geprüften Oberflächenzuständen mindestens 4.5:1.

**Neu in 2.0.0:** Vergleiche **2, 3 oder 4 Versionen** gleichzeitig. Jede Version kann einen **Stil** erhalten (Umfang: konservativ, mutig; Wirkung: minimal, ausgefeilt, lebendig; Priorität: zugänglich, gründlich, schlank; oder eine eigene Zeile). Vergleiche **blind** (Stile nach der Wahl aufgedeckt) oder **offen** (Stile von Anfang an sichtbar). Bei drei oder vier Versionen legst du verworfene Versionen **beiseite**, damit die übrigen nebeneinander stehen; in der Karte fokussieren die Tasten 1–4 eine Version.
- **Neue Oberfläche in blauem Flüssigglas.** Aurora und Sternenstaub hinter Glasflächen, eine Glaslinse, die zwischen Optionen gleitet, und flüssiger Fortschritt; ein Lichtfunke bei der Wahl und ein Lichtstreif beim Aufdecken. Dunkelmodus, reduzierte Bewegung und hoher Kontrast werden unterstützt.
- **Sagen, warum sie gewinnt.** Nach der Wahl ein paar Gründe antippen (Layout, Farbe und Material, Bediengefühl …) oder eine Zeile ergänzen; spätere Änderungen im Hauptgespräch behalten diese Stärken bei.
- **Schnellsets.** Ein Tipp setzt Anzahl und Stile der Versionen: Klassisches Paar, Drei Looks, Drei Prioritäten, Vier Richtungen.
- **2–4 Versionen mit Stilen.** Acht Vorlagen oder eine eigene Zeile; verschiedene Modelle können denselben Stil verwenden.
- **Blind oder offen vergleichen.** Versionen ausprobieren, zurückstellen und wiederherstellen; 1–4 fokussiert eine Version, 0 zeigt alle.
- **Antworten, Dateien und laufende Seiten.** Markdown lesen und Antworten, Code, Dateiinhalte oder Pfade kopieren. Die eigene Wahl ist klar markiert.
- **Im Hauptgespräch weiterarbeiten.** Vergleiche, Auswahl, Übernahme und Rücknahme bleiben im Gedächtnis des aktuellen Gesprächs.
- **Desktop + Web, Oberfläche auf Chinesisch und Englisch.** Vorhandene Modelle nutzen und Änderungen vor der Übernahme prüfen; Rücknahme und Wiederherstellung bleiben verfügbar.

</details>

<details>
<summary>Über den Namen</summary>

Der chinesische Name ist **鲸挑细选** (*jīng tiāo xì xuǎn*), ein Wortspiel mit 精挑细选, „sorgfältig ausgewählt“, wobei 鲸 Wal bedeutet: 2–4 DeepSeek-Wale nehmen sich dieselbe Aufgabe vor, und Sie behalten die beste Version. Sein Spitzname ist **大肥鱼赛马**, „das Rennen der dicken Fische“: In China heißt der DeepSeek-Wal im Netz „dicker Fisch“, und hier laufen mehrere auf derselben Bahn, während Sie den Sieger küren.

</details>

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
