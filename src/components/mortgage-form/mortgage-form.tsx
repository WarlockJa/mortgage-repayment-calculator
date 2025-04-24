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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import MortgageFormResults from "./mortgage-form-results";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import convertToCurrency from "@/lib/currencyFormatters";
import { useReset } from "@/lib/useReset";

export const formSchema = z.object({
  mortgageAmount: z.coerce
    .number({ message: "This field is required" })
    .positive({ message: "This field is required" }),
  mortgageTerm: z.coerce
    .number({ message: "This field is required" })
    .positive({ message: "This field is required" }),
  interestRate: z.coerce
    .number({ message: "This field is required" })
    .positive({ message: "This field is required" }),
  mortgageType: z.enum(["repayment", "interest only"], {
    message: "This field is required",
  }),
});

const defaultValues = {
  mortgageAmount: undefined,
  mortgageTerm: undefined,
  interestRate: undefined,
  mortgageType: undefined,
};

export default function MortgageForm() {
  const [currentFormData, setCurrentFormData] = useState<
    z.infer<typeof formSchema> | undefined
  >();

  const [isCurrencyInputFocused, setIsCurrencyInputFocused] = useState(false);
  // workaround RadioGroup hijacking submit event on Enter keydown
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  const reset = useReset(form);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    setCurrentFormData(values);
  }

  return (
    <div className="bg-custom-white grid overflow-hidden sm:grid-cols-2 sm:rounded-3xl">
      <div className="space-y-4 p-6 sm:space-y-8 sm:p-10">
        <div className="flex flex-col items-start justify-between sm:flex-row">
          <h1 className="text-2xl font-bold">Mortgage Calculator</h1>
          <Button
            variant={"link"}
            onClick={() => reset()}
            className="text-md text-custom-slate-500 hover:text-foreground cursor-pointer p-0 underline"
          >
            Clear All
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="mortgageAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="data-[error=true]:text-custom-slate-500 text-custom-slate-500 text-md">
                    Mortgage Amount
                  </FormLabel>
                  <FormControl>
                    <div className="aria-[invalid=true]:[&_input]:border-custom-red aria-[invalid=true]:[&_div]:bg-custom-red aria-[invalid=true]:[&_div]:text-background relative">
                      <input
                        {...field}
                        onFocus={() => setIsCurrencyInputFocused(true)}
                        onBlur={() => setIsCurrencyInputFocused(false)}
                        value={
                          field.value
                            ? isCurrencyInputFocused
                              ? field.value
                              : convertToCurrency(field.value)
                            : ""
                        }
                        className={
                          "hover:border-foreground peer focus-visible:border-custom-lime w-full rounded-sm border py-3 pr-4 pl-14 font-bold transition-colors outline-none"
                        }
                        pattern="[0-9.,]+"
                        title="numbers only"
                      />
                      <div className="bg-background text-custom-slate-700 peer-focus:bg-custom-lime absolute top-px bottom-px left-px flex items-center rounded-l-[5px] px-4 text-lg font-bold transition-colors">
                        £
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col items-start gap-6 sm:flex-row">
              <FormField
                control={form.control}
                name="mortgageTerm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="data-[error=true]:text-custom-slate-500 text-custom-slate-500 text-md">
                      Mortgage Term
                    </FormLabel>
                    <FormControl>
                      <div className="aria-[invalid=true]:[&_input]:border-custom-red aria-[invalid=true]:[&_div]:bg-custom-red aria-[invalid=true]:[&_div]:text-background relative">
                        <input
                          {...field}
                          value={field.value ?? ""}
                          className={cn(
                            "hover:border-foreground peer w-full rounded-sm border py-3 pr-24 pl-4 font-bold transition-colors outline-none",
                            "focus-visible:border-custom-lime",
                          )}
                          pattern="[0-9]+"
                          title="integer numbers only"
                        />
                        <div className="bg-background text-custom-slate-700 peer-focus:bg-custom-lime absolute top-px right-px bottom-px flex items-center rounded-r-[5px] px-4 text-lg font-bold transition-colors">
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
                    <FormLabel className="data-[error=true]:text-custom-slate-500 text-custom-slate-500 text-md">
                      Interest Rate
                    </FormLabel>
                    <FormControl>
                      <div className="aria-[invalid=true]:[&_input]:border-custom-red aria-[invalid=true]:[&_div]:bg-custom-red aria-[invalid=true]:[&_div]:text-background relative">
                        <input
                          {...field}
                          value={field.value ?? ""}
                          className={cn(
                            "hover:border-foreground peer w-full rounded-sm border py-3 pr-16 pl-4 font-bold transition-colors outline-none",
                            "focus-visible:border-custom-lime",
                          )}
                          pattern="[0-9.]+"
                          title="numbers only"
                        />
                        <div className="bg-background text-custom-slate-700 peer-focus:bg-custom-lime absolute top-px right-px bottom-px flex items-center rounded-r-[5px] px-4 text-lg font-bold transition-colors">
                          %
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="mortgageType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="data-[error=true]:text-custom-slate-500 text-custom-slate-500 text-md">
                    Mortgage Type
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      onKeyDownCapture={(e) =>
                        e.key === "Enter" && submitButtonRef.current?.click()
                      }
                    >
                      <FormItem className="relative flex items-center">
                        <FormControl>
                          <RadioGroupItem
                            value="repayment"
                            checked={field.value === "repayment"}
                            className={cn(
                              "aria-[invalid=true]:border-border border-border absolute top-0 bottom-0 left-4 my-auto h-5 w-5 rounded-full border",
                              field.value === "repayment" &&
                                "bg-custom-lime/20 border-custom-lime [&_svg]:fill-custom-lime [&_svg]:stroke-custom-lime [&_svg]:size-3",
                            )}
                          />
                        </FormControl>
                        <FormLabel
                          className={cn(
                            "data-[error=true]:text-foreground hover:border-custom-lime w-full rounded-sm border py-2.5 pr-4 pl-12 text-lg font-bold transition-colors",
                            field.value === "repayment" &&
                              "bg-custom-lime/20 border-custom-lime [&_svg]:fill-custom-lime [&_svg]:stroke-custom-lime [&_svg]:size-3",
                          )}
                        >
                          Repayment
                        </FormLabel>
                      </FormItem>

                      <FormItem className="relative flex items-center">
                        <FormControl>
                          <RadioGroupItem
                            value="interest only"
                            checked={field.value === "interest only"}
                            className={cn(
                              "aria-[invalid=true]:border-border border-border absolute top-0 bottom-0 left-4 my-auto h-5 w-5 rounded-full border",
                              field.value === "interest only" &&
                                "bg-custom-lime/20 border-custom-lime [&_svg]:fill-custom-lime [&_svg]:stroke-custom-lime [&_svg]:size-3",
                            )}
                          />
                        </FormControl>
                        <FormLabel
                          className={cn(
                            "data-[error=true]:text-foreground hover:border-custom-lime w-full rounded-sm border py-2.5 pr-4 pl-12 text-lg font-bold transition-colors",
                            field.value === "interest only" &&
                              "bg-custom-lime/20 border-custom-lime [&_svg]:fill-custom-lime [&_svg]:stroke-custom-lime [&_svg]:size-3",
                          )}
                        >
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
              ref={submitButtonRef}
              className="bg-custom-lime hover:bg-custom-lime/60 text-foreground ring-border focus-visible:ring-offset-background w-full max-w-80 cursor-pointer rounded-4xl py-7 text-lg font-bold ring-offset-2 ring-offset-transparent transition-all focus-visible:ring-2"
            >
              <SVGIconCalculator className="size-6" /> Calculate Repayments
            </Button>
          </form>
        </Form>
      </div>

      <MortgageFormResults formData={currentFormData} />
    </div>
  );
}
