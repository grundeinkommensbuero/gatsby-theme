## Gatsby Theme

We use Gatsby as a React framework for the platform’s website. Gatsby provides the option to create reusable scaffolds that can be used in multiple projects via Gatsby Themes. Running our general setup script `direct-democracy-digital setup` will create a Gatsby project in the `site` folder with our Gatsby Theme pre-installed.

### Customization

To provide you with extended options to customize our theme according to your needs, we use [Gatsby’s Shadowing concept](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/shadowing). **Shadowing** allows you to [extend](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/shadowing/#extending-shadowed-files) and [replace](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/shadowing/#shadowing-other-files) any file located in the **`/src` folder** in [our Gatsby Theme repo](https://github.com/grundeinkommensbuero/gatsby-theme/tree/master/gatsby-theme-direct-democracy/sr) with your own implementation. 

To customize the CSS we provide a set of `_config.less` files. Any variables you provide with new values in these files will be overwritten, otherwise the default value will be used.

#### Basic css and fonts

In the same fashion you can change the [basic CSS setup](https://github.com/grundeinkommensbuero/gatsby-theme/blob/master/gatsby-theme-direct-democracy/src/style/base_default.less) in the `site/src/gatsby-theme-direct-democracy/base_config.less` file. If you want to use your own custom font, you can do a @font-face import in `site/src/gatsby-theme-direct-democracy/webfont_config.less`. 

#### Styles and colors

To change the color scheme and some style variables you can add the variables in  `site/src/gatsby-theme-direct-democracy/vars_config.less`. You can see [all available variables and default values here](https://github.com/grundeinkommensbuero/gatsby-theme/blob/master/gatsby-theme-direct-democracy/src/style/vars_default.less). 

> Regarding the color variables it’s important to note that the naming is based on our system of alternating colors for subsequent sections. In this alternative example the first section on a page will have a yellow background, the second will be red and the third will be grey and then the pattern repeats. The font color of text in the second section can be configured separately for the other sections another section color will be used. It’s best to test your color scheme on the development site to understand how this system works. 

``` less
@sectionColor1: #fef377;        // @yellow
@sectionColor2: #fc484c;        // @red
@textOnSectionColor2: #f5f5f5;  // @greyBright
@sectionColor3: #f0f0f0;        // @grey
@accentColor1: #22c8ee;         // @blueBright
@accentColor2: #3423f6;         // @blueDark
@accentColor3: #e5b5c8;         // @rose
@accentColor4: #7d69f6;         // @pink
@menuBackgroundColor: white;    // @white
@strokeOnIcons: #1D1D1B;        // @black
```

#### Custom Logo

To provide your own logo is even easier: You can add your own logo by storing it in `site/src/gatsby-theme-direct-democracy/assets/logo`. The logo can be stored as PNG, JPEG or SVG.
