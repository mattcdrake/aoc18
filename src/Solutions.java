import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Scanner;

public class Solutions {
    private HashMap<Integer, Integer> answers;

    // TODO make a menu system instead of de-facto printing all answers
    public Solutions() {
        answers = new HashMap<Integer, Integer>();
        runPuzzle1();
        System.out.println("Puzzle 1: " + answers.get(1));
    }

    public void runPuzzle1() {
        File file = new File("./input_data/p1.txt");
        int runningTotal = 0;
        try {
            Scanner sc = new Scanner(file);
            while (sc.hasNextLine()) {
                String line = sc.nextLine();
                if (!line.isEmpty()) {
                    if (line.charAt(0) == '+') {
                        runningTotal += new Integer(line.substring(1));
                    } else {
                        runningTotal -= new Integer(line.substring(1));
                    }
                }
            }
        }
        catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        answers.put(1, runningTotal);
    }
}
