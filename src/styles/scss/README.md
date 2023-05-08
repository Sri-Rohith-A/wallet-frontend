# Install sass

        npm install sass

- Create a stylesheet with ".module.scss" as extension

- Import the stylesheet in ES6 format.

        import style from './ButtonStyle.module.scss';

## Convention to follow

> Maintain the classname seperated by hyphen.
> This helps in maintaining readability.

> Then the styling can be accessed by enclosing it in quotes within square brackets

        style['red-button']
        style['blue-button']

<br/>

# SCSS Partials

## Folder Structure

- styles
  - scss
    - `_color.module.scss`
    - `_variables.module.scss`
    - `_mixins.module.css`
    - `_fonts.module.scss`
    - `global.module.scss`
    - `index.module.scss`
    - `reset.module.scss`

# UNIVERSAL STYLING USING SCSS

> Inorder to apply universal styling to all the components of the React Application
> Apply the styling to the **index.css** file.

> As **index.js** is the first and mandatory file that renders when running a react app,
> It will apply all the specified styles to the subcomponents.

<br/>

# SCSS Partials

The partials files in scss are kept in seperate folders like, reset, \_variables, \_fonts.,
The underscore is a convention to mention that the file is a partial file.

- `_color.module.scss` -> This file contains the colors for the application.

- `_variables.module.scss` -> This file contains the color variables for font, shadings, text, and other styles.

- `_mixins.module.scss` -> This file contains the mixins, which can be imported in other scss files to apply the specified style.

- `_fonts.module.scss` -> This file contains the fonts that are used in the Application.

- `global.module.scss` -> This file contains the styling for the body of the website. That is globally applied to all rendered pages.

- `index.module.scss` -> This file contains all imports of the Partials. This can be imported in scss files that are for custom styling of components.

- `reset` -> This file contains the universal styling.

## Mixin Types

- `Non Parameterized`

        @mixin flexColumn {
                display: flex;
                justify-content: center;
                flex-direction: column;
        }

  > These are generic mixin stylings.

- `Parameterized`

        @mixin margin($top:0,$right:0,$bottom:0,$left:0){
                margin: $top $right $bottom $left;
        }

  > These mixins are just like parameterized functions, to which we can pass custom parameters. Their default values are assigned to 0.

  > Eg: To the above mixin we can pass only top and right margin by

        @include margin($top:5px, $right:25px);

<br/>

### Including Mixins

<br/>

> We can include mixins by using the syntax

        @include <mixin-name>;

> If it is a non parameterized mixin.

        @include <mixin-name>(<parameters>,...);

> If it is a parameterized mixin.
