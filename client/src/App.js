import { Routes, Route } from "react-router-dom";

import "./App.css";
import Homepage from "./Screens/Homepage";
import UserSignup from "./Screens/Register/UserSignup";
import AuthorSignup from "./Screens/Register/AuthorSginup";
import UserLogin from "./Screens/Login/UserLogin";
import OTPverification from "./Screens/verification/Verification";
import AuthorLogin from "./Screens/Login/AuthorLogin";
import AuthorHomepage from "./Screens/home/AuthorHome";
import Newpost from "./Screens/CreatePost/Newpost";
import PostDetail from "./Screens/postDetail/PostDetail";
import PostDetailsAuth from "./Screens/postDetail/PostDetailsAuth";
import OwnPost from "./Screens/postDetail/OwnPost";
import OwnPostDetail from "./Screens/postDetail/OwnPostDetail";
import Profile from "./Screens/profile/Profile";
// import EditAuth from "./Screens/profile/EditAuth";
import Wishlist from "./Screens/Favorites/Wishlist";
import Premium from "./Screens/premium/Premium";
import AuthorDetails from "./Screens/postDetail/AuthorDetails";
import ChatHome from "./Screens/chat/ChatHome";
import AdminLogin from "./Screens/Login/AdminLogin";
import Allusers from "./Screens/Admin/Allusers";
import PreUsers from "./Screens/Admin/PremiumUser";
import AllAuthors from "./Screens/Admin/AllAuthors";
import Home from "./Screens/Admin/Home";
import UserProfile from "./Screens/profile/UserProfile";
import UserExplore from "./Screens/Explore/UserExplore";
import ViewAuthorPost from "./Screens/Admin/ViewAuthorPost";
import AddExplore from "./Screens/Admin/AddExplore";
import AllExploreData from "./Screens/Admin/AllExploreData";
import Notfound from "./Components/animaton/Notfound";
import Activity from "./Screens/Activity/Activity";
function App() {
  return (
    <Routes>
      <Route path='/admin/' element={<Home />} />
      <Route path='/admin/login' element={<AdminLogin />} />
      <Route path='/admin/alluser' element={<Allusers />} />
      <Route path='/admin/allPreuser' element={<PreUsers />} />
      <Route path='/admin/authors' element={<AllAuthors />} />
      <Route path='/admin/addExplore' element={<AddExplore />} />
      <Route path='/admin/viewExplore' element={<AllExploreData />} />
      <Route path='/admin/authorPost/:id' element={<ViewAuthorPost />} />

      <Route path='/' exact element={<Homepage />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/userSignup' element={<UserSignup />} />
      <Route path='/verification' element={<OTPverification />} />
      <Route path='/wishlist' element={<Wishlist />} />
      <Route path='/premium' element={<Premium />} />
      <Route path='/profile' element={<UserProfile />} />
      <Route path='/explore' element={<UserExplore />} />
      <Route path='/authorDetails/:id' element={<AuthorDetails />} />
      <Route path='/postDetail/:id' element={<PostDetail />} />
      <Route path='/chat' element={<ChatHome />} />

      <Route path='/author/authorSignup' element={<AuthorSignup />} />
      <Route path='/author/authorLogin' element={<AuthorLogin />} />
      <Route path='/author' element={<AuthorHomepage />} />
      <Route path='/author/postDetail/:id' element={<PostDetailsAuth />} />
      <Route path='/author/newpost' element={<Newpost />} />
      <Route path='/author/mypost' element={<OwnPost />} />
      <Route path='/author/mypostDetail/:id' element={<OwnPostDetail />} />
      <Route path='/author/profile' element={<Profile />} />
      <Route path='/author/activity' element={<Activity />} />
      <Route path='/author/explore' element={<UserExplore author={true} />} />
      <Route path='/author/chat' element={<ChatHome author={true}/>} />
      {/* <Route path='/author/editProfile/:id' element={<EditAuth />} /> */}


      <Route path="*" element={<Notfound/>}/>
    </Routes>
  );
}

export default App;
