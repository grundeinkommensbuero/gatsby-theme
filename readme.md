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
