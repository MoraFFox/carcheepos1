/** @format */

import React, { Suspense, lazy } from "react"; // Added Suspense and lazy
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRedirect, PublicRoute, PrivateRoute } from "./routes/AuthRoutes";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import { FavoritesProvider } from "./context/FavoritesContext/FavoritesContext";
import { CompareProvider } from "./context/CompareContext/CompareContext";
import { NotificationsProvider } from "./context/NotificationsContext/NotificationsContext";

// Lazily import page components
const DashboardOverview = lazy(() =>
  import("./pages/DashboardOverview/DashboardOverview")
);
const CarListPage = lazy(() => import("./pages/CarListPage/CarListPage"));
const MyActivityPage = lazy(() =>
  import("./pages/MyActivityPage/MyActivityPage")
);
const PostCarPage = lazy(() => import("./pages/PostCarPage/PostCarPage"));
const CarDetailPage = lazy(() => import("./pages/CarDetailPage/CarDetailPage"));
const BookingsPage = lazy(() => import("./pages/BookingsPage/BookingsPage"));
// const Home = lazy(() => import("./pages/Home/Home"));
const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage/FavoritesPage"));
const NotificationsPage = lazy(() =>
  import("./pages/NotificationsPage/NotificationsPage")
);
const UserAuth = lazy(() => import("./layouts/Registration/registration"));
const Login = lazy(() => import("./pages/userAuth/Login/Login"));
const Signup = lazy(() => import("./pages/userAuth/Signup/Signup"));
const RequestResetPassword = lazy(() =>
  import("./pages/userAuth/RequestResetPassword/RequestResetPassword")
);
const VerifyResetPassword = lazy(() =>
  import("./pages/userAuth/VerifyResetPassword/VerifyResetPassword")
);
const ResetPassword = lazy(() =>
  import("./pages/userAuth/ResetPassword/ResetPassword")
);
import { AuthProvider } from "./context/AuthContext/AuthContext";
import AuthContext from "./context/AuthContext/AuthContext";
import { useContext } from "react";
// Placeholder pages for sections not yet fully implemented
const AnalyticsPage = () => <div>Analytics Page</div>; // Placeholder
const SettingsPage = lazy(() => import("./pages/SettingsPage/SettingsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
const AccountSettingsPage = lazy(() =>
  import("./pages/SettingsPage/AccountSettingsPage")
);
const NotificationSettingsPage = lazy(() =>
  import("./pages/SettingsPage/NotificationSettingsPage")
);
const AppearanceSettingsPage = lazy(() =>
  import("./pages/SettingsPage/AppearanceSettingsPage")
);

import { ThemeProvider } from "./context/ThemeContext/ThemeContext";
import SettingsLayout from "./pages/SettingsPage/SettingsLayout";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <CompareProvider>
            <NotificationsProvider>
              <Suspense
                fallback={
                  <div className='main-fallback-loading'>Loading...</div>
                }
              >
                {" "}
                {/* Added Suspense with a fallback */}
                <Routes>
                  {/* Home page (public) */}
                  <Route
                    path='/auth/login'
                    element={
                      <AuthRedirect>
                        <UserAuth>
                          <Login />
                        </UserAuth>
                      </AuthRedirect>
                    }
                  />
                  <Route
                    path='/auth/signup'
                    element={
                      <UserAuth>
                        <Signup />
                      </UserAuth>
                    }
                  />
                  <Route
                    path='/auth/request-reset-password'
                    element={
                      <PublicRoute>
                        <UserAuth>
                          <RequestResetPassword />
                        </UserAuth>
                      </PublicRoute>
                    }
                  />
                  <Route
                    path='/auth/verify-reset-password'
                    element={
                      <PublicRoute>
                        <UserAuth>
                          <VerifyResetPassword />
                        </UserAuth>
                      </PublicRoute>
                    }
                  />
                  <Route
                    path='/auth/reset-password'
                    element={
                      <PublicRoute>
                        <UserAuth>
                          <ResetPassword />
                        </UserAuth>
                      </PublicRoute>
                    }
                  />
                  <Route
                    path='/'
                    element={
                      <AuthRedirect>
                        <LandingPage />
                      </AuthRedirect>
                    }
                  />
                  <Route
                    path='/dashboard'
                    element={
                      <PrivateRoute>
                        <DashboardLayout>
                          <DashboardOverview />
                        </DashboardLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path='/cars'
                    element={
                      <PrivateRoute>
                        <DashboardLayout>
                          <CarListPage />
                        </DashboardLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path='/post-ad' // Changed from /post to match sidebar link
                    element={
                      <PrivateRoute>
                        <DashboardLayout>
                          {/* Use the imported PostCarPage component */}
                          <PostCarPage />
                        </DashboardLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path='/car/:id' // Keep the car detail route
                    element={
                      <PublicRoute>
                        <DashboardLayout>
                          <CarDetailPage />
                        </DashboardLayout>
                      </PublicRoute>
                    }
                  />
                  {/* Add route for My Ads page */}
                  <Route
                    path='/my-ads'
                    element={
                      <PrivateRoute>
                        <DashboardLayout>
                          <MyActivityPage />
                        </DashboardLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path='/analytics'
                    element={
                      <PrivateRoute>
                        <DashboardLayout>
                          <AnalyticsPage />
                        </DashboardLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path='/settings'
                    element={
                      <PrivateRoute>
                        <DashboardLayout>
                          <SettingsLayout>
                            <SettingsPage />
                          </SettingsLayout>
                        </DashboardLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path='/profile'
                    element={
                      <PrivateRoute>
                        <DashboardLayout>
                          <SettingsLayout>
                            <ProfilePage />
                          </SettingsLayout>
                        </DashboardLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path='/account'
                    element={
                      <PrivateRoute>
                        <DashboardLayout>
                          <SettingsLayout>
                            <AccountSettingsPage />
                          </SettingsLayout>
                        </DashboardLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path='/settings/notifications'
                    element={
                      <PrivateRoute>
                        <DashboardLayout>
                          <SettingsLayout>
                            <NotificationSettingsPage />
                          </SettingsLayout>
                        </DashboardLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path='/settings/appearance'
                    element={
                      <PrivateRoute>
                        <DashboardLayout>
                          <SettingsLayout>
                            <AppearanceSettingsPage />
                          </SettingsLayout>
                        </DashboardLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path='/bookings'
                    element={
                      <PrivateRoute>
                        <DashboardLayout>
                          <BookingsPage />
                        </DashboardLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path='/favorites'
                    element={
                      <PrivateRoute>
                        <DashboardLayout>
                          <FavoritesPage />
                        </DashboardLayout>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path='/notifications'
                    element={
                      <PrivateRoute>
                        <DashboardLayout>
                          <NotificationsPage />
                        </DashboardLayout>
                      </PrivateRoute>
                    }
                  />
                  {/* Redirect any unknown paths to the dashboard overview */}
                  <Route path='*' element={<Navigate to='/' replace />} />
                </Routes>
              </Suspense>
            </NotificationsProvider>
          </CompareProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
