
function _mixin( dest, source ) {
    var name, s, i, empty = {};

    for ( name in source ) {
        // the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
        // inherited from Object.prototype.	 For example, if dest has a custom toString() method,
        // don't overwrite it with the toString() method that source inherited from Object.prototype
        s = source[name];
        if ( !(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s)) ) {
            dest[name] = s;
        }
    }
    return dest; // Object
}


module.exports = {

    mixin : function ( dest, sources ) {
        if ( !dest ) {
            dest = {};
        }
        for ( var i = 1, l = arguments.length; i < l; i++ ) {
            _mixin( dest, arguments[i] );
        }
        return dest; // Object
    },

    /**
     * returns a function that will execute a given function in a given scope. Like dojo hitch
     * @param scope
     * @param method
     */
    hitch : function ( scope, method ) {

        if ( !method ) {
            method = scope;
            scope = null;
        }

//    var args = Array.prototype.slice.call(arguments);

        return !scope ? method : function () {
            return method.apply( scope, arguments || [] );
        }; // Function
    }
};

