# Declare
declarejs is yet another object oriented class hierarchy simulation framework for node.  Declare enables multiple inheritance to allow the devleoper to reuse code. Declare's sources are extracted from [dojo] (www.dojotoolkit.org), with a few modifications to make them standalone and work in node.

## Installation

    $ npm install declarejs

## Usage

    require('declarejs');

### Arguments
* [optional] {Object | Array} Inheritance 
  * {Object} Base class object for single inheritance
  * {Array}  Array of base class objects for multiple inheritance
* {Object} Properties & Methods



## Class Creation - No Inheritance

    var Declare = require('declarejs');

    var myClass = Declare({
 
      // Custom properties and methods here
 
    });

## Class Inheriting from Another Class

    var Declare = require('declarejs');

    var myClass = Declare([  
        myParentClass,
        myOtherClass,
        myMixinClass ], {
       
          // myClass now has all of the properties and methods from:
          // myParentClass, myOtherClass, and myMixinClass
       
      });
 
      // Custom properties and methods here
 
    });

An array of classes signifies multiple inheritance. Properties and methods are inherited from left to right. The first class in the array serves as the base prototype, then the subsequent classes are mixins to that class.

    If a property or method is specified in more than one inherited class, the property or method from the last inherited class is used.

## Properties & Methods
The last argument of dojo.declare is an object containing methods and properties for the class prototype. Properties and methods provided via this argument will override their same namesake if inherited classes have the same properties.

// Class with custom properties and methods
dojo.declare("mynamespace.Class",[mynamespace.MyParentClass],{
    // Any property
    myProperty1: 12,
    // Another
    myOtherProperty: "Hello",
    // A method
    myMethod: function() {
 
        // Perform any functionality here
 
        return result;
    }
})



    
    Unlike dojo, declarejs does not allow named classes since the named classes can only be used within dojo's declarative framework.