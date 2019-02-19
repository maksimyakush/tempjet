export default class {
  constructor(config) {
    // Public properties
    this.view = config.view;
    this.model = config.model;
    // Private properties
    this._app = this._view.app;
    this._ui = {
      components: {},
      windows: {}
    };

    this._setUIComponents(config);
  }

  _setUIComponents(config) {
    if (config.ui) {
      Object.keys(config.ui).forEach((uiComponent) => {
        this._ui.components[uiComponent] = config.components[uiComponent];
      });
    }

    if (config.windows) {
      Object.keys(config.windows).forEach((windowComponent) => {
        this._ui.windows[windowComponent] = config.windows[windowComponent];
      });
    }
  }

  get components() {
    return this._ui.components;
  }

  get windows() {
    return this._ui.windows;
  }

  addControllerEvent(controllerEventName, eventHandler) {
    this._view.on(this._app, controllerEventName, eventHandler);
  }
}
