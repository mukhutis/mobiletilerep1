sap.ui.controller("mobiletileui5.TileView", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf mobiletileui5.TileView
*/
	onInit: function() {
		//define the model path
		var sURI= "http://services.odata.org/Northwind/Northwind.svc/"
		if (typeof baseURL === "string") 
			sURI=baseURL; //if mock service use the baseURL
		var oModel = new sap.ui.model.odata.ODataModel(sURI, true);
		sap.ui.getCore().setModel(oModel);
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf mobiletileui5.TileView
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf mobiletileui5.TileView
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf mobiletileui5.TileView
*/
//	onExit: function() {
//
//	}

})