// AdminRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLogin from '../Pages/Admin/AdminLogin';
// import AdminDashboard from '../Pages/Admin/AdminDashboardPage';
import AdminProtectedRouter from '../Pages/Admin/AdminProtectedRouter';
import AdminCategory from '../Pages/Admin/AdminCategory';
import AdminBanner from '../Pages/Admin/AdminBanner';
import AdminUsers from '../Pages/Admin/AdminUsers';
import AdminMentors from '../Pages/Admin/AdminMentors';
import AdminCourses from '../Pages/Admin/AdminCourses';
import AdminDashboardPage from '../Pages/Admin/AdminDashboardPage';
import Pagenotfound from '../Pages/404page/Pagenotfound';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="EducartLogin" element={<AdminLogin />} />
      <Route path="EducartDash" element={<AdminProtectedRouter><AdminDashboardPage/></AdminProtectedRouter>} />
      <Route path="EducartCategory" element={<AdminProtectedRouter><AdminCategory /></AdminProtectedRouter>} />
      <Route path="EducartUsers" element={<AdminProtectedRouter><AdminUsers /></AdminProtectedRouter>} />
      <Route path="EducartMentors" element={<AdminProtectedRouter><AdminMentors /></AdminProtectedRouter>} />
      <Route path="EducartBanner" element={<AdminProtectedRouter><AdminBanner /></AdminProtectedRouter>} />
      <Route path="EducartCourses" element={<AdminProtectedRouter><AdminCourses /></AdminProtectedRouter>} />
      <Route path='*' element={<Pagenotfound/>}/>
    </Routes>
  );
}

export default AdminRoutes;
