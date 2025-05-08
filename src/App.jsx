import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles"; 
import useMediaQuery from "@mui/material/useMediaQuery"; 
import { Box } from "@mui/material";
 
// import TopBar from "./Components/TopBar";
// import Sidebar from "./Sidebar"; 
// import ScrollToTop from "./Components/ScrollToTop";
import EmiVsRentCalculator from "./EmiVsRentCalculator";

// import ShimmerLoadingScreen from "./Components/ShimmerLoadingScreen";
// import { GoogleOAuthProvider } from "@react-oauth/google";

const hideBottomNavRoutes = ["/login", "/auth", "/signup", "/verify","/convert-new-user"];

const App = () => {
  const location = useLocation();
  const isMdOrLarger = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isLargeScreen = useMediaQuery('(min-width:1400px)');
  const isMediumScreen = useMediaQuery('(min-width:1024px) and (max-width:1399px)');
  const [loading, setLoading] = useState(false);

  // Adjust sidebar width based on screen size
  const sidebarWidth = isLargeScreen ? 280 : isMediumScreen ? 220 : 200; // Dynamic width for better adaptability

  useEffect(() => {
    // Start the loading effect whenever the route changes
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust the delay to show shimmer effect appropriately

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="App" style={{ display: "" }}>
      

      <Box>

      {/* <TopBar /> */}



      <Box
        component="main"
        // sx={{
        //   flexGrow: 1,
        //   marginLeft:
        //     isMdOrLarger && !hideBottomNavRoutes.includes(location.pathname)
        //       ? `${sidebarWidth +35}px` // Dynamic adjustment to match sidebar width
        //       : "0",
        //   paddingRight: isMdOrLarger ? '24px' : '0', // Add padding for better spacing
        //   transition: 'margin 0.3s ease-out', // Smooth transition when sidebar width changes
        // }}
      >
        
          <Box
            // mt={
            //   hideBottomNavRoutes.includes(location.pathname)
            //     ? 0
            //     : isMdOrLarger
            //     ? 2
            //     : 12
            // }
            // mb={hideBottomNavRoutes.includes(location.pathname) ? 0 : 10}
          >
            {/* <ScrollToTop /> */}
            <Routes>
              <Route path="/" element={<EmiVsRentCalculator/>} />
            </Routes>
          </Box>
   
 
      </Box>



      </Box>

      
    </div>
  );
};

const Root = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      {/* <GoogleOAuthProvider clientId="597576292269-1lsjf5rb8vi3n472f4l64ebuthl79fss.apps.googleusercontent.com"> */}
        <Router>
          <App />
        </Router>
      {/* </GoogleOAuthProvider> */}
    </ThemeProvider>
  );
};

export default Root;
