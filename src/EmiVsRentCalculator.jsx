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
} from "@mui/material";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import CustomSlider from "./Components/CustomSlider";
import { emiCalculator } from "./Api/calculatorApi";

const EmiVsRentCalculator = () => {
  const [location, setLocation] = useState("");
  const [cost_of_house, setCostOfHouse] = useState(1);
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [loan_tenure, setLoanTenure] = useState(20);
  const [down_payment, setDownPayment] = useState(30);
  const [loan_rate, setLoanRatePerYear] = useState(9.5);
  const [Monthly_emi, setMonthlyEmi] = useState("65,249");
  const [totalCumulativeInterest, setTotalCumulativeInterest] =
    useState("86,59,804");
  const [total_principal, settotal_principal] = useState("70,00,000");

  const [loan_to_value, setLoanRatio] = useState(70);

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

  const handlEmiVsRentApi = () => {
    try {
      const actualHouseCost = cost_of_house * 10000000;
      // console.log()

      const emiVsRent = emiCalculator(
        actualHouseCost,
        loan_rate,
        loan_tenure,
        loan_to_value
      );
      if (emiVsRent.status_code) {
        setMonthlyEmi(
          emiVsRent.Monthly_emi.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
          })
        );
        setTotalCumulativeInterest(
          emiVsRent.totalCumulativeInterest.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
          })
        );
        settotal_principal(
          emiVsRent.total_principal.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
          })
        );
      }
    } catch (e) {}
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: { xs: "#11202E", md: "white" },
        paddingX: { xs: 0 },
        paddingY: { xs: 3, md: 2 },
        marginY: { xs: -6 },
      }}
    >
      {isDesktop ? (
        <Grid container spacing={4} sx={{ padding: "16px" }}>
          {/* Left Side: Title, Description, Location Selector, Cost of House Slider */}
          <Grid item xs={12} md={5}>
            {/* Title and Description */}
            <Box textAlign="left" my={4}>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ color: { sx: "white", md: "black" } }}
              >
                EMI Calculator
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: { sx: "white", md: "black" } }}
              >
                Our EMI calculator instantly shows your monthly installments,
                total interest payable, and principal breakdown - helping you
                budget smarter for your future home.
              </Typography>
            </Box>

            {/* Cost of House Slider */}
            <Typography gutterBottom>Cost Of House Today</Typography>
            <Box sx={{ paddingLeft: "16px", paddingRight: "16px" }}>
              <Slider
                value={cost_of_house}
                onChange={handleCostOfHouseChange}
                onChangeCommitted={handleSliderChangeCommitted(
                  handlEmiVsRentApi
                )}
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
            </Box>

            {/* Slider Labels */}
          </Grid>

          {/* Right Side: Cost Display, Assumptions, Learn More, etc. */}
          <Grid item xs={12} md={7}>
            <Box mt={3} textAlign="center" onClick={handleOpenModal}>
              <Typography
                variant="body1"
                align="end"
                sx={{
                  textDecoration: "underline",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Learn How We Calculate
              </Typography>
            </Box>
            {/* Cost Display Section */}
            <Box
  height={200}
  mt={3}
  p={2}
  sx={{
    backgroundColor: "#FEF5E7",
    borderRadius: "50px",
    display: { md: "flex" },
    justifyContent: "space-evenly",
    alignItems: "center", // Added to vertically center all items
  }}
>
  {/* Monthly EMI */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center", // Changed to center
      alignItems: "center", // Added to center horizontally
      paddingX: 2,
      borderRight: "1px solid black",
      flex: 1,
      height: "100%", // Ensure full height for proper centering
    }}
  >
    <Typography
      variant="subtitle1"
      fontWeight="bold"
      gutterBottom
      align="center"
    >
      Monthly EMI
    </Typography>
    <Typography
      variant="h6"
      fontWeight="bold"
      color="#0086AD"
      align="center"
    >
      {"INR "}
      {Monthly_emi}
    </Typography>
  </Box>

  {/* Total Interest */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingX: 2,
      borderRight: "1px solid black",
      flex: 1,
      height: "100%",
    }}
  >
    <Typography
      variant="subtitle1"
      fontWeight="bold"
      gutterBottom
      align="center"
    >
      Total Interest  
      {/* {loan_tenure} Years */}
    </Typography>
    <Typography
      variant="h6"
      fontWeight="bold"
      color="#0086AD"
      align="center"
    >
      {"INR "} {totalCumulativeInterest}
    </Typography>
  </Box>

  {/* Total Principal */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingX: 2,
      flex: 1,
      height: "100%",
    }}
  >
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
    >
      {"INR "}
      {total_principal}
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
                sx={{ fontWeight: "bold" }}
              >
                <Typography
                  color="black"
                  fontWeight="normal"
                  textAlign="left"
                  textTransform="none" // This will prevent uppercase transformation
                >
                  View Assumed Values
                </Typography>
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
                  
                  <Typography variant="body2" sx={{ marginBottom: "16px" }}>
                  <Typography variant="body1">
      <strong>Assumptions:</strong>
      <br />
      &nbsp;• Interest calculated on reducing balance
      <br />
      &nbsp;• Processing fees excluded
      <br />
      &nbsp;• Prepayment charges not included
    </Typography>
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
                      handlEmiVsRentApi
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
                      handlEmiVsRentApi
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
                      handlEmiVsRentApi
                    )}
                    value={loan_tenure}
                    min={10}
                    max={20}
                    step={5}
                    percent={false}
                    leftLabelSuffix=" years" // Add suffix for left label
                    rightLabelSuffix=" years" // Add suffix for right label
                  />

                  <CustomSlider
                    title="Loan to Value"
                    value={loan_to_value}
                    trackColor="#595959"
                    thumbColor="#595959"
                    railColor="#DEDEDE"
                    valueLabelColor="#DEDEDE"
                    onChange={handleLoanRatioChange}
                    onChangeCommitted={handleSliderChangeCommitted(
                      handlEmiVsRentApi
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
              paddingTop: { xs: 30 },
              backgroundColor: "white",
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
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
            <Box sx={{ paddingLeft: "8px", paddingRight: "12px" }}>
              <Slider
                value={cost_of_house}
                onChange={handleCostOfHouseChange}
                onChangeCommitted={handleSliderChangeCommitted(
                  handlEmiVsRentApi
                )}
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
            </Box>

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
                Your Monthly Estimated Rent
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="#0086AD"
                align="center"
                mb={1}
              >
                {"INR "} {Monthly_emi}
              </Typography>
              {/* <Typography variant="body2" align="center" color="text.secondary">
                Know More
              </Typography> */}

              <Box my={3} sx={{ borderBottom: "1px solid #D3D3D3" }} />

              {/* Future Sale Price */}
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                align="center"
              >
                Your Future Sale Price
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="#0086AD"
                align="center"
                mb={1}
              >
                {"INR "}
                {totalCumulativeInterest}
              </Typography>
              {/* <Typography variant="body2" align="center" color="text.secondary">
                Know More
              </Typography> */}

              <Box my={3} sx={{ borderBottom: "1px solid #D3D3D3" }} />

              {/* Earnings Over Next 2 Years */}
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                align="center"
              >
                Over the next {loan_tenure} years as a Prehome partner you could
                earn
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="#0086AD"
                align="center"
                mb={1}
              >
                {"INR "} {total_principal}
              </Typography>
              {/* <Typography variant="body2" align="center" color="text.secondary">
                Know More
              </Typography> */}
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
                    handlEmiVsRentApi
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
                    handlEmiVsRentApi
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
                    handlEmiVsRentApi
                  )}
                  value={loan_tenure}
                  min={10}
                  max={20}
                  step={5}
                  percent={false}
                  leftLabelSuffix=" years" // Add suffix for left label
  rightLabelSuffix=" years" // Add suffix for right label
                />

                <CustomSlider
                  title="Loan to Value"
                  value={loan_to_value}
                  trackColor="#595959"
                  thumbColor="#595959"
                  railColor="#DEDEDE"
                  valueLabelColor="#DEDEDE"
                  onChange={handleLoanRatioChange}
                  onChangeCommitted={handleSliderChangeCommitted(
                    handlEmiVsRentApi
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
  sx={{ 
    zIndex: 9999999999,
    '& .MuiDialog-paper': {
      borderRadius: "12px",
      width: { xs: "90vw", sm: "80vw", md: "700px" },
      maxWidth: "800px",
      position: "relative",
      overflow: "visible"
    }
  }}
  open={openModal}
  onClose={handleCloseModal}
>
  <DialogActions sx={{ 
    position: "absolute",
    right: 16,
    top: 16,
    padding: 0
  }}>
    <IconButton
      onClick={handleCloseModal}
      sx={{ 
        color: "black",
        '&:hover': {
          backgroundColor: "rgba(0, 0, 0, 0.04)"
        }
      }}
    >
      x
    </IconButton>
  </DialogActions>
  
  <DialogContent sx={{ pt: 6, px: 4, pb: 3 }}>
    <Typography mb={2}><strong>Learn How We Calculate</strong></Typography>
    <Typography variant="body1" paragraph>
      Our EMI calculator instantly shows your monthly installments, total
      interest payable, and principal breakdown - helping you budget
      smarter for your future home." Learn How We Calculate We compute
      your Equated Monthly Installment (EMI) using the standard formula:
      EMI = [P x R x (1+R)^N]/[(1+R)^N-1] 
      <br /><br />
      Where:
      <br />
      &nbsp;• P = Principal loan amount
      <br />
      &nbsp;• R = Monthly interest rate (annual rate/12) 
      <br />
      &nbsp;• N = Loan tenure in months
    </Typography>

    
  </DialogContent>
</Dialog>
    </Container>
  );
};

export default EmiVsRentCalculator;
