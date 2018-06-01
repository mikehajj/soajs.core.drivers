'use strict';
const assert = require("assert");
const sinon = require('sinon');
const helper = require("../../../../helper.js");
const secrets = helper.requireModule('./lib/container/kubernetes/secrets.js');
const utils = helper.requireModule('./lib/container/kubernetes/utils.js');
let dD = require('../../../../schemas/kubernetes/local.js');

describe("testing /lib/container/kubernetes/secrets.js", function () {
	
	describe("calling getSecret", function () {
		afterEach((done) => {
			sinon.restore();
			done();
		});
		let kubeData;
		let options;
		
		it("Success", function (done) {
			kubeData = dD();
			options = kubeData.deleteSecret;
			sinon
				.stub(utils, 'getDeployer')
				.yields(null, {
					core: {
						namespaces: function (namespace){
							return {
								secrets :{
									get: (params, cb)=>{
										return cb(null, kubeData.secret)
									}
								}
							}
						}
					},
					
				});
			options.params = {
				name: 'test-secret-1'
			};
			secrets.getSecret(options, function (error, res) {
				assert.equal(res.name, 'test-secret-1');
				done();
			});
		});
		
		it("Success with namespace provided", function (done) {
			options = kubeData.deleteSecret;
			let namespaces = () => {
				return {
					secrets: {
						get: (params, cb) => {
							return cb(null, kubeData.secret)
						}
					}
				}
			};
			namespaces.get = (params, cb)=>{
				return cb(null, kubeData.namespaces)
			};
			sinon
				.stub(utils, 'getDeployer')
				.yields(null, {
					core: {namespaces}
					
				});
			options.params = {
				name: 'test-secret-1',
				namespace: "soajs"
			};
			secrets.getSecret(options, function (error, res) {
				assert.equal(res.name, 'test-secret-1');
				done();
			});
		});
	});
	
	describe("calling createSecret", function () {
		let kubeData;
		let options;
		afterEach((done) => {
			sinon.restore();
			done();
		});
		beforeEach((done) => {
			done();
		});
		it("Success 1 secret", function (done) {
			kubeData = dD();
			options = kubeData.createSecret;
			console.log(options.params)
			let namespaces = () => {
				return {
					secrets: {
						post: (params, cb) => {
							return cb(null, kubeData.secret)
						}
					}
				}
			};
			sinon
				.stub(utils, 'getDeployer')
				.yields(null, {
					createSecret: (params, cb) => {
						return cb(null, kubeData.secret)
					},
					core : {namespaces}
				});
			secrets.createSecret(options, function (error, res) {
				// assert.equal(res.name, "test-secret-2");
				// assert.equal(res.uid, "secretID");
				console.log(error)
				console.log(res)
				done();
			});
		});

		it("Success 2 secrets", function (done) {
			options.params = {
				"name": "test-secret-1",
				"data": {
					"test-secret-1": "123456",
					"test-secret-12": "7890",
				},
				"type": "Opaque"
			};
			let namespaces = () => {
				return {
					secrets: {
						post: (params, cb) => {
							return cb(null, kubeData.secret)
						}
					}
				}
			};
			sinon
				.stub(utils, 'getDeployer')
				.yields(null, {
					createSecret: (params, cb) => {
						return cb(null, kubeData.secret)
					},
					core : {namespaces}
				});
			secrets.createSecret(options, function (error, res) {
				assert.equal(res.name, 'test-secret-1');
				done();
			});
		});
	});
	
	describe("calling deleteSecret", function () {
		
		let kubeData;
		let options;
		afterEach((done) => {
			sinon.restore();
			done();
		});
		beforeEach((done) => {
			done();
		});
		it("Success", function (done) {
			kubeData = dD();
			options = kubeData.deleteSecret;
			let namespaces = () => {
				return {
					secrets: {
						delete: (params, cb) => {
							return cb(null, {status: "Success"})
						}
					}
				}
			};
			sinon
				.stub(utils, 'getDeployer')
				.yields(null, {
					core : {namespaces}
				});
			secrets.deleteSecret(options, function (error, res) {
				assert.ok(res);
				done();
			});
		});
	});
	
	describe("calling listSecret", function () {
		
		let kubeData;
		let options;
		afterEach((done) => {
			sinon.restore();
			done();
		});
		beforeEach((done) => {
			done();
		});
		it("Success", function (done) {
			kubeData = dD();
			options = kubeData.deleteSecret;
			let namespaces = () => {
				return {
					secrets: {
						get: (params, cb) => {
							return cb(null, kubeData.secrets)
						}
					}
				}
			};
			namespaces.get = (params, cb)=>{
				return cb(null, kubeData.namespaces)
			};
			
			sinon
				.stub(utils, 'getDeployer')
				.yields(null, {
					core : {
						namespaces,
						secrets: {
							get : (cb)=>{
								return cb(null, kubeData.secrets)
							}
						}
					}
				});
			secrets.listSecrets(options, function (error, res) {
				assert.ok(res);
				assert.equal(res.length, 2);
				assert.equal(res[0].name, 'default-token-mh6vv');
				assert.equal(res[1].name, 'test-secret-1');
				done();
			});
		});
		it("Success with namespace", function (done) {
			kubeData = dD();
			options = kubeData.deleteSecret;
			options.params.namespace = 'soajs';
			let namespaces = () => {
				return {
					secrets: {
						get: (cb) => {
							return cb(null, kubeData.secrets)
						}
					}
				}
			};
			namespaces.get = (params, cb)=>{
				return cb(null, kubeData.namespaces)
			};
			
			sinon
				.stub(utils, 'getDeployer')
				.yields(null, {
					core : {
						namespaces,
						secrets: {
							get : (cb)=>{
								return cb(null, kubeData.secrets)
							}
						}
					}
				});
			secrets.listSecrets(options, function (error, res) {
				assert.ok(res);
				assert.equal(res.length, 2);
				assert.equal(res[0].name, 'default-token-mh6vv');
				assert.equal(res[1].name, 'test-secret-1');
				done();
			});
		});
	});
});