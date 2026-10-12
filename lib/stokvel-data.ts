export type StokvelMember = {
  initials: string;
  name: string;
  amount: number;
  status: "Paid" | "Part-paid" | "Overdue";
  date?: string;
};

export type StokvelGroup = {
  id: string;
  name: string;
  memberCount: number;
  purpose: string;
  balance: number;
  monthlyTarget: number;
  paidThisMonth: number;
  month: string;
  nextContribution: number;
  nextDate: string;
  userContribution: number;
  paidCount: number;
  partPaidCount: number;
  overdueCount: number;
  members: StokvelMember[];
};

export const stokvelGroups: StokvelGroup[] = [
  {
    id: "ubuntu-savers",
    name: "Ubuntu Savers",
    memberCount: 12,
    purpose: "Monthly community saving",
    balance: 38400,
    monthlyTarget: 9600,
    paidThisMonth: 8400,
    month: "September",
    nextContribution: 800,
    nextDate: "25 Oct 2026",
    userContribution: 3200,
    paidCount: 10,
    partPaidCount: 1,
    overdueCount: 1,
    members: [
      { initials: "TM", name: "Thandi Mokoena (you)", amount: 800, status: "Paid", date: "25 Sep" },
      { initials: "SD", name: "Sipho Dlamini", amount: 800, status: "Paid", date: "24 Sep" },
      { initials: "NM", name: "Naledi Molefe", amount: 800, status: "Paid", date: "25 Sep" },
      { initials: "LN", name: "Lerato Nkosi", amount: 400, status: "Part-paid" },
      { initials: "MN", name: "Mpho Ndlovu", amount: 0, status: "Overdue" },
      { initials: "KB", name: "Kea Bopape", amount: 800, status: "Paid", date: "24 Sep" },
      { initials: "ZT", name: "Zanele Tutu", amount: 800, status: "Paid", date: "25 Sep" },
      { initials: "JM", name: "Jabu Maseko", amount: 800, status: "Paid", date: "24 Sep" },
      { initials: "PN", name: "Palesa Nene", amount: 800, status: "Paid", date: "25 Sep" },
      { initials: "SM", name: "Sizwe Mbatha", amount: 800, status: "Paid", date: "25 Sep" },
      { initials: "AB", name: "Amahle Buthelezi", amount: 800, status: "Paid", date: "24 Sep" },
      { initials: "TK", name: "Thabo Khumalo", amount: 800, status: "Paid", date: "25 Sep" },
    ],
  },
  {
    id: "family-school-fund",
    name: "Family School Fund",
    memberCount: 6,
    purpose: "Saving for school costs",
    balance: 12600,
    monthlyTarget: 2100,
    paidThisMonth: 1400,
    month: "October",
    nextContribution: 350,
    nextDate: "01 Nov 2026",
    userContribution: 1050,
    paidCount: 4,
    partPaidCount: 0,
    overdueCount: 2,
    members: [
      { initials: "TM", name: "Thandi Mokoena (you)", amount: 350, status: "Paid", date: "01 Oct" },
      { initials: "SD", name: "Sipho Dlamini", amount: 350, status: "Paid", date: "02 Oct" },
      { initials: "NM", name: "Naledi Molefe", amount: 350, status: "Paid", date: "01 Oct" },
      { initials: "LN", name: "Lerato Nkosi", amount: 350, status: "Paid", date: "03 Oct" },
      { initials: "KB", name: "Kea Bopape", amount: 0, status: "Overdue" },
      { initials: "ZT", name: "Zanele Tutu", amount: 0, status: "Overdue" },
    ],
  },
];

export const totalUserContributions = 4250;
