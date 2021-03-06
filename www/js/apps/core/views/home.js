// External Libraries
import _ from "underscore";
import Backbone from "strap/backbone";

// Templates & Translations
import tmpl from "vw/core/components/grids/basic.html";

// Component Views
import CardGrid from "component/CardGrid";
import HomescreenIconView from "component/cards/icons/Mini";
// Data
import homescreenIcons from "data/homescreen-icons.json";

// Collection
import HomescreenIconCollection from "core-root/collections/HomescreenIconsCollection";

// Events
import vent from "core-root/events/core/home";

var CoreHomeView;

CoreHomeView = Backbone.Epoxy.View.extend( {
    "el": ".app",
    "template": _.template( tmpl ),

    "initialize": function initialize(){
        var cards = {};
        var self = this;


        self.collection = new HomescreenIconCollection();
        _( homescreenIcons ).each( ( icon ) => {
            self.collection.add( icon );
        } );

        cards = new CardGrid( {
            "collection": self.collection,
            "card": HomescreenIconView
        } );

        this.listenTo(
            cards.vent,
            "cards:click:card",
            this.iconAction
        );

        this.render( cards );
    },
    "iconAction": function iconAction( data ){
        var cordova = cordova;
        var model = data.model;

        if( model.getType() === "link" ){
            // Lauch to outside browser ???
            /* eslint no-console: 0 */
            window.open( model.getAction() , "_system" );

            return false;
        }
        else if( model.getType() === "view" ){
            vent.trigger( "open:view", { "url": model.getAction() } );
        }
    },
    "render": function render( cards ){
        this.$el.html( this.template( { "title": "Homescreen!" } ) );

        cards.$el.appendTo( ".grid" );

        return this;
    }
} );

export default CoreHomeView;
