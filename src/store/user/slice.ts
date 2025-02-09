import { Resume, User } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllResumes, getUser } from "./actions";

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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getAllResumes.fulfilled, (state, action) => {
      state.resumes = action.payload;
    });
  },
});

export const { setUser, editUser, removeUser, setResumes } = userSlice.actions;
export default userSlice.reducer;
