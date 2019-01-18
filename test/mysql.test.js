const sinon = require('sinon');
const mockMysql = sinon.mock(require('mysql'));
const chai = require('chai');
const expect = chai.expect;

describe("Requete d'écriture base de donnee", function () {

    beforeEach(() => {
        mockMysql.expects('createConnection').returns({
            connect: () => {
                console.log('connecte');
            },
            query: (query, vars, callback) => {
                callback(null, succesfulDbInsert);
            },
            end: () => {
                console.log('Connexion fermee');
            }
        });

    });
    after(() => {
        mockMysql.restore();
    });

    describe('ecriture dans la bdd avec le bon schema', function () {

        it(' une bonne ecriture dans la bdd', function () {

            return LambdaTester(myLambdaHandler)
                .event(anObject)
                .expectResult((result) => {
                    expect(result).to.equal(succesfulDbInsert);
                });
        });
    });


    describe('erreur bdd', function () {

        before(() => {
            mockMysql.expects('createConnection').returns({
                connect: () => {
                    console.log('bien connecté');
                },
                query: (query, vars, callback) => {
                    callback('erreur bdd!', null);
                },
                end: () => {
                    console.log('connexion fermee');
                }
            });
        });

        after(() => {
            mockMysql.restore();
        });

        it('erreur dans le callback', function () {


            return LambdaTester(myLambdaHandler)
                .event(anObject)
                .expectError((err) => {
                    expect(err.message).to.equal('Something went wrong');
                });
        });
    });
});