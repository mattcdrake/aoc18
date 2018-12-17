import helper

print("line_distance of 'abcd' and 'xbcd': " + 
        str(helper.line_distance("abcd", "xbcd")))
print("line_distance of 'abcd' and 'xzvf': " + 
        str(helper.line_distance("abcd", "xzvf")))
print("line_distance of 'abcd' and 'abcd': " + 
        str(helper.line_distance("abcd", "abcd")))
print("line_distance of 'a' and '': " + 
        str(helper.line_distance("a", "")))
print("same_pos of 'abcd' and 'abcd': " + str(helper.same_pos("abcd", "abcd")))

