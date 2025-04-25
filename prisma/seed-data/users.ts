import { UserType } from "@prisma/client";

export const users = [
  {
    name: "Iftekhar Ahmed",
    email: "iftekharifat007@gmail.com",
    user_name: "iftekhar-ifat",
    user_type: UserType.ADMIN,
  },
  {
    name: "Power User",
    email: "power@example.com",
    user_name: "poweruser",
    user_type: UserType.POWER,
  },
  // ...existing users...
];
