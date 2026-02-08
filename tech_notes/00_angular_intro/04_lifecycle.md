# Angular Lifecycles

`ngOnInit`: component has initialized
`ngOnChanges`: input properties have changed
`ngDoCheck`: custom change detection
`ngAfterContentInit`: after content is projected
`ngAfterViewInit`: view fully initialized
`ngAfterViewChecked`: runs after every view check
`ngOnDestroy`: cleanup

## In more details

1. `ngOnInit`

- Called when component is created.
- Used for:
  - fetching initial data
  - setting up signals/values
  - initializing logic

```js
ngOnInit(){
    // do something
}

// analagous with
useEffect(()=> {},[]) // componentDidMount
```

2. `ngOnChanges`

- Called every time an @Input() changes
- Useful when the component reacts to new parent data

```ts
ngOnChanges(changes: SimpleChanges){
}

// analogous with
useEffect(() => {}, [someVar])
```

- Similar to `componentDidUpdate`
- **important**: Signals reduce the need for this because they update automatically

3. `ngAfterViewInit`

- Runs once the template and all children are rendered
- Used for:
  - DOM measurements
  - accessing `ViewChild`
  - initializing 3rd-party DOM libs

```ts
@ViewChild("box") box!: ElementRef;

ngAfterViewInit(){}

// analogous
useEffect(()=> {},[]) // with DOM refs
```

4. `ngOnDestroy`

- Called when component is removed from the DOM
- Used for:
  - Unsubscribing observables
  - removing event listeners
  - cleaning intervals

```ts
ngOnDestroy(){

}

// analogous
useEffect(() => {
    return () => cleanup // runs on unmount
},[])
```

### The top 3

- `ngOnInit`
- `ngAfterViewInit`
- `ngOnDestroy`
