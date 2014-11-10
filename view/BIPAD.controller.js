sap.ui.controller("sap.ui.demo.myFiori.view.BIPAD", {

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
    
	onNavButtonTo: function(evt, data) {
		var bindingContext = evt.getSource().getBindingContext(); 
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", { 
			id : "bipad_l2",
			data : {
				//context : bindingContext
				context: data
			}
		});

	},
	
	onNavButtonToME2: function(evt, sO) {
		var bindingContext = evt.getSource().getBindingContext(); 

		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", { 
			id : "bipad_l3",
			data : {
				context : sO 
			}
		});
	},

	onNavButtonToME3: function(evt, sO) {
		var bindingContext = evt.getSource().getBindingContext(); 

		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", { 
			id : "bipad_l4",
			data : {
				context : sO 
			}
		});
	},

	onNavButtonToME4: function(evt, sO) {
		var bindingContext = evt.getSource().getBindingContext(); 

		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", { 
			id : "bipad_detail",
			data : {
				context : sO 
			}
		});
	},
});
