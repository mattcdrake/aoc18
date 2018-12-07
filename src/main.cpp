#include <iostream>
#include "puzzleManager.h"
#include "uiController.h"

int main()
{
    auto *puzzle = new puzzleManager();
    auto *ui = new uiController();

    ui->drawMenu();

    return 0;
}
