sap.ui.jsview("sap.ui.demo.myFiori.view.BIPAD", {

	getControllerName : function() {
		return "sap.ui.demo.myFiori.view.BIPAD";
	},


	createContent : function(oController) {
				
		var app = new sap.m.App("L1");
		oModel.attachRequestCompleted(onRequestCompleted);


		var page = new sap.m.Page({
				enableScrolling : false,
				showHeader : true,
				showNavButton: true,
				backgroundDesign: sap.m.PageBackgroundDesign.Standard,
				customHeader : new sap.m.Bar({
					contentMiddle : [ new sap.m.Label("L1Title", { text : "SAP BI Menu", design : "Bold"
					}) ]
				}),				
				footer  : new sap.m.Bar({
					contentMiddle :[new sap.m.SearchField("Search", {
						placeholder: "Search for...",
						liveChange: [Search]
					})]
					
				}),
		});
		
		function Search(evt) {
			var searchValue=evt.oSource.mProperties.value;
			if (searchValue != "")				
				createTilesFromModelL4(MyTileContainer, "/modelData", searchValue);
			else
				createTilesFromModel(MyTileContainer, "/modelData");
		}

		function createTilesFromModelL4( oTileContainer, modelPath, id) {
			if (oTileContainer.hasModel() == false) {
				console.log("Error:" + oTileContainer);
				return;
			}
			var filter =  new sap.ui.model.Filter("TEXT", sap.ui.model.FilterOperator.StartsWith, id);
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
				    key:"ME",
				    value:"{ME}" 
				  },{
					Type:"sap.ui.core.CustomData",
				    key:"URL",
				    value:"{URL}" 
				  },{
					Type:"sap.ui.core.CustomData",
				    key:"TEXT",
				    value:"{TEXT}" 
				  }
				],
				tooltip: "{URL}",
				press: function (evt) {
					var sO = evt.getSource().data("OBJECT_ID"); //Destination
					var sME = evt.getSource().data("ME"); //Level
					var sURL = evt.getSource().data("URL"); //URL
					
					if(sME==2) 
						oController.onNavButtonToME2(evt, sO);
					else if (sME==3 && sURL.length==0) 
						oController.onNavButtonToME3(evt, sO);
					else if (sME==3 && sURL.length > 0) {
						var sText = evt.getSource().data("TEXT");
						
						var dUrl = []; var dText=[]; 
						dUrl.push(sURL);
						dText.push(sText);
								
						var data = [];
						for(var i = 0; i < dText.length; i++) {
							data.push({"dText": dText[i], "dUrl": dUrl[i]});
						}
						var oModel1 = new sap.ui.model.json.JSONModel({ "detail": data });
						sap.ui.getCore().setModel(oModel1, "detailmodel");

						oController.onNavButtonToME4(evt, sO);
					}
					else if (sME==4) {
						var sText = evt.getSource().data("TEXT");
						
						var dUrl = []; var dText=[]; 
						dUrl.push(sURL);
						dText.push(sText);
								
						var data = [];
						for(var i = 0; i < dText.length; i++) {
							data.push({"dText": dText[i], "dUrl": dUrl[i]});
						}
						var oModel1 = new sap.ui.model.json.JSONModel({ "detail": data });
						sap.ui.getCore().setModel(oModel1, "detailmodel");

						oController.onNavButtonToME4(evt, sO);
					}
					else
						oController.onNavButtonTo(evt, sO);
				}
			});
			
			oTileContainer.bindAggregation("tiles", {
				path: modelPath, filters: filter, template: template   
			});
		

		}

		function createTilesFromModel( oTileContainer, modelPath) {
			if (oTileContainer.hasModel() == false) {
				console.log("Error:" + oTileContainer);
				return;
			}
			
			var filter =  new sap.ui.model.Filter("PARENT_ID", sap.ui.model.FilterOperator.EQ, "1");
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
					  }
				],
				tooltip: "{URL}",
				press: function (evt) {
					var sO = evt.getSource().data("OBJECT_ID");
					oController.onNavButtonTo(evt, sO);
				}
			});
			
			oTileContainer.bindAggregation("tiles", {
				path: modelPath, filters: [filter], template: template   
			});
		

		}

		var MyTileContainer = new sap.m.TileContainer("L1Container");
		MyTileContainer.setModel(oModel);

		createTilesFromModel(MyTileContainer, "/modelData");

		
		page.addContent(MyTileContainer);
		page.setEnableScrolling(false); 
		app.addPage(page);
		return app;
	}

});


function onRequestCompleted() {
	var oData = oModel.getProperty("/modelData") ;
	var max = 0;
	var number = 0;

	for (i=0;  i<= oData.length; i++) {
		number = parseInt(oModel.getProperty("/modelData/" + i + "/ME"));
		if (number > max) {
			max = number;
		}
	}
	return max;
};
