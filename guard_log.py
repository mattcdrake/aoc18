class GuardLog:
    def __init__(self, time, message):
        self.time = time
        self.message = message


class GuardCalendar:
    def __init__(self):
        self.days = []
    
    def add_day(self, guard_day):
        self.days.append(guard_day)
    
    def calc_guard_stats(self):
        # Create Guard -> TotalMinutes, Minutes
        out_stats = {}
        for day in self.days:
            minute_id = 0
            for minute in day.minutes:
                if day.guard not in out_stats:
                    out_stats[day.guard] = {"total_minutes": 0, 
                        "minutes": {}}
                    for i in range(0, 60):
                        out_stats[day.guard]["minutes"][i] = 0
                if minute == 0:
                    out_stats[day.guard]["total_minutes"] += 1
                    out_stats[day.guard]["minutes"][minute_id] += 1
                minute_id += 1
        return out_stats




class GuardDay:
    def __init__(self, time, guard):
        self.minutes = []
        self.guard = guard
        self.year = time.year
        self.month = time.month
        self.day = time.day
        for i in range(0, 60):
            self.minutes.append(1)

    # I'm doing unnecessary work with this approach
    def fall_asleep(self, start):
        for i in range(start, 60):
            self.minutes[i] = 0
    
    def wake_up(self, start):
        for i in range(start, 60):
            self.minutes[i] = 1

