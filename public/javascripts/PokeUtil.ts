class PokeUtil {
    /**
     * Calculates the bomb ratio for the current Pokemon. The ratio will be
     * lower for starters and gets higher as we approach the legendaries.
     * Requires the global currentId to be set to the ID of the Pokemon.
     */
    static getBombRatio(): number {
        var lower = 0.1;
        var upper = 0.2;
        // where generations end
        var limits = [0, 151, 251, 386, 494, 649, 721];
        var id = parseInt(currentId);
        
        for (var i = 1; i < limits.length; i++) {
            if (limits[i] >= id) {
                var lowerLimit = limits[i - 1];
                var upperLimit = limits[i];
                break;
            }
        }
        
        return 0.1 + ((id - lowerLimit) / (upperLimit - lowerLimit)) * (upper - lower);
    }
}