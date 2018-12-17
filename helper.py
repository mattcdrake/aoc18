"""
Takes a path to a file and returns a list with each line in order.

@param path - Path to the input data
@return list - List of each line in order
"""
def file_to_list(path):
    with open(path) as f:
        lines = []
        for line in f:
            lines.append(line.rstrip())
    return lines


"""
Determines whether a string has any character that is repeated _count_ times.

@param string - String to search
@param count - Number of times a character must be repeated
@return bool - True if the string has a character repeated _count_ times
"""
def has_repeats(string, count):
    char_counts = {}
    for char in string:
        if char in char_counts:
            char_counts[char] += 1
        else:
            char_counts[char] = 1

    for k, v in char_counts.items():
        if v == count:
            return True
    return False

"""
Returns a number representing the number of differing chars between two strings.

@param first - First string
@param second - Second string
@return int - Number of different chars
"""
def line_distance(first, second):
    diff_chars = 0
    highest_char_count = max(len(first), len(second))
    lowest_char_count = min(len(first), len(second))
    for i in range(0, highest_char_count):
        # Avoiding string index exception. I think short circuiting works here.
        if i >= lowest_char_count or first[i] != second[i]:
            diff_chars += 1
    return diff_chars


"""
@param first - First string
@param second - Second string
@return bool - Whether the strings differ by 1 character in the same position
"""
def same_pos(first, second):
    if len(first) != len(second):
        return False
    diff_count = 0
    for i in range(0, len(first)):
        if first[i] != second[i]:
            diff_count += 1
        if diff_count > 1:
            return False
    return diff_count == 1


"""
@param first - First string
@param second - Second string
@return string - a string with the different characters removed
"""
def strip_diff(first, second):
    out_string = ""
    for i in range(0, len(first)):
        if first[i] == second[i]:
            out_string += first[i]
    return out_string


