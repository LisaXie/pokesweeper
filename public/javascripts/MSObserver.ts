interface MSObserver {
    onGameStart();
    onWaitingInput();
    onFieldChanged();
    onCellChanged(cell: Cell);
    onBombStepped();
    onVictory();
}