import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({ adapter: new Adapter() });

describe("MyComponent", () => {
  it("should render my component", () => {
    const wrapper = mount(
    <React.StrictMode>
      <App />
    </React.StrictMode>);
    expect(wrapper.exists()).toBe(true);
  });
});