var ParkingController = function(parkingManager) {
    
    var _parkingManager = parkingManager;

    this.listParkings = function(req, res) {
        _parkingManager.getParkings(function(err, parkings) {
            res.send(parkings);
        });
    };
    
};

module.exports = ParkingController;