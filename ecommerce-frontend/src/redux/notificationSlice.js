import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: { notifications: [] },
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
  },
});

export const { setNotifications, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
