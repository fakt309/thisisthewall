# API for dynamically changing wallpapers

Using this API, you can get a picture for wallpaper on the screen of any device.

# What is the feature.

The service produces a picture depending on the situation in the world. For example, if breaking news has occurred, it will display the corresponding image, or if it is a holiday, the system also displays a suitable image, at normal days the image is default, for example, nature or the ocean or space, etc.

# How it use

Just make an HTTP GET request for:

- `/api` - get image around the world
- `/api/us` - get image related to US
- `/api/ru` - get image related to RU

Also you can specify resolution in query parameters (default 1920x1080):

- `...?resolution=1k` - get image with resolution 1280x720
- `...?resolution=2k` - get image with resolution 1920x1080

Examples:

`/api/us?resolution=1k`, `/api/ru`, `api?resolution=2k`

# Help us

If you would like to help, you can:

- Create an android, ios and other OS app that sets wallpaper from our api
- Create an extension for chrome or other browsers that sets the image on the main tab according to our api
- Create a program for windows, macos and other OS that sets the desktop according to our api
- Any other ideas are welcome

**You can send me a link to your project, I will post them on the official website of this project.**
