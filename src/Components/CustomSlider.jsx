import React from "react";
import { Box, Typography, Slider, Grid } from "@mui/material";

const CustomSlider = ({
  title = "Slider",
  value,
  onChange,
  onChangeCommitted,
  min = 0,
  max = 100,
  step = 1,
  valueLabelFormat = (value) => value,
  trackColor = "#0086AD",
  railColor = "#99BCC5",
  thumbColor = "#0086AD",
  valueLabelColor = "#DCF7FF",
  valueLabelTextColor = "black",
  valueLabelTop = 58,
  leftLabel = `${min}`,
  rightLabel = `${max}`,
  leftLabelSuffix = "", // New prop for left label suffix
  rightLabelSuffix = "", // New prop for right label suffix
  percent = false,
}) => {
  return (
    <Box my={2} px={0}>
      <Typography sx={{ marginBottom: "-8px" }} gutterBottom>
        {title}
      </Typography>
      <Box sx={{ paddingLeft: "8px", paddingRight: "8px" }}>
        <Slider
          value={value}
          onChange={onChange}
          onChangeCommitted={onChangeCommitted}
          min={min}
          max={max}
          step={step}
          valueLabelDisplay="on"
          valueLabelFormat={(value) => (percent ? `${value}%` : valueLabelFormat(value))}
          sx={{
            "& .MuiSlider-track": { backgroundColor: trackColor, height: 8, border: "none" },
            "& .MuiSlider-rail": { backgroundColor: railColor, height: 8 },
            "& .MuiSlider-thumb": {
              backgroundColor: thumbColor,
              border: "2px solid white",
              width: 20,
              height: 20,
              "&:hover, &:focus, &.Mui-active": { boxShadow: "none" },
            },
            "& .MuiSlider-valueLabel": {
              backgroundColor: valueLabelColor,
              color: valueLabelTextColor,
              fontWeight: "bold",
              top: valueLabelTop,
              borderRadius: "20px",
              padding: "8px",
              paddingX: "16px",
              "&:before": { display: "none" },
              "& *": { transform: "none" },
            },
          }}
        />

        {/* Slider Labels */}
        <Grid container justifyContent="space-between" sx={{ mt: "-8px", mb: "16px" }}>
          <Grid item>
            <Typography>
              {leftLabel}
              {leftLabelSuffix && leftLabelSuffix}
              {percent && !leftLabelSuffix ? '%' : ''}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              {rightLabel}
              {rightLabelSuffix && rightLabelSuffix}
              {percent && !rightLabelSuffix ? '%' : ''}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CustomSlider;