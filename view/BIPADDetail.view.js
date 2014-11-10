sap.ui.jsview("sap.ui.demo.myFiori.view.BIPADDetail", {


	getControllerName : function() {
		return "sap.ui.demo.myFiori.view.BIPADDetail";
	},

	createContent : function(oController) {
		var app = new sap.m.App("BILaunchPadDetail");
		
		var oPage = new sap.m.Page({
			showNavButton:true,
			enableScrolling: true,
			navButtonPress : [ oController.doNavBack, oController ],
			customHeader : new sap.m.Bar({
					contentLeft : [ new sap.m.Button("BackButtonD",{
						icon : "sap-icon://nav-back",
				        text:"Back",
						tap : function() {  oController.doNavBack();}
				    }) ],
					contentRight : [ new sap.m.Button("HomeButtonD",{
						icon : "sap-icon://home",
				        text:"Home",
						tap : function() {  oController.doHome();}
				    }) ],
					contentMiddle : [ new sap.m.Label("titleD", { text : "SAP BI Menu", design : "Bold"
					}) ]
			})
		});

		
		var oTableMat = new sap.m.Table("otablemat", {
	        inset: true,
	        headerText: "BI Launchpad Detail",
	        columns: [
	            new sap.m.Column({ header: new sap.m.Label({ text: "Folder"}),  width: '50%' }),
	            new sap.m.Column({ header: new sap.m.Label({ text: "URL" }), width: '50%' }),
	        ],
	    });
		
		oTableMat.bindAggregation("items", {
	        path: "/detail",
	        template: new sap.m.ColumnListItem({
	            cells: [
	                    new sap.m.Label({ text: "{dText}" }),
	                    new sap.ui.commons.Link({
	            			text : "{dText}",
	            			href : "{dUrl}",
	            			target : "_blank",
	            			tooltip : "{dUrl}"
	            		})
	            ]
	        })
	    });
	    
		oPage.addContent(oTableMat);
		app.addPage(oPage);
		
		this.addEventDelegate({
			onBeforeShow: function(evt) {
				this.setModel(sap.ui.getCore().getModel('detailmodel'));
			}
		}, this); 

		return app;
	}

});


