import React, { useReducer } from "react"; // 👈 you'll need the reducer hook

// 👇 these are the types of actions that can change state
const CHANGE_INPUT = "CHANGE_INPUT";
const RESET_FORM = "RESET_FORM";

// 👇 create your initial state object here
const initialState = {
  authorName: "",
  quoteText: "",
};

// 👇 create your reducer function here
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT:
      return { ...state, [action.payload.name]: action.payload.value };
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
};

export default function TodoForm({ createQuote }) {
  // 👇 use the reducer hook to spin up state and dispatch
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = ({ target: { value, name } }) => {
    // 👇 implement
    dispatch({
      type: CHANGE_INPUT,
      payload: { name, value },
    });
  };
  const resetForm = () => {
    dispatch({ type: RESET_FORM });
  };
  const onNewQuote = (e) => {
    e.preventDefault();
    createQuote(state);
    resetForm();
  };

  // 👇 some props are missing in the JSX below:
  return (
    <form id="quoteForm" onSubmit={onNewQuote}>
      <h3>New Quote Form</h3>
      <label>
        <span>Author:</span>
        <input
          type="text"
          name="authorName"
          placeholder="type author name"
          onChange={onChange}
          value={state.authorName}
        />
      </label>
      <label>
        <span>Quote text:</span>
        <textarea
          type="text"
          name="quoteText"
          placeholder="type quote"
          onChange={onChange}
          value={state.quoteText}
        />
      </label>
      <label>
        <span>Create quote:</span>
        <button role="submit">DO IT!</button>
      </label>
    </form>
  );
}
