class IntervalHub {
    // Speichert alle registrierten Interval-IDs
    static allIntervals = [];

    // Startet ein neues Intervall und fügt es dem Array hinzu
    static startInterval(func, timer) {
        const newInterval = setInterval(func, timer);
        IntervalHub.allIntervals.push(newInterval);
    }

    // Stoppt alle registrierten Intervalle und leert Liste
    static stopAllIntervals() {
        IntervalHub.allIntervals.forEach(clearInterval);
        IntervalHub.allIntervals = [];
    }
}