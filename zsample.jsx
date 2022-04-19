// import DateTimePicker from "../../Components/textfield/DateTime";
// date: Yup.string().required("Required"),
//   {
//     /* <Grid item xs={12}>
//                     <Typography>booking information</Typography>
//                   </Grid> */
//   };
// {
//   /* <Grid item xs={6}>
//                     <DateTimePicker name='date' label='Date' />
//                   </Grid> */
// }

// useEffect(() => {
//   if (!autherPresent) {
//     navigate("/author/login");
//   }
//   const fetchData = async (id) => {
//     try {
//       const data = await axios.get(`/author/editProfile/${id}`);
//       console.log(data);
//       setProData(data.data.profileData);
//     } catch (error) {
//       console.log("error come ", error);
//     }
//   };
//   fetchData(id);
// }, []);

// chat;
// {
//   /* <Typography sx={{ fontSize: 20, fontFamily: "Poppins" }}>
         
//         </Typography>
//         <Button
//           id='notificationButton'
//           aria-controls={open ? "true" : undefined}
//           aria-haspopup='true'
//           aria-expanded={open ? "true" : undefined}
//           onClick={handleClick}
//         >
//           <Badge color="secondary" badgeContent={notification.length} showZero>

//           <NotificationsActiveIcon fontSize='medium' margin={3} />
//           </Badge>
//         </Button> */
// }
// {
//   /* <Menu
//           id='basic-menu'
//           anchorEl={anchorEl}
//           open={open}
//           onClose={handleClose}
//           MenuListProps={{
//             "aria-labelledby": "notificationButton",
//           }}
//         >
//           <MenuList sx={{ padding: 1 }}>
//             {!notification.length && "no new messages"}
//             {notification.map((noti) => (
//               <MenuItem
//                 key={noti._id}
//                 onClick={() => {
//                   setSelectedChat(noti.chat);
//                   setNotification(notification.filter((n) => n !== noti));
//                 }}
//               >
//                 {!noti.chat.isGroupChat &&
//                   `Message from ${getSender(user, noti.chat.users)}`}
//               </MenuItem>
//             ))}
//           </MenuList>
//         </Menu> */
// }

// dropdown;

// import * as React from "react";
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

// export default function BasicMenu() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <Button
//         id='basic-button'
//         aria-controls={open ? "basic-menu" : undefined}
//         aria-haspopup='true'
//         aria-expanded={open ? "true" : undefined}
//         onClick={handleClick}
//       >
//         Dashboard
//       </Button>
//       <Menu
//         id='basic-menu'
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           "aria-labelledby": "basic-button",
//         }}
//       >
//         <MenuItem onClick={handleClose}>Profile</MenuItem>
//         <MenuItem onClick={handleClose}>My account</MenuItem>
//         <MenuItem onClick={handleClose}>Logout</MenuItem>
//       </Menu>
//     </div>
//   );
// }


    // "heroku-postbuild":"NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
// `