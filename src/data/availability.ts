/** IST — Mon–Sun; online 10–12 by default, or anytime a commit lands today (until 9 PM) */
export const availability = {
  timezone: "Asia/Kolkata",
  workDays: [0, 1, 2, 3, 4, 5, 6], // Sun–Sat (weekends use same rules)
  workStartHour: 10,
  /** After this hour, a commit/contribution is required to stay online */
  morningCutoffHour: 12,
  workEndHour: 20, // 8 PM — grace hour follows
  graceEndHour: 21, // 9 PM — after-hours commits extend status past this
  /** First after-hours commit (≥ 9 PM): show After hours for this many minutes */
  afterHoursFirstExtensionMinutes: 90,
  /** Each additional after-hours commit same night: extend from latest by this many minutes */
  afterHoursRepeatExtensionMinutes: 120,
  /** Set true to force offline for UI testing — turn off when done */
  forceOffline: false,
};

/** YYYY-MM-DD — always offline on these dates (add your holidays) */
export const festivalDates: string[] = [
  "2026-01-26", // Republic Day
  "2026-03-14", // Holi
  "2026-08-15", // Independence Day
  "2026-10-02", // Gandhi Jayanti
  "2026-11-08", // Diwali
  "2026-12-25", // Christmas
];
