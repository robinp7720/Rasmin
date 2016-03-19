function reload() {
    var coreCount = 0;
    async.series([
        function(callback) {
            $.ajax("/api/status/cpu").success(function (data) {
                for (i in data) {
                    coreCount = data.length;
                    if (data.hasOwnProperty(i)) {
                        var cpu = data[i];
                        $('.cpu').append(
                            '<div class="col-md-6">' +
                            '<div class="panel panel-default">' +
                            '<div class="panel-heading">' +
                            '<h3 class="panel-title">Core ' + i + '</h3>' +
                            '</div> <div class="panel-body">' +
                            '<p>Clock speed: ' + cpu.speed + '</p>' +
                            '</div>' +
                            '</div>' +
                            '</div>');
                    }
                }
                callback();
                return
            })
        },
        function(callback) {
            $.ajax("/api/status/load").success(function (data) {
                var panelType = "success";
                if (data.load[0]>=coreCount/2) {
                    var panelType = "warning";
                }
                if (data.load[0]>=coreCount) {
                    var panelType = "danger";
                }
                $('.info').append(
                    '<div class="col-md-6">' +
                    '<div class="panel panel-'+panelType+'">' +
                    '<div class="panel-heading">' +
                    '<h3 class="panel-title">CPU Load</h3>' +
                    '</div> <div class="panel-body">' +
                    '<ul>' +
                    '<li>1 min: '+data.load[0]+'</li>' +
                    '<li>5 min: '+data.load[1]+'</li>' +
                    '<li>15 min: '+data.load[2]+'</li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
                callback();
                return
            });
        },
        function(callback) {
            $.ajax("/api/status/memory").success(function (data) {
                var panelType = "success";
                if ((data.free/data.total)*100>50) {
                    var panelType = "warning";
                }
                if ((data.free/data.total)*100>=90) {
                    var panelType = "danger";
                }
                $('.info').append(
                    '<div class="col-md-6">' +
                    '<div class="panel panel-'+panelType+'">' +
                    '<div class="panel-heading">' +
                    '<h3 class="panel-title">Memory usage</h3>' +
                    '</div>' +
                    '<div class="panel-body">' +
                    '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="'+Math.round((data.free/data.total)*100)+'" aria-valuemin="0" aria-valuemax="100" style="min-width:20px; width: '+(data.free/data.total)*100+'%;">'+Math.round((data.free/data.total)*100)+'%</div></div>'+
                    '</div>' +
                    '</div>' +
                    '</div>');
                callback();
                return
            });
        }
    ]);

}

reload();

