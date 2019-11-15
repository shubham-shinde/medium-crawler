var expect  = require('chai').expect;
var mocha = require('mocha');
var io = require('socket.io-client')
var it = mocha.it;
var describe = mocha.describe;
var request = require('request');

it('Main page content', function(done) {
    request('http://localhost:9001' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

describe('Suite of unit tests', function() {

    var socket;

    beforeEach(function(done) {
        // Setup
        socket = io.connect('http://localhost:9001', {
            'reconnection delay' : 0
            , 'reopen delay' : 0
            , 'force new connection' : true
        });
        socket.on('connect', function() {
            console.log('worked...');
            done();
        });
        socket.on('disconnect', function() {
            console.log('disconnected...');
        })
    });

    afterEach(function(done) {
        // Cleanup
        if(socket.connected) {
            console.log('disconnecting...');
            socket.disconnect();
        } else {
            // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
            console.log('no connection to break...');
        }
        done();
    });

    describe('First (hopefully useful) test', function() {

        it('Doing some things with indexOf()', function(done) {
            expect([1, 2, 3].indexOf(5)).to.be.equal(-1);
            expect([1, 2, 3].indexOf(0)).to.be.equal(-1);
            done();
        });

        it('Doing something else with indexOf()', function(done) {
            expect([1, 2, 3].indexOf(5)).to.be.equal(-1);
            expect([1, 2, 3].indexOf(0)).to.be.equal(-1);
            done();
        });

    });

});