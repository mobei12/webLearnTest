import React from "react";
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { name, changeName } = this.props;
    console;
    return (
      <div>
        <h3> hello,world ,my name is {name}</h3>
        改名字
        <input
          type="text"
          onChange={(e) => {
            this.setState({ val: e.target.value });
          }}
        />
        <button onClick={() => changeName(this.state.val)}>change name</button>
      </div>
    );
  }
}
Index.say = function () {
  console.log("my name is alien");
};
/**
 * @description: 正向继承
 * @param {*} Component
 */
function HOC(Component) {
  return class wrapComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { name: "zhangsan" };
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };
}
/**
 * @description: 反向继承
 * @param {*} Component
 */
function ReverseHoc(WrapComponent) {
  return class wrapComponent extends React.Component {
    state = { name: "zhangsan" };
    componentDidMount() {
      console.log("componentDidMount");
    }
    changeName = (name) => {
      this.setState({ name });
    };
    render() {
      return (
        <WrapComponent
          {...this.props}
          {...this.state}
          changeName={this.changeName}
        />
      );
    }
  };
}
export default ReverseHoc(Index);
