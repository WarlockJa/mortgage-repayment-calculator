"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import SVGIconCalculator from "@/app/components/svg/svg-icon-calculator";
import { RadioGroup } from "../ui/radio-group";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import formatToCurrency from "@/lib/formatToCurrency";

function requiredNumberTransform(num: number | "", ctx: z.RefinementCtx) {
  if (num === "") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "This field is required",
      fatal: true,
    });

    return z.NEVER;
  }

  return Number(num);
}

// const formSchema = z.object({
//   mortgageAmount: z
//     .number()
//     .or(z.literal(""))
//     .transform(requiredNumberTransform),
//   mortgageTerm: z.number().or(z.literal("")).transform(requiredNumberTransform),
//   interestRate: z.number().or(z.literal("")).transform(requiredNumberTransform),
//   mortgageType: z.enum(["repayment", "interest only"]),
// });
const formSchema = z.object({
  mortgageAmount: z.coerce.number(),
  mortgageTerm: z.coerce.number(),
  interestRate: z.coerce.number(),
  mortgageType: z.enum(["repayment", "interest only"]),
});

export default function MortgageForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mortgageAmount: 0,
      mortgageTerm: 0,
      interestRate: 0,
      mortgageType: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="bg-custom-white rounded-3xl p-10">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Mortgage Calculator</h1>
        <Button
          variant={"link"}
          onClick={() => form.reset()}
          className="text-md cursor-pointer"
        >
          Clear All
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="mortgageAmount"
            // render={({ field: { value, ...fieldProps } }) => (
            render={({ field }) => (
              <FormItem>
                <FormLabel className="data-[error=true]:text-foreground text-xl">
                  Mortgage Amount
                </FormLabel>
                <FormControl>
                  <div className="flex items-center overflow-hidden rounded-sm border">
                    <div className="bg-background text-custom-slate-700 px-4 py-2 text-lg font-bold">
                      £
                    </div>
                    <input
                      //   {...fieldProps}
                      {...field}
                      //   value={value && formatToCurrency(value)}
                      className="w-full px-4 font-bold outline-none"
                      pattern="[0-9]+"
                      title="numbers only"

                      //   className="bg-custom-neutral-700/20 hover:bg-custom-neutral-700/60 placeholder:text-custom-neutral-500 border-border focus-visible:ring-offset-background ring-border rounded-lg px-4 py-6 ring-offset-2 ring-offset-transparent backdrop-blur-xs transition-colors placeholder:text-lg focus-visible:ring-[2px] md:text-lg"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mortgageTerm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="data-[error=true]:text-foreground text-xl">
                  Mortgage Term
                </FormLabel>
                <FormControl>
                  <div className="flex items-center overflow-hidden rounded-sm border">
                    <input
                      {...field}
                      // className="bg-custom-neutral-700/20 hover:bg-custom-neutral-700/60 placeholder:text-custom-neutral-500 border-border focus-visible:ring-offset-background ring-border rounded-lg px-4 py-6 ring-offset-2 ring-offset-transparent backdrop-blur-xs transition-colors placeholder:text-lg focus-visible:ring-[2px] md:text-lg"
                      className="w-full px-4 font-bold outline-none"
                      pattern="[0-9]+"
                      title="numbers only"
                    />
                    <div className="bg-background text-custom-slate-700 px-4 py-2 text-lg font-bold">
                      years
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="data-[error=true]:text-foreground text-xl">
                  GitHub Username
                </FormLabel>
                <FormControl>
                  <div className="flex items-center overflow-hidden rounded-sm border">
                    <input
                      {...field}
                      // className="bg-custom-neutral-700/20 hover:bg-custom-neutral-700/60 placeholder:text-custom-neutral-500 border-border focus-visible:ring-offset-background ring-border rounded-lg px-4 py-6 ring-offset-2 ring-offset-transparent backdrop-blur-xs transition-colors placeholder:text-lg focus-visible:ring-[2px] md:text-lg"
                      className="w-full px-4 font-bold outline-none"
                      pattern="[0-9]+"
                      title="numbers only"
                    />
                    <div className="bg-background text-custom-slate-700 px-4 py-2 text-lg font-bold">
                      %
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mortgageType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Mortgage Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem
                          value="repayment"
                          className="h-4 w-4 rounded-full border"
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Repayment</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem
                          value="interest only"
                          className="h-4 w-4 rounded-full border"
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Interest Only
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-custom-lime hover:bg-custom-lime/60 ring-border focus-visible:ring-offset-background text-foreground cursor-pointer rounded-4xl py-7 text-lg font-bold ring-offset-2 ring-offset-transparent transition-all focus-visible:ring-2 has-[>svg]:px-10"
          >
            <SVGIconCalculator className="mr-1.5 size-6" /> Calculate Repayments
          </Button>
        </form>
      </Form>
    </div>
  );
}
