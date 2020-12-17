function DoseController(healthMonitor, medicinePump, alertService) {

    return {
        checkHealthAndApplyMedicine: checkHealthAndApplyMedicine
    };

    function checkHealthAndApplyMedicine() {
        const pressure = healthMonitor.getSystolicBloodPressure();

        switch (true) {

            case (pressure > 150):
                medicinePump.dose({
                    name: 'LowerPressure',
                    quantity: 1
                });
                break;

            case (pressure < 90 && pressure >= 60):
                medicinePump.dose({
                    name: 'RaisePressure',
                    quantity: 1
                });
                break;

            default:
                medicinePump.dose({
                    name: 'RaisePressure',
                    quantity: 2
                });
        }
    }

}

module.exports = DoseController;