import { mount } from "enzyme";
import { debounce } from "lodash";
import * as React from "react";

import withDebouncedProps from "./index";

const DEBOUNCE_TIME = 100;

describe("withDebouncedProps", () => {
  let wrapper;
  let baseInstance;
  beforeEach(() => {
    class MyComp extends React.PureComponent {
      count = 0;
      componentDidUpdate() {
        this.count += 1;
      }
      render() {
        return (
          <div>
            Filter 1: {this.props.filter1}
            Filter 2: {this.props.filter2}
          </div>
        );
      }
    }
    const enhance = withDebouncedProps(["filter1"], func =>
      debounce(func, DEBOUNCE_TIME)
    );
    const EnhancedComp = enhance(MyComp);
    const subject = <EnhancedComp filter1="Jones" filter2="Jones" />;
    wrapper = mount(subject);
    baseInstance = wrapper.children().instance();
  });

  it("debounces specified props", async () => {
    expect(baseInstance.count).toEqual(0);
    wrapper.setProps({ filter1: "S" });
    wrapper.setProps({ filter1: "Sm" });
    wrapper.setProps({ filter1: "Smi" });
    wrapper.setProps({ filter1: "Smit" });
    // wait for debounce
    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, DEBOUNCE_TIME + 1);
    });
    expect(baseInstance.count).toEqual(1);
  });

  it("doesn't debounce props that are not specified", () => {
    expect(baseInstance.count).toEqual(0);
    wrapper.setProps({ filter2: "S" });
    wrapper.setProps({ filter2: "Sm" });
    wrapper.setProps({ filter2: "Smi" });
    wrapper.setProps({ filter2: "Smit" });
    expect(baseInstance.count).toEqual(4);
  });
});
