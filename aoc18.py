import helper

def problem1():
    lines = helper.file_to_array("./input_data/p1.txt")
    running_total = 0
    for line in lines:
        if line[0] == "+":
            running_total += int(line[1:])
        elif line[0] == "-":
            running_total -= int(line[1:])
    return running_total

def problem2():
    lines = helper.file_to_array("./input_data/p1.txt")
    running_total = 0
    list_index = 0
    prior_freqs = set()
    while True:
        line = lines[list_index]
        if line[0] == "+":
            running_total += int(line[1:])
        elif line[0] == "-":
            running_total -= int(line[1:])

        if running_total in prior_freqs:
            return running_total
        else:
            prior_freqs.add(running_total)

        if list_index >= (len(lines) - 1):
            list_index = 0
        else:
            list_index += 1


print("Solution to Problem #1: " + str(problem1()))
print("Solution to Problem #2: " + str(problem2()))

