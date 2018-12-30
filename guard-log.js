class GuardLogDay {
  constructor(date, guardId) {
    this.date = date;
    // 'true' means asleep, false means awake
    this.minutes = [];
    this.guardId = guardId;

    for (let i = 0; i < 60; i++) {
      this.minutes[i] = false;
    }
  }

  static breakupLine(line) {
    const dateString = line.substring(
      line.indexOf('[') + 1,
      line.indexOf(']'),
    );
    const year = dateString.substring(0, 4);
    let month = dateString.substring(5, 7);
    month--;
    const day = dateString.substring(8, 10);
    const hour = dateString.substring(11, 13);
    const minute = dateString.substring(14, 16);
    const thisDate = new Date(year, month, day, hour, minute);
    return ({
      timestamp: thisDate,
      restOfLine: line.substring(line.indexOf(']') + 1),
    });
  }

  static buildSleepFreq(GuardLogDayArray) {
    const minuteSleepFrequency = {};
    for (let i = 0; i < GuardLogDayArray.length; i++) {
      const keys = Object.keys(minuteSleepFrequency);
      const dayGuard = GuardLogDayArray[i].guardId;
      // Initializes the guard's minute count if this is the first time the
      // guard has appeared in the log.
      if (!keys.includes(dayGuard)) {
        minuteSleepFrequency[dayGuard] = {};
        for (let j = 0; j < 60; j++) {
          minuteSleepFrequency[dayGuard][j] = 0;
        }
      }
      // Adds each minute the guard slept to the object
      GuardLogDayArray[i].getAsleepMinutes().forEach((minute) => {
        minuteSleepFrequency[dayGuard][minute]++;
      });
    }

    return minuteSleepFrequency;
  }

  static buildSleepiestMinute(minuteSleepFrequency) {
    const sleepiestMinute = {};
    Object.keys(minuteSleepFrequency).forEach((key) => {
      const guardMinutes = minuteSleepFrequency[key];
      const sleepyMinute = Object.keys(guardMinutes).reduce(
        (a, b) => (guardMinutes[a] > guardMinutes[b] ? a : b),
      );
      sleepiestMinute[key] = {
        sleepyMinute: parseInt(sleepyMinute, 10),
        timesAsleep: minuteSleepFrequency[key][sleepyMinute],
      };
    });
    return sleepiestMinute;
  }

  static createSleepyMinutes(GuardLogDayArray, sleepyGuard) {
    const sleepyMinutes = {};

    for (let i = 0; i < 60; i++) {
      sleepyMinutes[i] = 0;
    }

    for (let i = 0; i < GuardLogDayArray.length; i++) {
      if (GuardLogDayArray[i].guardId === sleepyGuard) {
        const asleepMinutes = GuardLogDayArray[i].getAsleepMinutes();

        asleepMinutes.forEach((value) => {
          sleepyMinutes[value]++;
        });
      }
    }

    return sleepyMinutes;
  }

  fallAsleep(minute) {
    for (let i = minute; i < 60; i++) {
      this.minutes[i] = true;
    }
  }

  wakeUp(minute) {
    for (let i = minute; i < 60; i++) {
      this.minutes[i] = false;
    }
  }

  getInfo() {
    let minAsleep = 0;
    for (let i = 0; i < this.minutes.length; i++) {
      if (this.minutes[i]) {
        minAsleep++;
      }
    }
    return {
      guard: this.guardId,
      minutesAsleep: minAsleep,
    };
  }

  getAsleepMinutes() {
    const asleepMinutes = new Set();
    for (let i = 0; i < this.minutes.length; i++) {
      if (this.minutes[i]) {
        asleepMinutes.add(i);
      }
    }
    return asleepMinutes;
  }
}

module.exports = GuardLogDay;
