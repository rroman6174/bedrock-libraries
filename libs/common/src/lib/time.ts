const TicksPerSecond = 20;

export type TimeUnit =
  | 'milliseconds'
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days';

const unitsToTicks = {
  milliseconds: TicksPerSecond / 1000, // 20 game ticks per second, 1000 ms in a second
  seconds: TicksPerSecond,
  minutes: TicksPerSecond * 60,
  hours: TicksPerSecond * 60 * 60,
  days: TicksPerSecond * 60 * 60 * 24,
};

export class Ticks {
  private gameTicks: number;

  constructor(time: number, unit: TimeUnit) {
    this.gameTicks = this.convertToTicks(time, unit);
  }

  private convertToTicks(time: number, unit: TimeUnit): number {
    return time * unitsToTicks[unit];
  }

  public addMilliseconds(milliseconds: number): Ticks {
    this.gameTicks += this.convertToTicks(milliseconds, 'milliseconds');
    return this;
  }

  public addSeconds(seconds: number): Ticks {
    this.gameTicks += this.convertToTicks(seconds, 'seconds');
    return this;
  }

  public addMinutes(minutes: number): Ticks {
    this.gameTicks += this.convertToTicks(minutes, 'minutes');
    return this;
  }

  public addHours(hours: number): Ticks {
    this.gameTicks += this.convertToTicks(hours, 'hours');
    return this;
  }

  public addDays(days: number): Ticks {
    this.gameTicks += this.convertToTicks(days, 'days');
    return this;
  }

  public getTicks(): number {
    return this.gameTicks;
  }
}

/**Converts the current time in ticks into HH:MM AM/PM */
export function ticksToMinecraftTime(
  ticks: number,
  format24Hour = false
): string {
  // Normalize the ticks to a 24,000-tick cycle
  ticks %= 24000;

  // Calculate the hours and minutes from the ticks
  let hours = Math.floor((ticks / 1000 + 6) % 24); // Minecraft's 0 tick starts at 6 AM, then adjust to 24-hour cycle

  const minutes = ((ticks % 1000) / 1000) * 60;

  if (format24Hour) {
    // Format hours and minutes for 24-hour clock
    const formattedHours =
      hours < 10 ? '0' + Math.floor(hours) : Math.floor(hours).toString();
    const formattedMinutes =
      minutes < 10 ? '0' + Math.floor(minutes) : Math.floor(minutes).toString();
    return `${formattedHours}:${formattedMinutes}`;
  } else {
    // Adjust AM/PM and correct hours for 12-hour clock
    const amPm = hours >= 12 ? 'PM' : 'AM';

    // Correct for 12-hour format, specifically handling the case for 12 PM and midnight (12 AM)
    if (hours > 12) hours -= 12;
    else if (hours === 0 || hours === 12) hours = 12;

    const formattedHours = Math.floor(hours).toString();
    const formattedMinutes =
      minutes < 10 ? '0' + Math.floor(minutes) : Math.floor(minutes).toString();
    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  }
}
