//
// Created by fires on 12/5/18.
//

#include <iostream>
#include "puzzleManager.h"

void puzzleManager::runPuzzle(int puzzle)
{
    switch (puzzle)
    {
        case 1:
            std::cout << "running puzzle # " << puzzle << std::endl;
            break;
        default:
            break;
    }
}

/*
 * @return: the lowest valid puzzle value
 */
int puzzleManager::getMinPuzzle()
{
    return 0;
}

/*
 * @return: the highest valid puzzle value
 */
int puzzleManager::getMaxPuzzle()
{
    return 0;
}
