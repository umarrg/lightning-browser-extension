import state from "../../state";

const reset = async () => {
  state.setState({
    settings: { debug: true },
    accounts: {},
    account: null,
    connector: null,
    password: null,
    currentAccountId: null,
  });

  return { data: { reset: true } };
};

export default reset;
