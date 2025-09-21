<p align="center"><img src="https://raw.githubusercontent.com/antoniogoulao/ride-and-listen/main/assets/yamaha_logo.jpeg"/></p>

<a href="https://rideandlisten.antoniogoulao.dev/"><h1 align="center">Ride & Listen</h1></a>

Chill while you listen to some local radios and watch me riding through Portugal. This is a website inspired by [Drive and Listen](https://driveandlisten.herokuapp.com).

### How did I get the radio urls?

Simply by looking at the source code of a great website, [radiowebsites.org](https://radiowebsites.org/), which provides a lot of radios from around the world and at their page source code they call this api where they get the source url of the radios.

### How did I cancel the play/pause button of youtube?

I just add a simple line of css code to the iframe player

```css
.player {
	pointer-events: none;
}
```


# Getting Started with Create React App

This project uses Next.js, so you can run it with `yarn dev` or `yarn start`.

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Learn More

You can learn more in the [Next.js documentation](https://nextjs.org/learn).

To learn React, check out the [React documentation](https://reactjs.org/).