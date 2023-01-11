import { createListenerMiddleware, createSlice } from '@reduxjs/toolkit'

const POLLNANNY_SLICE_STATE = {
  POLLNANNY_SLICE_INIT: "POLLNANNY_SLICE_INIT",
  POLLNANNY_SLICE_PENDING: "POLLNANNY_SLICE_PENDING",
};
const initialState = {
  status: POLLNANNY_SLICE_STATE.POLLNANNY_SLICE_INIT,
  person: {},
  clinic: {},
};

export const pollNannySlice = createSlice({
  name: "pollnanny",
  initialState,
  reducers: {
    pollWebWhatsappClientIdStatus: (state, action) => {
      return {
        ...state
      }
    }
  },
  extraReducers: (builder) => {},
});
export const { pollWebWhatsappClientIdStatus } = pollNannySlice.actions;

export const pollNannyMiddleware = createListenerMiddleware()
pollNannyMiddleware.startListening({
  actionCreator: pollWebWhatsappClientIdStatus,
  effect: async (action, listenerApi) => {
    console.log('Todo added: ', action.payload)
  },
})

export default pollNannySlice.reducer;
