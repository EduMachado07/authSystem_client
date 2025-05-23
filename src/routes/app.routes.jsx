import { createBrowserRouter, Navigate } from "react-router-dom";

import Auth from "@/features/auth/auth";
import FormsLogin from "@/features/auth/components/formsLogin";
import FormsRegister from "@/features/auth/components/formsRegister";
import FormsEmail from "@/features/auth/components/formsEmail";
import FormsResetPassword from "@/features/auth/components/formsResetPassword";
import AuthCode from "@/features/auth/components/authCode";

import Profile from "@/features/profile/profile";

import PrivateRoute from "@/store/privateRoute.store";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/",
    element: <Auth />,
    children: [
      { path: "login", element: <FormsLogin /> },
      { path: "register", element: <FormsRegister /> },
      { path: "user-email", element: <FormsEmail /> },

      {
        path: "reset-password",
        element: (
          <PrivateRoute>
            <FormsResetPassword />
          </PrivateRoute>
        ),
      },
      {
        path: "auth-code",
        element: (
          <PrivateRoute>
            <AuthCode />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
]);
