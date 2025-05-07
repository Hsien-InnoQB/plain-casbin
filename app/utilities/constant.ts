export const modules = ["User", "Team", "Role", "Sample"];

export var allData = [
  {
    module: "User",
    data: [
      {
        id: 1,
        name: "Admin",
        email: "admin@yopmail.com",
        password: "admin",
        role: "Admin",
        team: "Team Admin",
      },
      {
        id: 2,
        name: "Team A User",
        email: "user@yopmail.com",
        password: "user",
        role: "User",
        team: "Team A",
      },
      {
        id: 3,
        name: "Team B User",
        email: "userB@yopmail.com",
        password: "user",
        role: "User",
        team: "Team B",
      },
    ],
  },
  {
    module: "Team",
    data: [
      {
        id: 1,
        name: "Team Admin",
        roleIncluded: ["Admin"],
      },
      {
        id: 1,
        name: "Team A",
        roleIncluded: ["User"],
      },
      {
        id: 2,
        name: "Team B",
        roleIncluded: ["User"],
      },
    ],
  },
  {
    module: "Role",
    data: [
      {
        id: 1,
        name: "Admin",
        accessControl:
          '{"User":["read","create","update","delete"],"Team":["read","create","update","delete"],"Role":["read","create","update","delete"],"Sample":["read","create","update","delete"]}',
      },
      {
        id: 2,
        name: "User",
        accessControl: '{"Sample":["read","create","update"]}',
      },
    ],
  },
  {
    module: "Sample",
    data: [
      {
        id: 1,
        name: "Sample 1",
        description: "For team A only",
        team: "Team A",
      },
      {
        id: 2,
        name: "Sample 2",
        description: "For team A only",
        team: "Team A",
      },
      {
        id: 3,
        name: "Sample 3",
        description: "For team B only",
        team: "Team B",
      },
    ],
  },
];
