# Overview

There is no time limit to completing this exercise, however we recommend you aim to spend in the region of 3 hours on it. Once you have finished - and are happy with your solution - push your work back up to the github repository (in a branch) and create a pull request. The task will involve you implementing a design we give you using React. Please make sure all code is committed and pushed, and the steps to run your application are documented.

# Preparation

You will need:

- Node v12
- Git 
- A text editor or IDE

# Task

- Create a branch from `master`.
- Create a React application.
- Create a selection component according to this [design](https://www.figma.com/file/2hdaxeg1p9qrPmZ0PK12UD/Interview-UI-Design?node-id=1%3A598).
  - The component should accept a label.
  - The component should accept a validation function with configurable error message.
  - The component can be incorporated inside a `<form>` and the selected option passed back to the form.
  - The component should fire an event on change.
- Use the component you made in the previous step to create a form according to this [design](https://www.figma.com/file/2hdaxeg1p9qrPmZ0PK12UD/Interview-UI-Design?node-id=3%3A0).

  - Call this `https://jsonplaceholder.typicode.com/users` to populate list of the users. `name` should be displayed while `id` should be saved as the value in the `form`.
  - Add the required validation with the `Please select a user` error message.
  - Add 2 text fields, one for title and one for body both with required validation.
  - On submit of the form create a new post by sending the data to `https://jsonplaceholder.typicode.com/posts`. The request interface will look like

  ```json
  {
    "title": "foo",
    "body": "bar",
    "userId": 1
  }
  ```
- When you are finished raise a pull request for your changes, including any information you think is relevant.

  ## Bonus points

  - Handle the error when any of the HTTP requests fails by displaying appropriate error message to the user.
  - Make sure the selection component you have created is meeting WCAG AA level.
  - Writing unit-tests for your component.
  - Writing e2e tests for your form.
