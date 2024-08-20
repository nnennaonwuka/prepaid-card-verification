import { z } from "zod";

const cardNumberRegex = /^04\/\d+$/;

export const verifyCardFormSchema = z
  .object({
    cardNumber: z.string().min(1, { message: "Card Number is required" }).min(10, { message: "Card Number cannot be less than 10 characters" }),
    confirmCardNumber: z.string().min(1, { message: "Card Number needs to be confirmed" }),
  })
  .superRefine(({ cardNumber, confirmCardNumber }, ctx) => {
    if (cardNumber !== confirmCardNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Numbers do not match",
        path: ["confirmCardNumber"],
      });
    }

    if (!cardNumberRegex.test(cardNumber)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Card Number must start with 04/",
        path: ["cardNumber"],
      });
    }
  });
