"""
Takes a path to a file and returns a list with each line in order.

@param path - Path to the input data
@return lines - List of each line in order
"""
def file_to_array(path):
    with open(path) as f:
        lines = []
        for line in f:
            lines.append(line.rstrip())
    return lines

