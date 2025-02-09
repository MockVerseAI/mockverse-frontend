import ResumeService from "@/services/resumeService";
import UserService from "@/services/userService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    const response = await UserService.currentUser();
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
});

export const getAllResumes = createAsyncThunk("user/getAllResumes", async () => {
  try {
    const response = await ResumeService.getAll();
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
});
