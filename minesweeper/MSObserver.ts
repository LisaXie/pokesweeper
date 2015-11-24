interface MSObserver {
    onGameStart();
    onWaitingInput();
    onFieldChanged();
    onBombStepped(row: number, col: number);
    onVictory();
}