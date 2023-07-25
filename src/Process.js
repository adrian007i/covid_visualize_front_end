function process(rows, weeks, metric) {

    function filter_and_unpack(rows, key, start_date) {
        return rows.filter(row => row["start_date"] === start_date).map(row => row[key])
    }

    var frames = []
    var slider_steps = []


    for (var i = 0; i <= weeks.length - 1; i++) {
        let str_date = new Date(parseInt(weeks[i]))
        let year = str_date.getFullYear();
        let month = String(str_date.getMonth() + 1).padStart(2, '0');
        let day = String(str_date.getDate()).padStart(2, '0');

        str_date = `${year}-${month}-${day}`;

        var z = filter_and_unpack(rows, metric, weeks[i])
        var locations = filter_and_unpack(rows, 'state', weeks[i])
        frames[i] = { data: [{ z: z, locations: locations, text: locations }], name: weeks[i] }
        slider_steps.push({
            label: str_date,
            method: "animate",
            args: [[weeks[i]], {
                mode: "immediate",
                transition: { duration: 300 },
                frame: { duration: 300 }
            }
            ]
        })

    }
    var plotData = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: frames[0].data[0].locations,
        z: frames[0].data[0].z,
        text: frames[0].data[0].locations

    }];
    var layout = {
        title: "Covid 19 Statistics",
        geo: {
            "scope": "usa",
        },
        updatemenus: [{
            x: 0,
            y: 0,
            yanchor: "top",
            xanchor: "right",
            showactive: false,
            direction: "left",
            type: "buttons",
            pad: { "t": 87, "r": 10 },
            buttons: [{
                method: "animate",
                args: [null, {
                    fromcurrent: true,
                    transition: {
                        duration: 200,
                    },
                    frame: {
                        duration: 200
                    }
                }],
                label: "Play"
            }, {
                method: "animate",
                args: [
                    [null],
                    {
                        mode: "immediate",
                        transition: {
                            duration: 0
                        },
                        frame: {
                            duration: 0
                        }
                    }
                ],
                label: "Pause"
            }]
        }],
        sliders: [{
            active: 0,
            steps: slider_steps,
            x: 0.1,
            len: 0.9,
            xanchor: "left",
            y: 0,
            yanchor: "top",
            pad: { t: 50, b: 10 },
            currentvalue: {
                visible: true,
                prefix: "Week of:",
                xanchor: "right",
                font: {
                    size: 20,
                    color: "#666"
                }
            },
            transition: {
                duration: 300,
                easing: "cubic-in-out"
            }
        }]
    };
    return { layout, frames, plotData }
}

export default process;