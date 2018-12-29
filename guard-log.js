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
