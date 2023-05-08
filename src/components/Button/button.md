# Button Component

## Props to button componet

1. **color** - primary, secondary, transparent
2. **size** - xs, s, md, l, xl, xxl, xxxl
3. **lable** - string: required
4. **border** - round
5. **icon** - any icon : optional
6. **click** - function : optional

### If you want to use any other styling, you need to define your style in the "Button.module.scss" first and pass that styling name as props to the button component "Button.js"

<br>

### For button we are using React-icons

#### To install react icon

```js
 npm install react-icons
```

### How to pass the icon to button ?

#### Example:

#### Import the icon from react icon first

```js
import { BsArrowRightCircle } from 'react-icons/bs';
```

### pass the imported icon as below

```js
<Button
  label={'Logout'}
  color={'transparent'}
  border={'none'}
  icon={<BsArrowRightCircle />}
  click={handleLogout}
/>
```
