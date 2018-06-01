"use strict";
const helper = require("../../../helper.js");
const assert = require("assert");
const sinon = require('sinon');

const googleDriver = helper.requireModule("./infra/google/utils/utils.js");

describe("testing google library /infra/google/utils/utils.js", function () {
	process.env.SOAJS_CLOOSTRO_TEST = true;
	
	it("success", (done) => {
		let compute = googleDriver.compute();
		let container = googleDriver.container();
		
		assert.ok(compute);
		assert.ok(container);
		done();
	});
});