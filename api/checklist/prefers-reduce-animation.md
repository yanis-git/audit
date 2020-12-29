----
tags: accessibility
----

## prefers-reduce-animation

### Application

Est-ce que des animations sont utilisées dans l'application ?

### Vérification

Est-ce que la désactivation des animations est implémentée via la media query `prefers-reduce-animation`.

```css
@media (prefers-reduced-motion: reduce) {

}
```

Nous pouvons également faire des traitements en JavaScript en utilisant la Media Query API

```javascript
let motionQuery = matchMedia('(prefers-reduced-motion)');

const handleReduceMotionChanged = () => {
  if (motionQuery.matches) //reduced behaviour;
}

motionQuery.addListener(handleReduceMotionChanged);
handleReduceMotionChanged()
```

### Documentation

* [Designing With Reduced Motion For Motion Sensitivities](https://www.smashingmagazine.com/2020/09/design-reduced-motion-sensitivities/)