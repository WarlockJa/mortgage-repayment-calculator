interface MortgageData {
  p: number; // Principal Loan Amount(Mortgage Amount)
  i: number; // Monthly Interest Rate
  n: number; // Total amount of payments
}

/*
    Formula for monthly payment is:
    M = p[i*(1+i)^n / ((1+i)^n - 1)]

    for simplicity we can extract q = (1+i)^n

    with this end formula is:
    M = p[i*q / (q-1)]
*/

export function mortgageRepayments({ p, i, n }: MortgageData): {
  monthlyRepayments: number;
  totalRepay: number;
} {
  const q = (1 + i) ** n;
  const monthlyRepayments = (p * i * q) / (q - 1);
  const totalRepay = monthlyRepayments * n;
  return { monthlyRepayments, totalRepay };
}

/*
    Formula for Interest Only monthly payment:
    Mio = p * i
*/

export function mortgageInterestOnlyRepayments({ p, i, n }: MortgageData): {
  monthlyRepayments: number;
  totalRepay: number;
} {
  const monthlyRepayments = p * i;
  const totalRepay = monthlyRepayments * n;
  return { monthlyRepayments, totalRepay };
}
