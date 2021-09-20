# Svelte Classes Transition [![npm version](https://badge.fury.io/js/svelte-transition-classes.svg)](https://badge.fury.io/js/svelte-transition-classes)

svelte-transition-classes adds a set of base classes, a set of classes the be on the element
at the start of the transition and then a set of classes that replace the initial classes on
the initial tick. CSS animations or transitions included in the classes then execute the rest
of the transition. The supplied duration should be set to match the duration of the css
transitions and animations that will be applied by the changing classes.

svelte-transition-classes is a custom Svelte transition that adds a set of base
CSS classes to the DOM node, applies another set of classes for the start of the
transition and then at the first tick of the transition, swaps the starting
classes with another set of destination classes. CSS transitions and animations
can be triggered from the class updates. This Svelte transition was created to
easily implement the transitions used in Tailwind CSS.

This svelte transition was created to easily implement the class-based transitions available
in Tailwind CSS and used by Tailwind UI.

More info:

- https://svelte.dev/docs#transition_fn
- https://tailwindcss.com/docs/transition-property
- https://tailwindui.com/components/application-ui/elements/dropdowns

## Installation

```
npm i svelte-transition-classes
```

## Usage

```
<script>
  import classes from 'svelte-transition-classes';
</script>
<div
  in:classes="{{
    duration: 100,
    base: 'transition ease-out duration-100',
    from: 'transform opacity-0 scale-95',
    to: 'transform opacity-100 scale-100',
  }}"
  out:classes="{{
    duration: 75,
    base: 'transition ease-in duration-75',
    from: 'transform opacity-100 scale-100',
    to: 'transform opacity-0 scale-95',
  }}"
>
  Content here
</div>
```

## Example

https://rmarscher.github.io/svelte-transition-classes/
