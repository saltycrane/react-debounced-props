import React from "react";

// copied from https://github.com/acdlite/recompose/blob/de0577682b5f0066378261942305aa7676965b02/src/packages/recompose/utils/omit.js
const omit = (obj, keys) => {
  const { ...rest } = obj;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (rest.hasOwnProperty(key)) {
      delete rest[key];
    }
  }
  return rest;
};

// copied from https://github.com/acdlite/recompose/blob/de0577682b5f0066378261942305aa7676965b02/src/packages/recompose/utils/pick.js
const pick = (obj, keys) => {
  const result = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  }
  return result;
};

/**
 * Higher-order component that allows debouncing the component update for the
 * specified props. e.g. for use with type-ahead search and a react-apollo query
 */
const withDebouncedProps = (propNames, debounce) => BaseComponent =>
  class ComponentWithDebouncedProps extends React.Component {
    static displayName = `withDebouncedProps(${BaseComponent.displayName ||
      BaseComponent.name})`;

    constructor(props) {
      super(props);
      this.state = pick(props, propNames);
    }

    componentWillReceiveProps(nextProps) {
      this.debouncedUpdate(nextProps);
    }

    componentWillUnmount() {
      this.debouncedUpdate.cancel();
    }

    debouncedUpdate = debounce(nextProps => {
      this.setState(pick(nextProps, propNames));
    });

    render() {
      return <BaseComponent {...omit(this.props, propNames)} {...this.state} />;
    }
  };

export default withDebouncedProps;
