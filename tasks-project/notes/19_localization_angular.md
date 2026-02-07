# Localization in Angular

- Different from other frameworks, it happens during build process, not while the app is running

## HTML: the `i18n` attribute

```html
<!-- i18n=context|description|id -->
<p i18n="site header|A friendly greeting to the user@@welcomeMessage">Welcome to the dashboard!</p>
```

- the `.xlf` file: when run the extraction, Angular copies the metadata into the XML

```xml
<trans-unit id="welcomeMessage" datatype="html">
  <notes>
    <note category="meaning">site header</note>
    <note category="description">A friendly greeting to the user</note>
  </notes>
  <!-- source: don't touch it. It's generated automatically. When extracting `i18n`, if changed, this is overwritten -->
  <source>Welcome to our dashboard!</source>
<!-- target would go here: this is where we'd add the translation -->
</trans-unit>
```

- We don't change the `.xlf` file, instead the HTML template
- Do we need all this content on the i18n attribute?
  - context: used 20% of the times. Only when a word/meaning might be confusing
  - description: rarely, unless working with external translation agency
  - custom id: obligatory

## Component: the `$localize` tag

- When we need to add a string within the `.ts` file, we use the backtick with `$localize`

```ts
export class GreetComponent {
  showAlert() {
    const message = $localize`@@alertSucces: Data saved successfully!`;
    alert(message);
  }
}
```

## The `.xlf` File (translation)

- Build the files (`ng extract-i18n`), it will generate a master file

```html
<!-- .xlf -->
 <!-- trans-unit and source are generated automatically -->
<trans-unit id="welcomeMessage" datatype="html">
  <source>Welcome to our dashboard!</source>
  <target>Willkommen auf unserem Dashboard!</target>
</trans-unit>

<trans-unit id="alertSuccess" datatype="html">
  <source>Data saved successfully!</source>
  <target>Daten erfolgreich gespeichert!</target>
</trans-unit>
```

### Workflow

- We don't write the `trans-unit`, nor the `source`, we do, however, write the `target`

1. Dev writes HTML

- Write the code and add `i18n` attribute
- Don't touch XML files yet

2. Angular CLI generates the master file

- `ng extract-i18n`
- generates the file, usually called `messages.xlf`

3. Translator | you, fills in the `target`

- Copy the `messages.xlf` and rename it to `messages.<lang>.xlf`
- Inside the new file, add the specific language version within the `<target>` tags

## Setup on `angular.json`

```json
"project": {
    "my-app": {
        "i18n": {
            "sourceLocale":"en-US",
            "locales": {
                "de": "src/locale/messages.de.xlf"
            }
        }
    }
}
```

## Summary

| Feature    | HTML             | TS                                  |
| ---------- | ---------------- | ----------------------------------- |
| Marker     | `i18n` attribute | `$localize` tagged template literal |
| ID Support | `@@myCustomId`   | `:@@myCustomId:`                    |

## Interpolation | Variables

- If HTML has a variable (e.g., {{name}}), Angular replaces it with a <x id="INTERPOLATION"> placeholder in the XML

```html
<p i18n="@@userGreeting">Hello, {{name}}!</p>
```

- The translation

```xml
<trans-unit id="userGreeting" datatype="html">
  <source>Hello, <x id="INTERPOLATION" equiv-text="{{ name }}"/>!</source>
  <target>Hallo, <x id="INTERPOLATION" equiv-text="{{ name }}"/>!</target>
</trans-unit>
```

## Cool tools

- Tiny translator: upload your `.xlf` file, and through a cool ui, you can type the german and download the result
- Vs Code extensions: give you a much cleaner interface than looking raw XML tags
  - i18n Ally
  - XLIFF Sync
