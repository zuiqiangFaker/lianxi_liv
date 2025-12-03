// src/store/counterSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNonce, login } from "@/api/api";
import { ContractService } from "@/utils/contract";
import { message } from "antd";
const contractService = new ContractService('sepolia');
export const loginAsync = createAsyncThunk(
  "counter/login",
  async (_, { rejectWithValue }) => {
    try {
      const address = await contractService.init();
      if (!address) throw "Failed to get wallet address";

      const nonce = await getNonce({ address });
      const signature = await contractService.personalSign(
        nonce.nonce,
        address
      );

      const loginRes = await login({
        address,
        signature,
      });

      return loginRes.data;
    } catch (error) {
      let msg = "";
      let code = "";

      if (typeof error === "string") {
        msg = error;
      } else if (error && typeof error === "object") {
        code = error.code;
        msg = error.message || JSON.stringify(error);
      }

      if (
        code === 4001 ||
        msg.includes("User denied") ||
        msg.includes("User rejected")
      ) {
        message.error("User rejected the request.");
      } else {
        message.error(msg || "error");
      }

      return rejectWithValue(msg);
    }
  }
);

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    token: localStorage.getItem("token") || null,
    userInfo: null,
  },
  reducers: {
    logoutType(state) {
      state.token = "";
      state.userInfo = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.userInfo = action.payload.user;
      localStorage.setItem("token", action.payload.token);
    });
  },
});

export const { logoutType } = counterSlice.actions;
export default counterSlice.reducer;
