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

    If a property or method is specified in more than one inherited class, the property or method from 
    the last inherited class is used.

## Properties & Methods
The last argument of Declare is an object containing methods and properties for the class prototype. Properties and methods provided via this argument will override their same namesake if inherited classes have the same properties.

    // Class with custom properties and methods
    var myClass = Declare({
    
        // Any property
        myProperty1: 12,
        
        // Another
        myOtherProperty: "Hello",
        
        // A method
        myMethod: function() {
     
            // Perform any functionality here
     
            return result;
        }
    });
    

### Special Method - 'constructor' 
Once of the special class methods is the constructor method. The constructor method is fired upon class instantiation, executed in the scope of the new object. This means that the this keyword references the instance, not the original class. The constructor method also accepts any number of instance-specific arguments.

    // Create a new class
    var Twitter = Declare({
        // The default username
        username: "defaultUser",
     
        // The constructor
        constructor: function(args) {
            Declare.safeMixin(this, args);
        }
    });

Take the following instance creation:

    var myInstance = new Twitter();

    
The username used within this instance will be "defaultUser" since no specific settings were provided to the instance. To leverage the safeMixin method, provide a username parameter:

    var myInstance = new Twitter({
        username: "sitepen"
    });

Now the instance uses sitepen as the username setting!


## Inheritance
As stated above, inheritance is defined within the second argument of dojo.declare. Classes are mixed-in from left to right with each subsequent class' properties and methods getting priority over the previous if a property has already been defined. Take the following:


    // Define class A
    var A = Declare({
        // A few properties...
        propertyA: "Yes",
        propertyB: 2
    });
     
    // Define class B
    var B = Declare(A, {
        // A few properties...
        propertyA: "Maybe",
        propertyB: 1,
        propertyC: true
    });
     
    // Define class C
    var C = Declare([A, B], {
        // A few properties...
        propertyA: "No",
        propertyB: 99,
        propertyD: false
    });

The result of the inherited class properties is:

    // Create an instance
    var instance = new C();
     
    // instance.propertyA = "No"    // overridden by B, then by C
    // instance.propertyB = 99      // overridden by B, then by C
    // instance.propertyC = true    // kept from B
    // instance.propertyD = false   // created by C


Setting and overriding simple Number, String, and boolean variables is straight-forward. Be careful when using arrays and objects with Declare to ensure they are properly scoped. Arrays and objects defined in the return are shared by all instances of the object. Arrays and objects defined in the constructor are properties of each object instantiation. 

## this.inherited
While completely overriding methods is certainly useful, sometimes the constructor of each class up through the inheritance chain should execute to preserve its original functionality. This is where the this.inherited(arguments) statement comes in handy. The this.inherited(arguments) statement calls the parent class' method of the same name. Consider the following:

    // Define class A
    var A = Declare({
        myMethod: function() {
            console.log("Hello!");
        }
    });
     
    // Define class B
    var B = Declare(mynamespace.A, {
        myMethod: function() {
            // Call A's myMethod
            this.inherited(arguments); // arguments provided to A's myMethod
            console.log("World!");
        }
    });
     
    // Create an instance of B
    var myB = new B();
    myB.myMethod();
    
     
    // Would output:
    //      Hello!
    //      World!

.

    The this.inherited method can be called at any time within the child class' code. There will be some cases 
    where you will want to call inherited() in the middle of the child function, or even at the end. That said, 
    you should not call it from within the constructor.


.
    
    Unlike dojo, declarejs does not allow named classes since the named classes are intended to be used 
    within dojo's declarative framework.
