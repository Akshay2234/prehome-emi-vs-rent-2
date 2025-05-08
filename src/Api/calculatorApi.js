import axios from "axios";
import { BASE_API_URL } from "./config";

export const rentvsbuy = async (
  tax_Bracket,
  reinvestment,
  property_inflation,
  opportunity_cost_interest,
  buy_closing_cost,
  maintenance_cost,
  home_insurance,
  rent_inflation,
  security_deposit,
  rent_closing_cost,
  average_shifting_home,
  shifting_cost,
  house_cost,
  monthly_rent,
  loan_tenure,
  loan_ratio,
  loan_rate,
  STCG,
  LTCG,
  down_payment
) => {
  try {
    // Since it's a GET request, parameters are passed in the URL
    const response = await axios.get(`${BASE_API_URL}/rentOrBuy`, {
      params: {
        tax_Bracket,
        reinvestment,
        property_inflation,
        opportunity_cost_interest,
        buy_closing_cost,
        maintenance_cost,
        home_insurance,
        rent_inflation,
        security_deposit,
        rent_closing_cost,
        average_shifting_home,
        shifting_cost,
        house_cost,
        monthly_rent,
        loan_tenure,
        loan_ratio,
        loan_rate,
        STCG,
        LTCG,
        down_payment,
      }, // Pass email and otp as query parameters
    });
    return response.data; // Assuming response contains verification result
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};

export const interestVsPrincipal = (
  house_cost = 10000000,
  loan_value_ratio = 75,
  loan_rate = 8,
  loan_tenure = 10
) => {
  loan_rate = loan_rate / 1200;
  loan_tenure = loan_tenure * 12;
  let loan_amount = (house_cost * loan_value_ratio) / 100;
  const monthly_payment =
    (loan_amount * loan_rate * Math.pow(1 + loan_rate, loan_tenure)) /
    (Math.pow(1 + loan_rate, loan_tenure) - 1);

  let remaining_principal = loan_amount;
  let cumulative_interest = 0;

  for (let month = 1; month <= loan_tenure; month++) {
    let interest_for_month = remaining_principal * loan_rate;

    cumulative_interest += interest_for_month;
    let principal_paid = monthly_payment - interest_for_month;

    remaining_principal -= principal_paid;
  }
  return ({
    status_code: true,
    monthly_payment: Math.round(monthly_payment),
    cumulative_interest: Math.round(cumulative_interest),
  });
};


export const emiCalculator = (cost_of_house, loan_rate, loan_tenure, loan_to_value) => {

  if (!cost_of_house || !loan_rate || !loan_tenure || !loan_to_value) {
      return ({
          status_code: false,
          message: "Please provide all parameters"
      })
  }
  try {
      loan_rate = loan_rate / 1200;
      loan_tenure = loan_tenure * 12;
      loan_to_value = loan_to_value * cost_of_house / 100;


      const PMT = (loan_to_value * loan_rate) / (1 - Math.pow(1 + loan_rate, -loan_tenure));
      let outstandingBalance = loan_to_value;
      let cumulativeInterest = 0;

      for (let month = 1; month <= loan_tenure; month++) {
          const interestPayment = outstandingBalance * loan_rate;
          const principalPayment = PMT - interestPayment;

          outstandingBalance -= principalPayment;

          cumulativeInterest += interestPayment;
      }
      const total_principal = PMT * loan_tenure - cumulativeInterest
      return ({
          status_code: true,
          Monthly_emi: Math.round(PMT),
          totalCumulativeInterest: Math.round(cumulativeInterest),
          total_principal: Math.round(total_principal)
      });
  }
  catch (error) {
      return ({
          status_code: false,
          message: error.message
      })
  }
}