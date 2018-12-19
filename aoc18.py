import helper
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


def problem7():
    lines = helper.file_to_list("./input_data/p7.txt")
    guard_messages = []
    for line in lines:
        guard_messages.append(helper.parse_guard_line(line))
    guard_messages = sorted(guard_messages, key=attrgetter('time.year', 
        'time.month', 'time.day', 'time.hour', 'time.minute'))


# Store list based answers here
p5_6_answer = problem5_6()

# Main program starts here
print("Solution to Problem #1: " + str(problem1()))
print("Solution to Problem #2: " + str(problem2()))
print("Solution to Problem #3: " + str(problem3()))
print("Solution to Problem #4: " + str(problem4()))
print("Solution to Problem #5: " + str(p5_6_answer[0]))
print("Solution to Problem #6: " + str(p5_6_answer[1]))
print("Solution to Problem #7: " + str(problem7()))


