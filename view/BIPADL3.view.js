sap.ui.jsview("sap.ui.demo.myFiori.view.BIPADL3", {

	getControllerName : function() {
		return "sap.ui.demo.myFiori.view.BIPADL3";
	},


	createContent : function(oController) {
				
		var app = new sap.m.App("L3");
		
		var page = new sap.m.Page({
				enableScrolling : false,
				showHeader : true,
				showNavButton: true,
				navButtonPress : [ oController.doNavBack, oController ],
				backgroundDesign: sap.m.PageBackgroundDesign.Standard,
				customHeader : new sap.m.Bar({
					contentLeft : [ new sap.m.Button("BackButton3",{
						icon : "sap-icon://nav-back",
				        text:"Back",
						tap : function() {  oController.doNavBack();}
				    }) ],
					contentRight : [ new sap.m.Button("HomeButton3",{
						icon : "sap-icon://home",
				        text:"Home",
						tap : function() {  oController.doHome();}
				    }) ],
					contentMiddle : [ new sap.m.Label("title3", { text : "SAP BI Menu", design : "Bold"
					}) ]
				}),
		});
		

		function createTilesFromModel( oTileContainer, modelPath, id) {
			if (oTileContainer.hasModel() == false) {
				console.log("Error: " + oTileContainer);
				return;
			}
			var filter =  new sap.ui.model.Filter("PARENT_ID", sap.ui.model.FilterOperator.EQ, id);
			var template = new sap.m.StandardTile({
				title: '{TEXT}',
				info: '{ME}',
				icon: 'sap-icon://task',
				activeIcon: 'task',
				customData : [{
					Type:"sap.ui.core.CustomData",
				    key:"OBJECT_ID",
				    value:"{OBJECT_ID}" 
				  },{
					Type:"sap.ui.core.CustomData",
				    key:"TEXT",
				    value:"{TEXT}" 
				  },{
					Type:"sap.ui.core.CustomData",
				    key:"URL",
				    value:"{URL}" 
				  }
				],
				tooltip: "{URL}",
				press: function (evt) {
					var sURL = evt.getSource().data("URL"); 
					if (sURL.length > 0) {
						var sText = evt.getSource().data("TEXT");
						console.log("sText: " + sText);

						var dUrl = []; var dText=[]; 
						dUrl.push(sURL);
						dText.push(sText);
								
						var data = [];
						for(var i = 0; i < dText.length; i++) {
							data.push({"dText": dText[i], "dUrl": dUrl[i]});
						}
						var oModel1 = new sap.ui.model.json.JSONModel({ "detail": data });
						sap.ui.getCore().setModel(oModel1, "detailmodel");


						var sO = evt.getSource().data("OBJECT_ID"); //Destination
						oController.onNavButtonToDetail(evt, sO);
					} else {
						var sO = evt.getSource().data("OBJECT_ID"); //Destination
						oController.onNavButtonTo(evt, sO);
					}
				}
			});
			
			oTileContainer.bindAggregation("tiles", {
				path: modelPath, filters: filter, template: template   
			});
		

		}

		var MyTileContainer = new sap.m.TileContainer("L3Container");
		MyTileContainer.setModel(oModel);


		page.addContent(MyTileContainer);
		page.setEnableScrolling(false); 
		app.addPage(page);
		
		this.addEventDelegate({
			onBeforeShow: function(evt) {
				console.log("L3 - PID:" + evt.data.context);
				createTilesFromModel(MyTileContainer, "/modelData", evt.data.context);
			}
		}, this); 
		
		
		return app;
	}

});


