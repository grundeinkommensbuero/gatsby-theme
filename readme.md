# Expedition Grundeinkommen / Gatsby Theme

## Yarn workspaces

Develop theme: `yarn workspace gatsby-theme develop`
Develop site: `yarn workspace site develop`

## Configure site

In `./site/gatsby-config.js` pass parameters to the gatsby-theme via the `options` object:

```js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-theme",
      options: {
        message: "Hello Theme",
      },
    },
  ],
};
```

## Using the options in the gatsby theme:

In `./gatsby-theme/gatsby-config.js` retrieve the parameters in `module.exports`:

```js
module.exports = (options) => {
  console.log("***");
  console.log(options.message);
  console.log("***");
  return config;
};
```

## Suggested changes for the Design and Assets

We mainly want to use gatsbys shadowing feature:
https://www.gatsbyjs.com/docs/themes/shadowing/

Only if necessary, we want to pass javascript-parameters to the file via the `gatsby-config.js`

--> More freedom, but also responsibility for the users of the theme.

### For the gatsby-theme shadowing feature

1. Moving `src/components/style` to `/src/style`
2. Creating `src/assets` all reusable assets that are not tightly coupled to a component should be there.
3. The main less-definitions – `base.less`, `vars.less`, `webfont.less` – should be split up into `{file}_config.less`, `{file}_default.less` and `{file}.less}` components:

   1. \_default: sets the white-label-theme
   2. \_config: can be shadowed by the users of the theme (and us) to overwrite and add to the defaults.
   3. {file}.less imports both so the defaults are always defined, even if users choose to only partially change them

### Less variables

1. Renaming variables in `style/vars_default.less`:

```less
@red: --> @primaryColor
@blueBright: --> @secondaryColor
@yellow: --> @tertiarycolor (@accentColor)
--> @darkGrey
@grey: --> @midGrey
@greyBright: --> @lightGrey
@white: --> @white (@background)
--> @black
```

**--> Necessary re-factor in the individual style modules in the components**

2. Adding variables in `style/vars_default.less`

```less
@fontStack: Tahoma, Arial, Helvetica, sans-serif;
```

The `_config` would be shadowed in our use case:

```less
@fontStack: "Ideal", Tahoma, Arial, Helvetica, sans-serif;
```

_Can we think about other useful variables to expose to users?_

- Paddings and margins?
- Button-related: hoverColor, borderRadius?
- Link-stylings, hoverColor, underLine?

### tbd

1. Supporting different file formats for the Logo?
2. Changing import of SVGs, so they support currentColor vs. hardCoded
3. …
