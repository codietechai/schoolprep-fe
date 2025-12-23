import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TUserSession = {
  user: {
    id: number;
    full_name: string;
    email: string;
    contact_number: string;
    phone_code: string;
    address: string;
    last_login_at: string;
    created_at: string;
    timezone: string;
    role: any;
  };
  accessToken: string;
  refreshToken: string;
  client?: {
    company_url: string;
    sub_domain: string;
  };
};

interface AuthState {
  user: TUserSession | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    createUserSession(state, action: PayloadAction<TUserSession | null>) {
      state.user = action.payload;
    },
  },
});

export const { createUserSession } = authSlice.actions;

export default authSlice.reducer;
