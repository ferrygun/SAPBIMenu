sap.ui.controller("sap.ui.demo.myFiori.view.BIPADDetail", {

	onInit : function() {
		this.bus = sap.ui.getCore().getEventBus();
    },

   
    doNavBack: function(event) {
		app.ref.AppView.app.back();
    }, 

		
	doHome: function(evt) {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", { 
			id : "bipad_main",
			data : {
				//context : sO 
			}
		});
	},
});
