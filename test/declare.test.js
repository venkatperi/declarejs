var Declare = require( '../lib/declarejs' );
var assert = require( "assert" );

/**
 * Root does not inherit from anything
 */
var Root = Declare( {
    name : 'Root',

    /**
     * constructor - we simply mixin any args given to us
     * @param {Object} args
     */
    constructor : function ( /*Object*/ args ) {
        Declare.safeMixin( this, args );
    },

    /**
     * Report our location in the class hierarchy
     * @return {String}
     */
    getHierarchy : function () {
        return "Root";
    }
} );

/**
 * Derived1 inherits from Root
 */
var Derived1 = Declare( Root, {
    name : 'Derived1',

    /**
     * dummy constructor - mixin is handled by Root
     * @param args
     */
    constructor : function ( /*Object*/ args ) {
    },

    /**
     * Override base class method to report our hierarchy, but call the base class as appropriate
     * @return {String}
     */
    getHierarchy : function () {
        return this.inherited( arguments ) + ' -> Derived1';
    }
} );

/**
 * Derived2 inherits from Derived1
 * @type {*}
 */
var Derived2 = Declare( Derived1, {
    name : 'Derived2',

    //We've omitted a constuctor - the base class' will be used

    /**
     * Override base class method to report our hierarchy, but call the base class as appropriate
     * @return {String}
     */
    getHierarchy : function () {
        return this.inherited( arguments ) + ' -> Derived2';
    }
} );


describe( 'declare', function () {

    it( 'declare a class with no inheritance', function () {
        var root = new Root();
        assert.equal( root.getHierarchy(), 'Root' );
    } );

    it( 'mix in additional parameters ', function () {
        var root = new Root( { a : 'A' } );
        assert.equal( root.a, 'A' );
    } );

    it( 'declare a class that inherits from  another class', function () {
        var d1 = new Derived1();
        assert.equal( d1.getHierarchy(), 'Root -> Derived1' );
    } );

    it( 'mix in parameters into a derived class', function () {
        var d1 = new Derived1( { b : 'B'} );
        assert.equal( d1.b, 'B' );
    } );

    it( 'derived properties override base properties ', function () {
        var root = new Root();
        assert.equal( root.name, 'Root' );

        var d1 = new Derived1();
        assert.equal( d1.name, 'Derived1' );
    } );

    it( 'we can inherit further (2 levels)', function () {
        var d1 = new Derived2();
        assert.equal( d1.name, 'Derived2' );
        assert.equal( d1.getHierarchy(), 'Root -> Derived1 -> Derived2' );
    } );

} );

