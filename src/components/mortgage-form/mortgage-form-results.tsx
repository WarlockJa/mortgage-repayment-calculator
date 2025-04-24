import { z } from "zod";
import { formSchema } from "./mortgage-form";
import convertToCurrencyFormat from "@/lib/currencyFormatters";
import SVGIllustrationEmpty from "@/app/components/svg/svg-illustration-empty";
import {
  mortgageInterestOnlyRepayments,
  mortgageRepayments,
} from "@/lib/mortgageCalculations";

export default function MortgageFormResults({
  formData,
}: {
  formData: z.infer<typeof formSchema> | undefined;
}) {
  return formData ? (
    <FilledResultsComponent {...formData} />
  ) : (
    <EmptyResultsComponent />
  );
}

function FilledResultsComponent({
  interestRate,
  mortgageAmount,
  mortgageTerm,
  mortgageType,
}: z.infer<typeof formSchema>) {
  // converting data to format accepted by the mortgage calculation formula
  // interestRate converted to percent per payment (e.g. 5.25% => 5.25 / 100 / 12)
  // mortgageTerm converted from years to months (e.g. 25 => 25 * 12)
  const mortgageData = {
    p: mortgageAmount,
    i: interestRate / 100 / 12,
    n: mortgageTerm * 12,
  };

  const { monthlyRepayments, totalRepay } =
    mortgageType === "interest only"
      ? mortgageInterestOnlyRepayments(mortgageData)
      : mortgageRepayments(mortgageData);
  return (
    <div className="bg-foreground flex flex-col space-y-4 p-10 sm:rounded-bl-[5em]">
      <h2 className="text-custom-white text-2xl font-bold">Your results</h2>
      <p className="text-custom-slate-500">
        Your results are shown below based on the information you provided. To
        adjust the results edit the form and click &quot;calculate
        repayments&quot; again.
      </p>

      <div className="mt-6 rounded-md bg-slate-950/30 p-8 shadow-[0_-4px_var(--color-custom-lime)]">
        <h3 className="text-custom-slate-500">Your monthly repayments</h3>
        <p className="text-custom-lime mt-4 text-5xl font-bold">
          {convertToCurrencyFormat(monthlyRepayments, true)}
        </p>
        <div className="bg-border/30 my-8 h-px w-full"></div>
        <p className="text-custom-slate-500">
          Total you&apos;ll repay over the term
        </p>
        <p className="text-custom-white text-2xl font-bold">
          {convertToCurrencyFormat(totalRepay, true)}
        </p>
      </div>
    </div>
  );
}

function EmptyResultsComponent() {
  return (
    <div className="bg-foreground flex flex-col items-center justify-center space-y-4 p-6 sm:rounded-bl-[5em] sm:p-10">
      <SVGIllustrationEmpty />
      <h2 className="text-custom-white text-2xl font-bold">
        Results shown here
      </h2>
      <p className="text-custom-slate-500 text-center">
        Complete the form and click &quot;calculate repayments&quot; to see what
        your monthly repayments would be.
      </p>
    </div>
  );
}
