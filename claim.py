class Claim:
    def __init__(self, num_id, left_edge, top_edge, width, height):
        self.num_id = num_id
        self.left_edge = left_edge
        self.top_edge = top_edge
        self.width = width
        self.height = height


class Fabric:
    # 2d list representing fabric claims. First layer is horizontal, second
    # is vertical.
    fabric = []

    def __init__(self, width):
        for i in range(0, width):
            self.fabric.append([])
            for j in range(0, width):
                self.fabric[i].append(0)


    def add_order(self, claim):
        """
        Takes a claim object and adds the count to the fabric representation

        @claim - claim specs to add
        """
        for i in range(claim.left_edge, claim.left_edge + claim.width):
            for j in range(claim.top_edge, claim.top_edge + claim.height):
                self.fabric[i][j] += 1


    def calc_two_claims(self):
        """
        Calculates the number of square inches that are utilized by 2 or more
        claims.
        """
        inches = 0
        for column in self.fabric:
            for value in column:
                if value >= 2:
                    inches += 1
        return inches


    def has_overlap(self, claim):
        """
        Returns a bool representing whether or not the claim's area has overlap
        """
        for i in range(claim.left_edge, claim.left_edge + claim.width):
            for j in range(claim.top_edge, claim.top_edge + claim.height):
                if self.fabric[i][j] >= 2:
                    return True
        return False

