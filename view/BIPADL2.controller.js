sap.ui.controller("sap.ui.demo.myFiori.view.BIPADL2", {

	onInit : function() {
		var oBus = new sap.ui.getCore().getEventBus();
        oBus.subscribe("nav", "to", this.handleFetchDetails, this);
    },
    
    handleFetchDetails : function(sCannelID, sEvtId, oData) {
        var oContext = oData.data.context;

        if (oContext) {
            this.getView().setBindingContext(oContext);
        }
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

	onNavButtonTo: function(evt, sO) {
		var bindingContext = evt.getSource().getBindingContext(); 

		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", { 
			id : "bipad_l3",
			data : {
				context : sO 
			}
		});
	},

});
