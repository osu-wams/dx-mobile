```
yarn global add appium
npx appium-doctor --ios
```

## Install missing dependencies

- brew install carthage ffmpeg ios-deploy cmake
- brew install lyft/formulae/set-simulator-location
- brew install facebook/fb/idb-companion
- pip3.9 install fb-idb
- make sure that the python bin is in your PATH (ie. check /Users/<login>/Library/Python/3.9/bin)
- brew unlink tesseract (maybe have to do this to make way for opencv4nodejs to install)
- yarn global add opencv4nodejs mjpeg-consumer
- npm i -g opencv4nodejs mjpeg-consumer
- npx appium-doctor --ios
