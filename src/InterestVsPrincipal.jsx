import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Slider,
  Button,
  IconButton,
  DialogActions,
  Dialog,
  DialogContent,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import CustomSlider from "./Components/CustomSlider";
import { interestVsPrincipal } from "./Api/calculatorApi";

const InterestVsPrincipal = () => {
  const [location, setLocation] = useState("");
  const [house_cost, setCostOfHouse] = useState(1);
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [loan_tenure, setLoanTenure] = useState(10);
  const [down_payment, setDownPayment] = useState(25);
  const [loan_rate, setLoanRatePerYear] = useState(8);
  const [loan_ratio, setLoanRatio] = useState(75);
  const [monthly_payment, setMonthlyPayment] = useState("90,996");
  const [cumulative_interest, setCumulativeInterest] = useState("34,19,483");
  const [openModal, setOpenModal] = useState(false);

  const isDesktop = useMediaQuery("(min-width:1200px)");

  // Handler for toggling assumptions
  const toggleAssumptions = () => {
    setShowAssumptions((prev) => !prev);
  };

  const handleSliderChange = (setter) => (event, newValue) => {
    setter(newValue); // Real-time value update while dragging
  };

  const handleSliderChangeCommitted = (apiTriggerFunc) => (event, newValue) => {
    apiTriggerFunc(); // Trigger API after slider is done
  };

  const handleLoanTenureChange = handleSliderChange(setLoanTenure);
  const handleDownPaymentChange = (event, newValue) => {
    setDownPayment(newValue); // Set down payment value
    setLoanRatio(100 - newValue); // Update loan ratio value
  };
  const handleLoanRatePerYearChange = handleSliderChange(setLoanRatePerYear);
  const handleCostOfHouseChange = handleSliderChange(setCostOfHouse);
  const handleLoanRatioChange = (event, newValue) => {
    setLoanRatio(newValue); // Set loan ratio value
    setDownPayment(100 - newValue); // Update down payment value
  };

  // Function to handle modal open and close
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInterestApi = () => {
    const actualHouseCost = house_cost * 10000000;
    const Response = interestVsPrincipal(
      actualHouseCost,
      loan_ratio,
      loan_rate,
      loan_tenure
    );

    if (Response.status_code) {
      setMonthlyPayment(
        Response.monthly_payment.toLocaleString("en-IN", {
          maximumFractionDigits: 0,
        })
      );
      setCumulativeInterest(
        Response.cumulative_interest.toLocaleString("en-IN", {
          maximumFractionDigits: 0,
        })
      );
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: { xs: "#11202E", md: "white" },
        paddingX: { xs: 0 },
        paddingY: { xs: 0, md: 2 },
      }}
    >
      {isDesktop ? (
        <Grid container spacing={4} sx={{ padding: "16px" }}>
          {/* Left Side: Title, Description, Location Selector, Cost of House Slider */}
          <Grid item xs={12} md={6}>
            {/* Title and Description */}
            <Box textAlign="left" my={4}>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ color: { sx: "white", md: "black" } }}
              >
                Interest vs Principle
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: { sx: "white", md: "black" } }}
              >
                Vorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                eu turpis molestie, dictum est a, mattis tellus. Sed dignissim,
                metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                interdum tellus elit sed risus. Maecenas eget condimentum velit.
              </Typography>
            </Box>

            {/* Location Selector */}
            <Typography gutterBottom>Where Would You Want To Stay?</Typography>
            <TextField
              variant="outlined"
              fullWidth
              select
              SelectProps={{
                native: true,
              }}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{
                mb: 3,
                fontFamily: "poppins",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            >
              <option value="">Enter Location</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Bangalore">Gurgaon</option>
              <option value="Bangalore">Noida</option>
            </TextField>

            {/* Cost of House Slider */}
            <Typography gutterBottom>Cost Of House Today</Typography>
            <Slider
              value={house_cost}
              onChange={handleCostOfHouseChange}
              onChangeCommitted={handleSliderChangeCommitted(handleInterestApi)}
              min={1}
              max={3}
              step={0.25}
              valueLabelDisplay="on"
              valueLabelFormat={(value) => `${value} Cr`}
              sx={{
                "& .MuiSlider-track": {
                  backgroundColor: "#0086AD",
                  height: 8,
                  border: "none",
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#99BCC5",
                  height: 8,
                },
                "& .MuiSlider-thumb": {
                  backgroundColor: "#0086AD",
                  border: "2px solid white",
                  width: 20,
                  height: 20,
                  "&:hover, &:focus, &.Mui-active": {
                    boxShadow: "none",
                  },
                },
                "& .MuiSlider-valueLabel": {
                  backgroundColor: "#DCF7FF",
                  color: "black",
                  fontWeight: "bold",
                  top: 58,
                  borderRadius: "20px",
                  padding: "8px",
                  paddingX: "16px",
                  "&:before": {
                    display: "none",
                  },
                  "& *": {
                    transform: "none",
                  },
                },
              }}
            />

            {/* Slider Labels */}
            <Grid
              container
              justifyContent="space-between"
              sx={{ mt: "-8px", mb: "16px" }}
            >
              <Grid item>
                <Typography>1 Cr</Typography>
              </Grid>
              <Grid item>
                <Typography>3 Cr</Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Right Side: Cost Display, Assumptions, Learn More, etc. */}
          <Grid item xs={12} md={6}>
            <Box mt={3} textAlign="center" onClick={handleOpenModal}>
              <Typography
                variant="body1"
                align="end"
                sx={{ textDecoration: "underline", fontWeight: "bold" }}
              >
                Learn How We Calculate
              </Typography>
            </Box>
            {/* Cost Display Section */}
            <Box
              height={200}
              mt={3}
              p={2}
              px={5}
              sx={{
                backgroundColor: "#FEF5E7",
                borderRadius: "25px",
                display: { md: "flex" },
                justifyContent: "space-evenly",
              }}
            >
              {/* Monthly Estimated Rent */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  gutterBottom
                  align="center"
                >
                  Total Interest
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="#0086AD"
                  align="center"
                  mb={1}
                >
                  {"INR "}
                  {monthly_payment}
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  color="text.secondary"
                >
                  Know More
                </Typography>
              </Box>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ borderRightWidth: 2 }}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Earnings Over Next 2 Years */}
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  gutterBottom
                  align="center"
                >
                  Total Principal
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="#0086AD"
                  align="center"
                  mb={1}
                >
                  {"INR "}
                  {cumulative_interest}
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  color="text.secondary"
                >
                  Know More
                </Typography>
              </Box>
            </Box>

            {/* Assumptions Toggle Button */}
            <Box mt={3} textAlign="right">
              <Button
                variant="text"
                color="inherit"
                endIcon={
                  showAssumptions ? (
                    <MdOutlineExpandLess />
                  ) : (
                    <MdOutlineExpandMore />
                  )
                }
                onClick={toggleAssumptions}
                sx={{ fontWeight: "bold", textDecoration: "underline" }}
              >
                View Assumed Values
              </Button>
            </Box>

            <Grid item xs={12} md={12}>
              {showAssumptions && (
                <Box
                  mt={2}
                  sx={{
                    padding: "4px",
                    gridColumn: isDesktop ? "1 / -1" : "auto", // Span across entire width for desktop mode
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Assumptions
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: "16px" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam eu turpis molestie, dictum est a, mattis tellus.
                  </Typography>

                  {/* Mortgage Section */}
                  <Typography variant="h6" gutterBottom>
                    Mortgage
                  </Typography>
                  <CustomSlider
                    title="Down Payment"
                    value={down_payment}
                    trackColor="#595959"
                    thumbColor="#595959"
                    railColor="#DEDEDE"
                    valueLabelColor="#DEDEDE"
                    onChange={handleDownPaymentChange}
                    onChangeCommitted={handleSliderChangeCommitted(
                      handleInterestApi
                    )}
                    min={25}
                    max={75}
                    step={5}
                    percent={true}
                  />

                  <CustomSlider
                    title="Loan Rate (per year)"
                    trackColor="#595959"
                    thumbColor="#595959"
                    railColor="#DEDEDE"
                    valueLabelColor="#DEDEDE"
                    value={loan_rate}
                    onChange={handleLoanRatePerYearChange}
                    onChangeCommitted={handleSliderChangeCommitted(
                      handleInterestApi
                    )}
                    min={8}
                    max={10}
                    step={0.25}
                    percent={true}
                  />

                  <CustomSlider
                    title="Loan Tenure"
                    trackColor="#595959"
                    thumbColor="#595959"
                    railColor="#DEDEDE"
                    valueLabelColor="#DEDEDE"
                    onChange={handleLoanTenureChange}
                    onChangeCommitted={handleSliderChangeCommitted(
                      handleInterestApi
                    )}
                    value={loan_tenure}
                    min={10}
                    max={20}
                    step={5}
                    percent={false}
                  />

                  <CustomSlider
                    title="Loan to Value"
                    value={loan_ratio}
                    trackColor="#595959"
                    thumbColor="#595959"
                    railColor="#DEDEDE"
                    valueLabelColor="#DEDEDE"
                    onChange={handleLoanRatioChange}
                    onChangeCommitted={handleSliderChangeCommitted(
                      handleInterestApi
                    )}
                    min={25}
                    max={75}
                    step={5}
                    percent={true}
                  />
                </Box>
              )}
            </Grid>

            {/* Learn How We Calculate */}
            <Box
              sx={{ display: { md: "none" } }}
              mt={3}
              textAlign="center"
              onClick={handleOpenModal}
            >
              <Typography
                variant="body1"
                sx={{ textDecoration: "underline", fontWeight: "bold" }}
              >
                Learn How We Calculate
              </Typography>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <>
          {/* Mobile View */}
          <Box textAlign="center" my={4} sx={{ padding: { xs: "16px" } }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              color="white"
            >
              EMI Calculator
            </Typography>
            <Typography variant="body1" color="white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </Typography>
          </Box>

          <Box
            sx={{
              padding: { xs: "16px" },
              paddingTop: { xs: 20 },
              backgroundColor: "white",
              clipPath: "polygon(50% 0%, 100% 95%, 100% 100%, 0% 100%, 0% 95%)",
              display: { sx: "flex", md: "none" },
            }}
          ></Box>

          <Box
            sx={{
              backgroundColor: "white",
              padding: { xs: "16px" },
            }}
          >
            {/* Location Selector */}
            <Typography gutterBottom>Where Would You Want To Stay?</Typography>
            <TextField
              variant="outlined"
              fullWidth
              select
              SelectProps={{
                native: true,
              }}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{
                mb: 3,
                fontFamily: "poppins",
                "& .MuiNativeSelect-select": {
                  // backgroundColor: "#11AD99",
                  height: 18,
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            >
              <option value="">Enter Location</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Bangalore">Gurgaon</option>
              <option value="Bangalore">Noida</option>
            </TextField>

            {/* Cost of House Slider */}
            <Typography gutterBottom>Cost Of House Today</Typography>
            <Slider
              value={house_cost}
              onChange={handleCostOfHouseChange}
              onChangeCommitted={handleSliderChangeCommitted(handleInterestApi)}
              min={1}
              max={3}
              step={0.25}
              valueLabelDisplay="on"
              valueLabelFormat={(value) => `${value} Cr`}
              sx={{
                "& .MuiSlider-track": {
                  backgroundColor: "#11AD99",
                  height: 8,
                  border: "none",
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#99BCC5",
                  height: 8,
                },
                "& .MuiSlider-thumb": {
                  backgroundColor: "#0086AD",
                  border: "2px solid white",
                  width: 20,
                  height: 20,
                  "&:hover, &:focus, &.Mui-active": {
                    boxShadow: "none",
                  },
                },
                "& .MuiSlider-valueLabel": {
                  backgroundColor: "#DCF7FF",
                  color: "black",
                  fontWeight: "bold",
                  top: 58,
                  borderRadius: "20px",
                  padding: "8px",
                  paddingX: "16px",
                  "&:before": {
                    display: "none",
                  },
                  "& *": {
                    transform: "none",
                  },
                },
              }}
            />

            {/* Slider Labels */}
            <Grid
              container
              justifyContent="space-between"
              sx={{ mt: "-8px", mb: "16px" }}
            >
              <Grid item>
                <Typography>1 Cr</Typography>
              </Grid>
              <Grid item>
                <Typography>3 Cr</Typography>
              </Grid>
            </Grid>

            {/* Cost Display Section */}
            <Box
              mt={3}
              p={2}
              sx={{ backgroundColor: "#FEF5E7", borderRadius: "16px" }}
            >
              {/* Monthly Estimated Rent */}
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                align="center"
              >
                Total Interest
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="#0086AD"
                align="center"
                mb={1}
              >
                {"INR "}
                {monthly_payment}
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary">
                Know More
              </Typography>

              <Box my={3} sx={{ borderBottom: "1px solid #D3D3D3" }} />

              {/* Future Sale Price */}
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                align="center"
              >
                Total Principle
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="#0086AD"
                align="center"
                mb={1}
              >
                {"INR "}
                {cumulative_interest}
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary">
                Know More
              </Typography>
            </Box>

            {/* Assumptions Toggle Button */}
            <Box mt={3} textAlign="center">
              <Button
                variant="text"
                color="inherit"
                endIcon={
                  showAssumptions ? (
                    <MdOutlineExpandLess />
                  ) : (
                    <MdOutlineExpandMore />
                  )
                }
                onClick={toggleAssumptions}
                sx={{ fontWeight: "bold", textDecoration: "underline" }}
              >
                View Assumed Values
              </Button>
            </Box>

            {showAssumptions && (
              <Box mt={2} sx={{ padding: "4px" }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Assumptions
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "16px" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  eu turpis molestie, dictum est a, mattis tellus.
                </Typography>

                {/* Mortgage Section */}
                <Typography variant="h6" gutterBottom>
                  Mortgage
                </Typography>
                <CustomSlider
                  title="Down Payment"
                  value={down_payment}
                  trackColor="#595959"
                  thumbColor="#595959"
                  railColor="#DEDEDE"
                  valueLabelColor="#DEDEDE"
                  onChange={handleDownPaymentChange}
                  onChangeCommitted={handleSliderChangeCommitted(
                    handleInterestApi
                  )}
                  min={25}
                  max={75}
                  step={5}
                  percent={true}
                />

                <CustomSlider
                  title="Loan Rate (per year)"
                  trackColor="#595959"
                  thumbColor="#595959"
                  railColor="#DEDEDE"
                  valueLabelColor="#DEDEDE"
                  value={loan_rate}
                  onChange={handleLoanRatePerYearChange}
                  onChangeCommitted={handleSliderChangeCommitted(
                    handleInterestApi
                  )}
                  min={8}
                  max={10}
                  step={0.25}
                  percent={true}
                />

                <CustomSlider
                  title="Loan Tenure"
                  trackColor="#595959"
                  thumbColor="#595959"
                  railColor="#DEDEDE"
                  valueLabelColor="#DEDEDE"
                  onChange={handleLoanTenureChange}
                  onChangeCommitted={handleSliderChangeCommitted(
                    handleInterestApi
                  )}
                  value={loan_tenure}
                  min={10}
                  max={20}
                  step={5}
                  percent={false}
                />

                <CustomSlider
                  title="Loan to Value"
                  value={loan_ratio}
                  trackColor="#595959"
                  thumbColor="#595959"
                  railColor="#DEDEDE"
                  valueLabelColor="#DEDEDE"
                  onChange={handleLoanRatioChange}
                  onChangeCommitted={handleSliderChangeCommitted(
                    handleInterestApi
                  )}
                  min={25}
                  max={75}
                  step={5}
                  percent={true}
                />
              </Box>
            )}

            {/* Learn How We Calculate */}
            <Box mt={3} textAlign="center" onClick={handleOpenModal}>
              <Typography
                variant="body1"
                sx={{ textDecoration: "underline", fontWeight: "bold" }}
              >
                Learn How We Calculate
              </Typography>
            </Box>
          </Box>
        </>
      )}

      {/* Modal Implementation */}
      <Dialog
        sx={{ zIndex: 9999999999, borderRadius: "50px", width: "100vw" }}
        open={openModal}
        onClose={handleCloseModal}
      >
        <DialogActions sx={{ position: "fixed", right: 10 }}>
          <Button
            sx={{ fontWeight: "bold", color: "black" }}
            onClick={handleCloseModal}
          >
            X
          </Button>
        </DialogActions>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Cost: After 3 years, your total cost of homeownership (down payment,
            mortgage, this number should be from the response of calling taxes,
            etc.) for a $300,000 home would be $132,693. Your total cost to rent
            would be $75,475. Renting leaves you with $57,218 in your pocket
            (including the money you didn't spend on a down payment).
          </Typography>
          <Typography variant="body1" paragraph>
            Gain: After 3 years, if you buy, your home will have $51,844 in
            equity (available to you when you sell). However, if you instead
            rent and invest your down payment and the other money you save, at a
            6% return rate it will earn around $6,450 in 3 years.
          </Typography>
          <Typography variant="body1">
            Bottom line: Looking at your gross costs, equity, and investment
            potential, it's better for you to buy than rent if you plan to live
            in your home more than 10 years and 11 months.
          </Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default InterestVsPrincipal;
