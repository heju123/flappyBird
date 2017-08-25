export default {
    type : "panel",
    style : {
        x : 540,
        y : 40,
        width : "40%",
        height : 400
    },
    children : [
        {
            type : "panel",
            style : {
                x : 0,
                y : 0,
                width : "100%",
                height : "100%",
                backgroundColor : "#dadada",
                borderWidth : 10,
                borderColor : "#989898",
                layout : {
                    type : "linearLayout",
                    orientation : "vertical"
                }
            },
            children : [
                {
                    type : "rect",
                    style : {
                        width : "100%",
                        height : "100%",
                        backgroundColor : "#60ba4c",
                        layout : {
                            layoutWeight : 1
                        }
                    }
                },
                {
                    type : "rect",
                    style : {
                        width : "100%",
                        height : "100%",
                        backgroundColor : "#ba333a",
                        layout : {
                            layoutWeight : 2
                        }
                    }
                },
                {
                    type : "rect",
                    style : {
                        width : "100%",
                        height : "100%",
                        backgroundColor : "#5051ba",
                        layout : {
                            layoutWeight : 1
                        }
                    }
                }
            ]
        }
    ]
}