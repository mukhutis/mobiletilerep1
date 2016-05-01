sap.ui.jsview("mobiletileui5.ListView", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf mobiletileui5.ListView
	*/ 
	getControllerName : function() {
		return "mobiletileui5.ListView";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf mobiletileui5.ListView
	*/ 
	createContent : function(oController) {

		var page2 = new sap.m.Page("page2", {
			customHeader : new sap.m.Bar({
				contentLeft : [ new sap.m.Button({
					icon : "sap-icon://home",
					tap : function() { 
						app = sap.ui.getCore().byId("TileApp"); 
						app.back();}
				}) ],
				contentMiddle : [ new sap.m.Label("title", { text : "{CategoryName}"
				}) ]
			}), //header done
			footer : new sap.m.Bar({
				transluscent : "true",
				contentLeft : [ new sap.m.Button({ icon : "sap-icon://action-settings"})]
			}), //footer done
			content : [ 
			new sap.m.ObjectHeader({intro : "{Description}" }),
			new sap.m.TabContainer("tabContainer", {
				badgeInfo : { path : "CategoryID", formatter : productCount	},
				contentInfo : new sap.m.List("list", {
					items : {
						path : "Products",
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
		
		return page2;
		
	},//end content
	
	productCount : function(oValue) {
		//return the number of products linked to Category
		if (oValue) {
			var sPath = this.getBindingContext().getPath() + '/Products';
			return this.getModel().bindList(sPath).getContexts().length;
		}
	}
	
}) //end jsview
		
		

		