RemoteDev
=========

Monitoring flux app's actions along with states to a remote monitor. Meant to be used even in production with any flux architecture for web, universal, React Native, hybrid, desktop and server side apps.

### Installation

##### NPM
```
npm install --save-dev remotedev
```

##### CDN
```
<script src="https://npmcdn.com/remotedev/dist/remotedev.min.js"></script>
```

### Remote monitoring

Use one of [our monitor apps](https://github.com/zalmoxisus/remotedev-app) to inspect `action -> state` changes:
- [web](http://remotedev.io/)
- [chrome app](https://chrome.google.com/webstore/detail/remotedev/faicmgpfiaijcedapokpbdejaodbelph) (recommended)
- [electron app](https://github.com/zalmoxisus/remote-redux-devtools/tree/master/install).

The source code is [here](https://github.com/zalmoxisus/remotedev-app).

Also, it can be [used in React Native debugger as a dock monitor](https://github.com/jhen0409/remote-redux-devtools-on-debugger).

### Use locally

In order to make it simple to use, by default, the module and the monitor app communicate via [remotedev.io](http://remotedev.io) server. Use [remotedev-server](https://github.com/zalmoxisus/remotedev-server) cli to run it locally in order to make the connection faster and not to require an internet connection.

Also, we'll add later the ability to be used with [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension), so there wouldn't be any server necessary for local deployment of web apps.   

### Limitations

- **Not ready for production yet**, use it only for development.
- The app and the monitor should be under the same external IP address (will remove this restriction later).

### License

MIT
