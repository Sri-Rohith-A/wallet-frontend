# Proper Folder Structure

## Use a separate folder for assets

• Use a separate folder for assets such as images or fonts in src folder.

## Authentication:

• Authentication is to can authenticate their credentials to verify that they are a valid user.
• In our project we are going to use jwt token to make sure only the valid users enters and access the resources.

## Components:

• The "components" folder is a useful way to organize and manage the reusable UI components.
• We should have a SubFolder for each component and the styles for a particular component should be mentioned along with that
• For example:
• Button: A reusable button component that can be used to trigger actions or navigate to different parts of the application.
• Props:
• text (string) - the text to display on the button (required)
• onClick (function) - the function to call when the button is clicked

## Containers:

• The containers folder is used as a way to organize and group together container components in a React application, making it easier to manage and maintain the code.
• In our project we have containers like menu ,table ,forms where in we use the same container in different pages thus code reusability is achieved.

## Constants:

• Constants variable name should contain only capital letters
• The constants folder is store commonly used variables or values that are unlikely to change during runtime. These variables are often used across multiple components.
• In our project we store values like the header value and the default amount that has to be given to each user.

## env files:

• These files can include sensitive information such as API keys, passwords, and other secrets.
• We should not share this file
• In our project we use env file to store the API_URL’s
• API keys or URLs for development and production environments. By using a .env file, you can set different values for these variables in each environment without modifying the code.
• The values in the .env file can be modified without changing the code itself, which makes it easier to manage different environments, such as development, staging, and production.

## Pages:

• This folder contains React components that represent the different pages of your application.
• In our project we have different pages like Dashboard, Reports, stats

## Utilis:

• Utilities or utility functions are typically used to perform common, reusable tasks that are not specific to a particular component or module in your application.

## Globals:

• The globals folder is used to store global variables, constants, or utility functions that are used throughout the application.
• We use global images and styles that are used throughout the application
• It Defines a set of global styles using the styled-components library for a web page.
• It sets the font family for the body element, the color and text decoration for links, and the background color, text color, and other styles for buttons.
• It also defines a custom style using the styled-components library, which is then exported as a default module

## Services:

• This folder is usually organized in a way that groups related services together.
• In our project we use this function to handles API requests and responses
