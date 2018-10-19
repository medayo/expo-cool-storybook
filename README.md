[![CircleCI](https://circleci.com/gh/medayo/expo-cool-storybook.svg?style=svg)](https://circleci.com/gh/medayo/expo-cool-storybook)

# Expo Cool Storybook (WIP)

Visual Regression Testing for Expo projects. Click watch ;-). Will be updated soon.

## Whats the problem

Have you ever used Storybook? It's fantastic, however, it is not the best with React Native. Loki is a tool that will work with Storybook to navigate through your components and take a screenshot of the component (that is on screen).

Few of issues:

- CI is not scalable with this approach.
- Expo has a very nice splash screen in which CI can't tap/click on the wizard. *:-( Sadtimes*
- It's very slow to spin up indivial phones and visual regression all of them.
- It's hard to setup everything unless you know what you are doing

Don't worry thought Expo "Cool Storybook" is here to npm your way into your project!

Install: 

> npm install @medayo/expo-cool-storybook

Please have a look in the [example](https://github.com/medayo/expo-cool-storybook/tree/master/example) folder for usage. 
