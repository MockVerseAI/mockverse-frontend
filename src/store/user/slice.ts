import { Resume, User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllResumes, getUser } from "./actions";
import socketService from "@/services/socketService";

interface UserState {
  user: User | null;
  resumes: Resume[];
}

const initialState: UserState = {
  user: null,
  resumes: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      socketService.connect(action.payload._id);
    },
    editUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setResumes(state, action: PayloadAction<Resume[]>) {
      state.resumes = action.payload;
    },
    removeUser(state) {
      state.user = null;
      socketService.disconnect();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        socketService.connect(action.payload._id);
      }
    });
    builder.addCase(getAllResumes.fulfilled, (state, action) => {
      state.resumes = action.payload;
    });
  },
});

export const { setUser, editUser, removeUser, setResumes } = userSlice.actions;
export default userSlice.reducer;
