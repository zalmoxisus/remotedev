RemoteDev
=========

Log flux app's actions along with states to a remote monitor. Meant to be used even in production with any flux architecture for web, universal, React Native, hybrid, desktop and server side apps.

### Installation

```
npm install --save-dev remotedev
```

### Remote monitoring

Use one of [our monitor apps](https://github.com/zalmoxisus/remotedev-app) to inspect and redo actions:
- [web](http://remotedev.io/)
- [chrome app](https://chrome.google.com/webstore/detail/remotedev/faicmgpfiaijcedapokpbdejaodbelph) (recommended)
- [electron app](https://github.com/zalmoxisus/remote-redux-devtools/tree/master/install).

The source code is [here](https://github.com/zalmoxisus/remotedev-app).

Also, it can be [used in React Native debugger as a dock monitor](https://github.com/jhen0409/remote-redux-devtools-on-debugger).

### Limitations

- **Not ready for production yet**, use it only for development.
- The app and the monitor should be under the same external IP address (will remove this restriction later).

### License

MIT
