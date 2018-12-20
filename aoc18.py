import helper
import datetime
import guard_log
from claim import Claim, Fabric
from operator import attrgetter

def problem1():
    lines = helper.file_to_list("./input_data/p1.txt")
    running_total = 0
    for line in lines:
        if line[0] == "+":
            running_total += int(line[1:])
        elif line[0] == "-":
            running_total -= int(line[1:])
    return running_total


def problem2():
    lines = helper.file_to_list("./input_data/p1.txt")
    running_total = 0
    list_index = 0
    prior_freqs = set()
    while True:
        line = lines[list_index]

        # Adjust frequency
        if line[0] == "+":
            running_total += int(line[1:])
        elif line[0] == "-":
            running_total -= int(line[1:])

        # Check if frequency has been seen before
        if running_total in prior_freqs:
            return running_total
        else:
            prior_freqs.add(running_total)

        # Adjust index
        if list_index >= (len(lines) - 1):
            list_index = 0
        else:
            list_index += 1


def problem3():
    lines = helper.file_to_list("./input_data/p3.txt")
    count_twos = 0
    count_threes = 0
    for line in lines:
        if helper.has_repeats(line, 2):
            count_twos += 1
        if helper.has_repeats(line, 3):
            count_threes += 1
    return count_twos * count_threes


def problem4():
    lines = helper.file_to_list("./input_data/p3.txt")
    for first in range(0, len(lines)):
        for second in range(first + 1, len(lines)):
            if (helper.line_distance(lines[first], lines[second]) == 1 
                and helper.same_pos(lines[first], lines[second])):
                return helper.strip_diff(lines[first], lines[second])


def problem5_6():
    lines = helper.file_to_list("./input_data/p5.txt")
    claims = []
    for line in lines:
        components = line.split()
        num_id = int(components[0].strip("#"))
        edges = components[2].split(sep=",")
        left_edge = int(edges[0])
        top_edge = int(edges[1].strip(":"))
        width = int(components[3].split(sep="x")[0])
        height = int(components[3].split(sep="x")[1])
        claims.append(Claim(num_id, left_edge, top_edge, width, height))

    fabric = Fabric(1000)
    for claim in claims:
        fabric.add_order(claim)

    answer = [fabric.calc_two_claims()]
    for claim in claims:
        if not fabric.has_overlap(claim):
            answer.append(claim.num_id)
            return answer


def problem7_8():
    lines = helper.file_to_list("./input_data/p7.txt")

    #Part 1
    guard_messages = []
    for line in lines:
        # Appends a GuardLog object to the list
        guard_messages.append(helper.parse_guard_line(line))
    guard_messages = sorted(guard_messages, key=attrgetter('time.year', 
        'time.month', 'time.day', 'time.hour', 'time.minute'))
    guard_calendar = guard_log.GuardCalendar()
    for message in guard_messages:
        words = message.message.split(" ")
        if words[0] == "Guard":
            active_guard = words[1][1:]
            if message.time.hour == 23:
                message.time += datetime.timedelta(hours=2)
            current_day = guard_log.GuardDay(message.time, active_guard)
            guard_calendar.add_day(current_day)
        elif words[0] == "falls":
            current_day.fall_asleep(message.time.minute)
        elif words[0] == "wakes":
            current_day.wake_up(message.time.minute)
    guard_stats = guard_calendar.calc_guard_stats()
    sleepy_guard = max(guard_stats.keys(), 
        key=(lambda key: guard_stats[key]["total_minutes"]))
    sleepy_minute = max(guard_stats[sleepy_guard]["minutes"].keys(),
        key=(lambda key: guard_stats[sleepy_guard]["minutes"][key]))
    p1answer = int(sleepy_guard) * int(sleepy_minute)

    # Part 2
    list_tuples = []
    for k in guard_stats.keys():
        temp_minute = max(guard_stats[k]["minutes"].keys(),
            key=(lambda key: guard_stats[k]["minutes"][key]))
        temp_max = guard_stats[k]["minutes"][temp_minute]
        list_tuples.append([k, [int(temp_minute), int(temp_max)]])
    
    max_guard = 0
    max_minute = 0
    max_count = 0
    for item in list_tuples:

        if item[1][1] > max_count:
            max_guard = item[0]
            max_minute = item[1][0]
            max_count = item[1][1]

    p2answer = int(max_guard) * int(max_minute)
    return [p1answer, p2answer]


# Store list based answers here
p5_6_answer = problem5_6()
p7_8_answer = problem7_8()

# Main program starts here
print("Solution to Problem #1: " + str(problem1()))
print("Solution to Problem #2: " + str(problem2()))
print("Solution to Problem #3: " + str(problem3()))
print("Solution to Problem #4: " + str(problem4()))
print("Solution to Problem #5: " + str(p5_6_answer[0]))
print("Solution to Problem #6: " + str(p5_6_answer[1]))
print("Solution to Problem #7: " + str(p7_8_answer[0]))
print("Solution to Problem #7: " + str(p7_8_answer[1]))

