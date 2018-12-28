class GuardLogDay {
  constructor(date, guardId) {
    this.date = date;
    // 'true' means asleep, false means awake
    this.minutes = [];
    this.guardId = guardId;

    for (var i = 0; i < 60; i++) {
      minutes[i] = false;
    }
  }
}

module.exports = GuardLogDay;
