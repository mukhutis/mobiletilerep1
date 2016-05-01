sap.ui.jsview("mobiletileui5.TileView", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf mobiletileui5.TileView
	*/ 
	getControllerName : function() {
		return "mobiletileui5.TileView";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf mobiletileui5.TileView
	*/ 
	createContent : function(oController) {
 		
 		var oTileCont = new sap.m.TileContainer("tileCont", {});
 		var oTileTmp = new sap.m.StandardTile({
 			number : {
 				path : "CategoryID",
 				formatter : this.productCount
 			},
 			numberUnit : "Products",
 			icon : "sap-icon://action",
 			title : "{CategoryName}",
 			info : "{Description}",
 			press : this._handleTileTap
 		});
 		
 		//Bind Categories  use template to build tiles,
 		oTileCont.bindAggregation("tiles", {
 			path : "/Categories",
 			template : oTileTmp,
 			parameters : { expand : "Products" }
 		});
 		
 		var page1 = new sap.m.Page("home", { title : "Products by Category"	});
 		page1.setEnableScrolling(false).addContent(oTileCont);
 		
 		var page2 = new sap.m.Page("page2", {
 			customHeader : new sap.m.Bar({
 				contentLeft : [ new sap.m.Button({
 					icon : "sap-icon://home",
 					tap : function() { app.back();}
 				}) ],
 				contentMiddle : [ new sap.m.Label("title", { text : "{CategoryName}"
 				}) ]
 			}),
 			footer : new sap.m.Bar({
 				transluscent : "true",
 				contentLeft : [ new sap.m.Button({ icon : "sap-icon://action-settings"})]
 			}),
 			content : [ new sap.m.ObjectHeader({intro : "{Description}" }),
 			new sap.me.TabContainer("tabContainer", {
 				badgeInfo : { path : "CategoryID", formatter : this.productCount	},
 				contentInfo : new sap.m.List("list", {
 					items : {
 						path : "/Products",
 						template : new sap.m.ObjectListItem({
 							type : "Active",
 							title : "{ProductName}",
 							numberUnit : "EUR",
 							attributes : [ new sap.m.ObjectAttribute({
 								text : "{QuantityPerUnit}"
 							}) ],
 							number : {
 								path : "UnitPrice",
 								type : new sap.ui.model.type.Float({
 									maxFractionDigits : 2
 								})
 							}
 						})
 					}
 				})
 			}) ]
 		});
 		
 		
 		var app = new sap.m.App("TileApp");
 		app.addPage(page1).addPage(page2).setInitialPage(page1.getId());
 		var shell = new sap.m.Shell("Shell",{showLogout : false});
 		shell.setApp(app).placeAt('body');
 		
	},
	
	_handleTileTap: function(oEvent) {
		app = sap.ui.getCore().byId("TileApp");  
		app.to("page2");
		this.page2.setBindingContext(this.getBindingContext());
	},
	
	productCount: function() {
		//return the number of products linked to Category
		//if (oValue) {
			var sPath = this.getBindingContext().getPath() + '/Products';
			 return this.getModel().bindList(sPath).getContexts().length;
		//}
	}

});