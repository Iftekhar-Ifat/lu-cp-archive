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
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    user_name: "alice_j",
    user_type: UserType.POWER,
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    user_name: "bob_smith",
    user_type: UserType.STANDARD,
  },
  {
    name: "Carol White",
    email: "carol@example.com",
    user_name: "carol_w",
    user_type: UserType.STANDARD,
  },
  {
    name: "David Brown",
    email: "david@example.com",
    user_name: "david_b",
    user_type: UserType.STANDARD,
  },
  {
    name: "Eve Wilson",
    email: "eve@example.com",
    user_name: "eve_wilson",
    user_type: UserType.POWER,
  },
  {
    name: "Frank Miller",
    email: "frank@example.com",
    user_name: "frank_m",
    user_type: UserType.STANDARD,
  },
  {
    name: "Grace Davis",
    email: "grace@example.com",
    user_name: "grace_d",
    user_type: UserType.STANDARD,
  },
];
