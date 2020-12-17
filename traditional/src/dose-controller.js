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

        //how to manage "Gdy pompa nie zadziała (może się to zdarzyć przy intensywnym ruchu ręką)"
        // my idea is that to implement that there might be like 20% to throw error when the pressure is wrong (> 150, <90 && >60 ...)
        // but there also must be condition that after one error during second time everything will be fine
    }

}

module.exports = DoseController;