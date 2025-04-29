// Backend: Node.js with Express.js for Loan Calculator

const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// CORS options
const corsOptions = {
  origin: '*', // allow all origin for development
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions)); // Apply CORS with options

// Helper function to calculate loan details
function calculateLoan(principal, annualRate, years) {
  const monthlyRate = annualRate / 12 / 100;
  
  const totalPayments = years * 12;

  let monthlyPayment;
  if (monthlyRate === 0) {
    // Avoid division by zero
    monthlyPayment = principal / totalPayments;
  } else {
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, totalPayments);
    const denominator = Math.pow(1 + monthlyRate, totalPayments) - 1;
    monthlyPayment = (principal * numerator) / denominator;
  }

  return {
    principal,
    annualRate,
    years,
    monthlyPayment: monthlyPayment.toFixed(2),
    totalPayment: (monthlyPayment * totalPayments).toFixed(2),
    totalInterest: ((monthlyPayment * totalPayments) - principal).toFixed(2),
  };
}

// Route to handle loan calculation
app.post('/api/calculate-loan', (req, res) => {
  const { principal, annualRate, years } = req.body;

  // Input validation
  if (!principal || !annualRate || !years) {
    return res.status(400).json({ error: 'All fields are required: principal, annualRate, years' });
  }

  if (principal <= 0 || annualRate < 0 || years <= 0) {
    return res.status(400).json({ error: 'Values must be greater than zero' });
  }

  const loanDetails = calculateLoan(principal, annualRate, years);
  res.json(loanDetails);
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
