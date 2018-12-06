#include <iostream>
#include "puzzleManager.h"
#include "uiController.h"

int main()
{
    auto *ui = new uiController();

    ui->drawMenu();
    ui->runPuzzles();

    return 0;
}
