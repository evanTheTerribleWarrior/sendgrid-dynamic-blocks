export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('sendgrid_blocks_state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('sendgrid_blocks_state', serializedState);
    } catch (err) {
      // Ignore write errors.
    }
  };