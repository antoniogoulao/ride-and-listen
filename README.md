<p align="center"><img src="https://raw.githubusercontent.com/antoniogoulao/ride-and-listen/main/assets/yamaha_logo.jpeg"/></p>

<h1 align="center">Ride & Listen</h1>

This is an website app inspired by [Drive and Listen](https://driveandlisten.herokuapp.com).

### How did I get the radio urls?

Simply by looking at the source code of a great website, [radiowebsites.org](https://radiowebsites.org/), which provides a lot of radios from around the world and at their page source code they call this api where they get the source url of the radios.

### How did I cancel the play/pause button of youtube?

I just add a simple line of css code to the iframe player

```css
.player {
	pointer-events: none;
}
```

### How did I remove the youtube information such as youtube channel title and etc

Just adding a height of 120% and removing the overflow of the page will remove the top and bottom youtube extra controllers.

* You can see more of the magic by looking at the source code.