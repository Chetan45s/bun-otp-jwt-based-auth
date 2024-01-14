import { t } from 'elysia';

export const updateProfileSchema = {
  body: t.Object({
    name: t.Optional(t.String()),
    bankDetails: t.Optional(
      t.Object({
        bankName: t.String(),
        bankAccount: t.String(),
        state: t.String(),
        city: t.String(),
        address: t.String(),
        mobileNumber: t.String(),
        email: t.String(),
        accountMobileNumber: t.String(),
      }),
    ),
  }),
};
