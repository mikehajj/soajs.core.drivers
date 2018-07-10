"use strict";
const helper = require("../../../../helper");
const assert = require("assert");
const sinon = require('sinon');

const service = helper.requireModule('./infra/azure/index.js');
const serviceUtils = helper.requireModule("./infra/azure/utils/index.js");

let dD = require('../../../../schemas/azure/cluster.js');
let info = {};
let options = {};

describe("testing /lib/azure/index.js", function () {
	process.env.SOAJS_CLOOSTRO_TEST = true;
	
	describe("calling executeDriver - listNetworks", function () {
		afterEach((done) => {
			sinon.restore();
			done();
		});
		it("Success", function (done) {
			sinon
				.stub(serviceUtils, 'authenticate')
				.yields(null, {
					credentials: {},
				});
			sinon
				.stub(serviceUtils, 'getConnector')
				.returns({
					virtualNetworks: {
						list: (resourceGroupName, cb) => {
							return cb(null, info.virtualNetworks);
						}
					},
				});
			info = dD();
			options = info.deployCluster;
			options.params = {
				resourceGroupName: "tester",
			};
			service.executeDriver('listNetworks', options, function (error, response) {
				assert.ifError(error);
				assert.ok(response);
				assert.deepEqual(response, info.virtualNetworks);
				done();
			});
		});
	});
	
	describe("calling executeDriver - createNetwork", function () {
		afterEach((done) => {
			sinon.restore();
			done();
		});
		it("Success", function (done) {
			sinon
				.stub(serviceUtils, 'authenticate')
				.yields(null, {
					credentials: {},
				});
			sinon
				.stub(serviceUtils, 'getConnector')
				.returns({
					virtualNetworks: {
						createOrUpdate: (resourceGroupName, networkName, params, cb) => {
							return cb(null, {
								"id": "/subscriptions/d6/resourceGroups/testcase/providers/Microsoft.Network/virtualNetworks/test-net",
								"name": "test-net",
								"type": "Microsoft.Network/virtualNetworks",
								"location": "centralus",
								"tags": {
									"test": "cases"
								},
								"addressSpace": {
									"addressPrefixes": [
										"10.0.0.0/16"
									]
								},
								"dhcpOptions": {
									"dnsServers": [
										"8.8.8.8",
										"8.8.9.9"
									]
								},
								"subnets": [
									{
										"id": "/subscriptions/d6/resourceGroups/testcase/providers/Microsoft.Network/virtualNetworks/test-net/subnets/test-subnet",
										"addressPrefix": "10.0.0.0/24",
										"provisioningState": "Succeeded",
										"name": "test-subnet",
										"etag": "1"
									}
								],
								"virtualNetworkPeerings": [],
								"resourceGuid": "11",
								"provisioningState": "Succeeded",
								"enableDdosProtection": false,
								"enableVmProtection": false,
								"etag": "1"
							});
						}
					},
				});
			info = dD();
			options = info.deployCluster;
			options.params = {
				region: "centralus",
				labels: {
					"test": "cases"
				},
				group: "testcase",
				networkName: "test-net",
				"addressPrefixes": [ "10.0.0.0/16" ],
				"dnsServers": ["8.8.8.8", "8.8.9.9"],
				"subnets": [{
					name: "test-subnet",
					addressPrefix: "10.0.0.0/24"
				}]
			};
			let expectedReponse = {
				"subnets": [
					{
						"name": "test-subnet",
						"id": "/subscriptions/d6/resourceGroups/testcase/providers/Microsoft.Network/virtualNetworks/test-net/subnets/test-subnet",
						"addressPrefix": "10.0.0.0/24"
					}
				],
				"name": "test-net",
				"id": "/subscriptions/d6/resourceGroups/testcase/providers/Microsoft.Network/virtualNetworks/test-net",
				"location": "centralus",
				"addressSpace": {
					"addressPrefixes": [
						"10.0.0.0/16"
					]
				},
				"dhcpOptions": {
					"dnsServers": [
						"8.8.8.8",
						"8.8.9.9"
					]
				}
			};
			service.executeDriver('createNetwork', options, function (error, response) {
				assert.ifError(error);
				assert.ok(response);
				assert.deepEqual(response, expectedReponse);
				done();
			});
		});
	});
	
	describe("calling executeDriver - updateNetwork", function () {
		afterEach((done) => {
			sinon.restore();
			done();
		});
		it("Success", function (done) {
			sinon
				.stub(serviceUtils, 'authenticate')
				.yields(null, {
					credentials: {},
				});
			sinon
				.stub(serviceUtils, 'getConnector')
				.returns({
					virtualNetworks: {
						createOrUpdate: (resourceGroupName, networkName, params, cb) => {
							return cb(null, {
								"id": "/subscriptions/d6/resourceGroups/testcase/providers/Microsoft.Network/virtualNetworks/test-net",
								"name": "test-net",
								"type": "Microsoft.Network/virtualNetworks",
								"location": "centralus",
								"tags": {
									"test": "cases"
								},
								"addressSpace": {
									"addressPrefixes": [
										"10.0.0.0/16"
									]
								},
								"dhcpOptions": {
									"dnsServers": [
										"8.8.8.8",
										"8.8.9.9"
									]
								},
								"subnets": [
									{
										"id": "/subscriptions/d6/resourceGroups/testcase/providers/Microsoft.Network/virtualNetworks/test-net/subnets/test-subnet",
										"addressPrefix": "10.0.0.0/24",
										"provisioningState": "Succeeded",
										"name": "test-subnet",
										"etag": "1"
									}
								],
								"virtualNetworkPeerings": [],
								"resourceGuid": "11",
								"provisioningState": "Succeeded",
								"enableDdosProtection": false,
								"enableVmProtection": false,
								"etag": "1"
							});
						}
					},
				});
			info = dD();
			options = info.deployCluster;
			options.params = {
				region: "centralus",
				labels: {
					"test": "cases"
				},
				group: "testcase",
				networkName: "test-net",
				"addressPrefixes": [ "10.0.0.0/16" ],
				"dnsServers": ["8.8.8.8", "8.8.9.9"],
				"subnets": [{
					name: "test-subnet",
					addressPrefix: "10.0.0.0/24"
				}]
			};
			let expectedReponse = {
				"subnets": [
					{
						"name": "test-subnet",
						"id": "/subscriptions/d6/resourceGroups/testcase/providers/Microsoft.Network/virtualNetworks/test-net/subnets/test-subnet",
						"addressPrefix": "10.0.0.0/24"
					}
				],
				"name": "test-net",
				"id": "/subscriptions/d6/resourceGroups/testcase/providers/Microsoft.Network/virtualNetworks/test-net",
				"location": "centralus",
				"addressSpace": {
					"addressPrefixes": [
						"10.0.0.0/16"
					]
				},
				"dhcpOptions": {
					"dnsServers": [
						"8.8.8.8",
						"8.8.9.9"
					]
				}
			};
			service.executeDriver('updateNetwork', options, function (error, response) {
				assert.ifError(error);
				assert.ok(response);
				assert.deepEqual(response, expectedReponse);
				done();
			});
		});
	});
	
	describe("calling executeDriver - deleteNetwork", function () {
		afterEach((done) => {
			sinon.restore();
			done();
		});
		it("Success", function (done) {
			sinon
				.stub(serviceUtils, 'authenticate')
				.yields(null, {
					credentials: {},
				});
			sinon
				.stub(serviceUtils, 'getConnector')
				.returns({
					virtualNetworks: {
						deleteMethod: (resourceGroupName, networkName, cb) => {
							return cb(null, true);
						}
					},
				});
			info = dD();
			options = info.deployCluster;
			options.params = {
				group: "testcase",
				networkName: "test-net",
			};
			service.executeDriver('deleteNetwork', options, function (error, response) {
				assert.ifError(error);
				assert.ok(response);
				done();
			});
		});
	});
});
