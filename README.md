# react-debounced-props

A higher order component (HOC) that allows debouncing React component updates
for a specified set of props. The debounce function is specified as an argument
so it may be chosen by the user. e.g. `lodash.debounce` can be used.

## Install

```
npm install react-debounced-props
```

## Example usage

Basic usage:

```js
import { debounce } from "lodash";
import withDebouncedProps from "react-debounced-props";

const MyDebouncedComponent = withDebouncedProps(
  ["myQuicklyUpdatedProp"], func => debounce(func, 200)
)(MyComponent);
```

Example usage with `react-apollo`'s `graphql` HOC:

```js
import { debounce } from "lodash";
import { compose, graphql } from "react-apollo";

const MyEnhancedComp = compose(
  withDebouncedProps(["regionName"], func => debounce(func, 200)),
  graphql(REGIONS_QUERY),
)(MyComponent);
```

## Ideas from

 - https://github.com/podefr/react-debounce-render/blob/2ae773cb8293ec9a88e966bd0e7f3cf6bbab9eb5/src/index.js
 - https://github.com/apollographql/react-apollo/issues/450#issuecomment-289708841
