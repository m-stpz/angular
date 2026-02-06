# Localization in Angular

- Different from other frameworks, it happens during build process, not while the app is running

## HTML: the `i18n` attribute

```html
<!-- i18n=context|description|id -->
<p i18n="site header|A friendly greeting to the user@@welcomeMessage">Welcome to the dashboard!</p>
```

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
